/**
 * *Componente para mostrar la imagen del usuario o su inicial en un avatar
 * *que ocupa completamente el grid
 * 2020.05.18
 */
import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Paper,
  Avatar,
  Typography,
  Button
} from "@material-ui/core";
import Usuario from "../../classes/Usuario";
import DatosUsuario from "./DatosUsuario";
import TarjetaCuenta from "./TarjetaCuenta";
import { Link } from "react-router-dom";
const drawerWidth = 240;
const styles = theme => ({
  posicionarAvatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  Avatar: {
    //display: "block",
    //alignSelf: "auto",
    [theme.breakpoints.up("md")]: {
      marginTop: "3vh"
    },
    marginTop: "7vh",
    marginBottom: "1vh",
    width: "15vh",
    height: "15vh",
    backgroundColor: "#3f51b5",
    fontSize: "10vh"
    //backgroundColor: theme.palette.background.paper
  },
  Nombre: {
    marginTop: "1vh",
    marginBottom: "2vh"
  },
  Cuentas: {
    width: "98%",
    marginTop: "1vh",
    marginBottom: "2vh",
    marginLeft: "1vh",
    marginRight: "2vh"
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
  VerCuentas: {

    position: "relative",

    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});

class CuentasEnTarjetas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      token: "0", //el token del usuario para realizar las peticiones al backend
      loading: true //indica si la información se esta cargando
    };
    this.DatosUser = new Usuario();
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
  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={0} square>
        <Grid
          container
          className={classes.Cuentas}
          spacing={3}
          justify="center"
        >
          {this.state.cuentas.map(cuenta => {
            return (
              <Grid item>
                <TarjetaCuenta cuenta={cuenta} />
              </Grid>
            );
          })}
          <Grid item xs={12} className={classes.VerCuentas}>
            <Typography variant="subtitle2" className={classes.enlace}>
              <Link to="/cuentas">Ver Cuentas</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(CuentasEnTarjetas);
