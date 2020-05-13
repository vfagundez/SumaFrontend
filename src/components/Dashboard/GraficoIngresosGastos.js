/**
 * *Componente destinado a crear el componente de un grafico que los gastos e
 * *Ingresos de los meses a lo largo de un eje
 * 2020.05.12
 */
import React, { Component } from "react";
import { withStyles, Paper, Typography, Box } from "@material-ui/core";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const styles = theme => ({});

class GraficoCuentas extends Component {
  /**
   * Constructor de la clase
   * @param {*} props
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      movimientos: [],
      loading: true,
      token: "0"
    };
    this.prepararDatos = this.prepararDatos.bind(this);
    this.obtenerMes = this.obtenerMes.bind(this);
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
    fetch("v1/movimiento", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(movimientos => {
        setTimeout(
          () => this.setState({ movimientos: movimientos, loading: false }),
          100
        );
      });
  }
  /**
   * Funcion que devuelve el nombre del mes en funcion del numero de mes
   * @param {*} numeroMes  El numero de mes entre 0 y 11
   */
  obtenerMes(numeroMes) {
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ];
    return monthNames[numeroMes];
  }
  /**
   * Funcion que prepara los datos recibidos para mostrarlos en el grafico como
   * los gastos que has tenido y lo que has ahorrado
   * @param {*} movimientos 
   */
  prepararDatos(movimientos) {
    var data = [];
    let prevData = JSON.parse(sessionStorage.getItem("userData"));
    console.log("el data es " + data);
    movimientos.map(movimiento => {
      var date = new Date(movimiento.updated_at * 1000);
      var mes = date.getMonth();
      var nombreMes = this.obtenerMes(mes);
      var Anno = date.getFullYear();
      data.push({
        numeroMes: mes,
        mes: nombreMes,
        anno: Anno,
        valor: movimiento.amount
      });
    });
    var dataGrafico = [
      { mes: "Ene", ahorrado: 0, gastos: 0 },
      { mes: "Feb", ahorrado: 0, gastos: 0 },
      { mes: "Mar", ahorrado: 0, gastos: 0 },
      { mes: "Abr", ahorrado: 2000, gastos: 0 },
      { mes: "May", ahorrado: 0, gastos: 0 },
      { mes: "Jun", ahorrado: 0, gastos: 0 },
      { mes: "Jul", ahorrado: 0, gastos: 0 },
      { mes: "Ago", ahorrado: 0, gastos: 0 },
      { mes: "Sep", ahorrado: 0, gastos: 0 },
      { mes: "Oct", ahorrado: 0, gastos: 0 },
      { mes: "Nov", ahorrado: 0, gastos: 0 },
      { mes: "Dic", ahorrado: 0, gastos: 0 }
    ];
    data.map(dat => {
      var FechaActual = new Date();
      var annoActual = FechaActual.getFullYear();
      console.log("El anno es " + annoActual);
      //Solo queremos devolver los datos correspondiente a este año
      if (dat.anno == annoActual) {
        if (dat.valor >= 0) {
          //Guardamos el ingreso
          dataGrafico[dat.numeroMes].ahorrado =
            dataGrafico[dat.numeroMes].ahorrado + dat.valor;
        } else if (dat.valor < 0) {
          //Guardamos el gasto
          dataGrafico[dat.numeroMes].gastos =
            dataGrafico[dat.numeroMes].gastos - dat.valor;
            dataGrafico[dat.numeroMes].ahorrado = dataGrafico[dat.numeroMes].ahorrado+dat.valor;
        }
      }
    });

    //console.log(dataGrafico);
    return dataGrafico;
  }
  /**
   * Función para renderizar el componente
   */
  render() {
    //Constante para poder usar los estilos de styles
    const { classes } = this.props;
    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100
      }
    ];
    /**
     * Devolvemos la visualización por pantalla del componenete
     */
    return (
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={this.prepararDatos(this.state.movimientos)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gastos" stackId="a" fill="#8884d8" />
          <Bar dataKey="ahorrado" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
/**
 * Exportamos la clase
 */
export default withStyles(styles)(GraficoCuentas);
