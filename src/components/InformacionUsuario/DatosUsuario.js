/**
 * *Componente que muestra el numero de cuentas y movimientos
 * 2020.05.20
 */
import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Paper,
  Avatar,
  Divider,
  Typography
} from "@material-ui/core";
import Usuario from "../../classes/Usuario";
const drawerWidth = 240;
const styles = theme => ({
  paper: {
    width: "2vh",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class DatosUsuario extends Component {
  constructor(props) {
    super(props);
    this.DatosUser = new Usuario();
    this.state = {
      nCuentas: 0,
      nMovimientos: 0
    };
    this.obtenerNumeroCuentas = this.obtenerNumeroCuentas.bind(this);
  }
  componentDidMount() {
    this.obtenerNumeroCuentas();
    this.obtenerNumeroMovimientos();
  }
  obtenerNumeroCuentas() {
    var userdata = JSON.parse(sessionStorage.getItem("userData"));
    var token = userdata.access_token;
    var myHeaders = new Headers();
    var ncuentas = [];
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("v1/cuenta/total", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(cuentas => {
        this.setState({ nCuentas: cuentas });
      })
      .catch(error => console.log("error", error));
  }
  obtenerNumeroMovimientos() {
    var userdata = JSON.parse(sessionStorage.getItem("userData"));
    var token = userdata.access_token;
    var myHeaders = new Headers();
    var ncuentas = [];
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("v1/movimiento/total", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(nmov => {
        console.log(nmov);
        this.setState({ nMovimientos: nmov });
      })
      .catch(error => console.log("error", error));
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={3} className={classes.paper} elevation={0}>
          <Typography align="center"variant="h6">
            {this.state.nCuentas}
          </Typography>

          <Typography align="center"variant="caption">Cuentas</Typography>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          style={{ height: "3vh", alignSelf: "center" }}
        />
        <Grid item xs={3} className={classes.paper} elevation={0}>
          <Typography align="center"variant="h6">
            {this.state.nMovimientos}
          </Typography>

          <Typography align="center"variant="caption">Movimientos</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DatosUsuario);
