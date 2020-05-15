/**
 * *Componente destinado a crear el componente de un grafico que muestre el % 
 * total del contenido de las cuentas
 * 2020.05.15
 */
import React, { Component } from "react";
import { withStyles, Paper, Typography, Box } from "@material-ui/core";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";
import Interfaz from "../../classes/Interfaz";
import { Link } from "react-router-dom";
const styles = theme => ({
  fondoGrafico: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 64px)"
    },
    height: "40vh",
    maxHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  titular: {
    position: "absolute",
    display: "block",
    alignSelf: "auto",
    [theme.breakpoints.up("md")]: {
      fontWeight: "bold",
      fontSide: "large"
    }
  },
  enlace: {
    position: "absolute",
    display: "block",
    alignSelf: "flex-end",
    [theme.breakpoints.up("md")]: {
      fontWeight: "bold",
      fontSide: "large"
    }
  }
});

class GraficoCuentas extends Component {
  /**
   * Constructor de la clase
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
        cuentas: [],
        loading: true, //indica si la información se esta cargando
        balance: 0,
    }
    this.prepararDatosReales = this.prepararDatosReales.bind(this);
    this.prepararDatos = this.prepararDatos.bind(this);
    this.Interface = new Interfaz();
  }
  componentWillMount() {
    var userdata = JSON.parse(sessionStorage.getItem("userData"));
    if (userdata) {
      var mitoken = userdata.access_token;
      this.setState({ token: mitoken });
    } else {
      this.setState({ redirect: true });
    }
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.state.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch("v1/cuenta", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(cuentas => {
        setTimeout(
          () => this.setState({ cuentas: cuentas, loading: false }),
          300
        );
      });
  }
  //Funcion que calcula el total de todas las cuentas del usuario
  calcularBalance = () =>{
    let total = 0;
    this.state.cuentas.map(cuenta =>{
      total = total +cuenta.amount;
    })
    return total.toFixed(2);
  }
  /**
   * Funcion que adecua los valores de distribucion reales de cuentas a un
   * formato entendible para el grafico
   * @param {*} cuentas
   * 2020.05.10
   */
  prepararDatosReales(cuentas) {
    var data = [];
    cuentas.map(cuenta => {
      data.push({
        name: cuenta.name,
        value: cuenta.amount,
        color:  this.Interface.elegirColor(cuenta.color)
      });
      
    });
    console.log("el data es " + cuentas);
    
    return data;
  }
    /**
   * Funcion que adecua los valores de distribucion de ingreso en cuentas
   * a un formato entendible para el grafico
   * @param {*} cuentas
   */
  prepararDatos(cuentas) {
    var data = [];
    let prevData = JSON.parse(sessionStorage.getItem("userData"));
    console.log("el data es " + data);
    cuentas.map(cuenta => {
      data.push({
        name: cuenta.name,
        value: cuenta.XXXXX[0].distribution,
        color: this.Interface.elegirColor(cuenta.color),
      });
    });
    if(prevData["distribution"]>0){
      data.push({
        name: "Por asignar",
        value: prevData["distribution"],
        color: 3
      });
    }
    console.log("el data es " + cuentas);
    return data;
  }
  /**
   * Función para renderizar el componente
   */
  render() {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
    //Constante para poder usar los estilos de styles
    const { classes } = this.props;
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    /**
     * Devolvemos la visualización por pantalla del componenete
     */
    return (
      <Paper
        elevation={0}
        square
        className={classes.fondoGrafico}
      >
        <Typography variant="h5" className={classes.titular}>
        <Typography variant="subtitle2" >
          Balance
          </Typography>
          {this.calcularBalance()}€
        </Typography>

        <ResponsiveContainer width={"100%"} height={"90%"}>
          <PieChart>
            <Pie
              isAnimationActive={true}
              data={this.prepararDatosReales(this.state.cuentas)}
              fill="#8884d8"
              label
              labelLine={true}
              innerRadius={"70%"}
              paddingAngle={2}
            >
              {this.prepararDatosReales(this.state.cuentas).map(cuenta => (
                <Cell fill={cuenta.color} />
              ))}
            </Pie>
            <Tooltip payload={[{ unit: "%" }]} />
          </PieChart>
        </ResponsiveContainer>
        
        <Typography variant="subtitle2" className={classes.enlace}>
        <Link to="/movimientos">Ver Movimientos</Link>
        </Typography>
        
      </Paper>
      
    );
  }
}
/**
 * Exportamos la clase
 */
export default withStyles(styles)(GraficoCuentas);
