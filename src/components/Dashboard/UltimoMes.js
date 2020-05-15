/**
 * *Componente destinado a crear el componente de un grafico que muestre el %
 * total del contenido de las cuentas
 * 2020.05.15
 */
import React, { Component } from "react";
import { withStyles, Paper, Typography, Box, Grid } from "@material-ui/core";
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
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
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
    justifyContent: "flex-start",
    alignItems: "center"
  },
  titular: {
    position: "absolute",
    display: "block",
    alignSelf: "flex-start",
    [theme.breakpoints.up("md")]: {
      fontWeight: "bold",
      fontSide: "large"
    }
  },
  subtitle: {
    position: "absolute",
    display: "block",
    alignSelf: "flex-start"
  },
  enlace: {
    position: "absolute",
    display: "block",
    alignSelf: "flex-end",
    [theme.breakpoints.up("md")]: {
      fontWeight: "bold",
      fontSide: "large"
    }
  },
  infoGridUltMes: {}
});

class UltimoMes extends Component {
  /**
   * Constructor de la clase
   * @param {*} props
   *
   */
  constructor(props) {
    super(props);
    var hoy = new Date();
    var mes = hoy.getMonth();
    this.state = {
      movimientos: [],
      loading: true,
      token: "0",
      mes: mes
    };
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
  obtenerMes = numeroMes => {
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
  };
  /**
   * Funcion que prepara los datos recibidos para mostrarlos en el grafico como
   * los gastos que has tenido y lo que has ahorrado
   * @param {*} movimientos ( los movimientos) nmes el numero de mes que queremos
   */
  prepararDatos = (movimientos, nmes) => {
    console.log("Los movimientos son" + JSON.stringify(this.state.movimientos));
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
      { mes: "Ene", ingresos: 0, gastos: 0 },
      { mes: "Feb", ingresos: 0, gastos: 0 },
      { mes: "Mar", ingresos: 0, gastos: 0 },
      { mes: "Abr", ingresos: 0, gastos: 0 },
      { mes: "May", ingresos: 0, gastos: 0 },
      { mes: "Jun", ingresos: 0, gastos: 0 },
      { mes: "Jul", ingresos: 0, gastos: 0 },
      { mes: "Ago", ingresos: 0, gastos: 0 },
      { mes: "Sep", ingresos: 0, gastos: 0 },
      { mes: "Oct", ingresos: 0, gastos: 0 },
      { mes: "Nov", ingresos: 0, gastos: 0 },
      { mes: "Dic", ingresos: 0, gastos: 0 }
    ];
    data.map(dat => {
      var FechaActual = new Date();
      var annoActual = FechaActual.getFullYear();
      console.log("El anno es " + annoActual);
      //Solo queremos devolver los datos correspondiente a este año
      if (dat.anno == annoActual) {
        if (dat.valor >= 0) {
          //Guardamos el ingreso
          dataGrafico[dat.numeroMes].ingresos =
            dataGrafico[dat.numeroMes].ingresos + dat.valor;
        } else if (dat.valor < 0) {
          //Guardamos el gasto
          dataGrafico[dat.numeroMes].gastos =
            dataGrafico[dat.numeroMes].gastos - dat.valor;
          //dataGrafico[dat.numeroMes].ingresos = dataGrafico[dat.numeroMes].ingresos+dat.valor;
        }
      }
    });

    //console.log(dataGrafico);
    return dataGrafico[nmes];
  };

  /**
   * Función para renderizar el componente
   */
  render() {
    //Constante para poder usar los estilos de styles
    const { classes } = this.props;
    /**
     * Devolvemos la visualización por pantalla del componenete
     */
    return (
      <Paper elevation={0} square className={classes.fondoGrafico}>
        <Typography variant="h6" className={classes.titular}>
          Ultimo Mes
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "initial"
                }}
              >
                <TrendingUpIcon
                  style={{
                    display: "block",
                    alignSelf: "center",
                    fontSize: 60,
                    color: "#3F784C"
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Ingresos</Typography>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold", color: "#3F784C  " }}
                >
                  {this.prepararDatos(
                    this.state.movimientos,
                    this.state.mes
                  ).ingresos.toFixed(2)}
                  €
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "initial"
                }}
              >
                <TrendingDownIcon
                  style={{
                    display: "block",
                    alignSelf: "center",
                    fontSize: 60,
                    color: "#D22B32  "
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Gastos</Typography>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold", color: "#D22B32" }}
                >
                  {this.prepararDatos(
                    this.state.movimientos,
                    this.state.mes
                  ).gastos.toFixed(2)}
                  €
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
/**
 * Exportamos la clase
 */
export default withStyles(styles)(UltimoMes);
