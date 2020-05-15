import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { Hidden, withStyles } from "@material-ui/core";
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
  CartesianGrid
} from "recharts";
import GraficoIngresosGastos from "./Dashboard/GraficoIngresosGastos";
import GraficoDistribucionCuentas from "./Dashboard/GraficoDistribucionCuentas"
import GraficoDistribucionIngresos from "./Dashboard/GraficoDistribucionIngresos"
const drawerWidth = 240;
const styles = theme => ({
  navBottom: {
    width: "100%",
    position: "absolute",
    bottom: theme.spacing(0)
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      marginTop: "64px"
    },
    marginLeft: drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  contentShift: {
    //Si estamos en un ordenador incluimos un espacio para colocar la barra de navegacion
    [theme.breakpoints.up("md")]: {
      marginTop: "64px"
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    flexGrow: 1,
    marginLeft: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0)
    }
  },
  demo: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 64px)"
    },
    height: "100vh",
    maxHeight: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: "45.5vh"
  }
});

class Informacion extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const data01 = [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 200 },
      { name: "Group E", value: 278 },
      { name: "Group F", value: 189 }
    ];
    return (
      <main
        className={this.props.open ? classes.content : classes.contentShift}
      >
        <Grid container spacing={0}>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={0}
              square
              variant="outlined"
              className={fixedHeightPaper}
            >
              <GraficoDistribucionIngresos/>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={0}
              square
              variant="outlined"
              className={fixedHeightPaper}
            >
              <GraficoDistribucionCuentas/>
            </Paper>
          </Grid>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              elevation={0}
              square
              variant="outlined"
              className={fixedHeightPaper}
            >
              <GraficoIngresosGastos />
            </Paper>
          </Grid>
          
        </Grid>
      </main>
    );
  }
}
export default withStyles(styles)(Informacion);
