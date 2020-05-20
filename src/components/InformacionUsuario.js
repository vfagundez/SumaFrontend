/**
 * *Componente para mostrar la información del usuario registrado
 * 2020.05.18
 */
import React, { Component } from "react";
import {
  withStyles,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden
} from "@material-ui/core";
import AvatarUsuario from "./InformacionUsuario/AvatarUsuario";
import CuentasEnTarjetas from "./InformacionUsuario/CuentasEnTarjetas";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Redirect, Route, NavLink, useHistory } from "react-router-dom";
const drawerWidth = 240;
const styles = theme => ({
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
  appBarSpacer: theme.mixins.toolbar
});

class InformacionUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      open: this.props.open //comprueba si el menu lateral esta abierto o no
    };
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }
  cerrarSesion(){
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
    

  }
  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <main
        className={this.props.open ? classes.content : classes.contentShift}
      >
        <Hidden mdUp>
          {/**La barra de opciones del movimiento */}
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}></Typography>
              {/**Boton para borrar el movimiento */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                className={classes.menuButton}
                onClick={this.cerrarSesion}
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <AvatarUsuario />
          </Grid>
          <Grid item xs={12}>
            <CuentasEnTarjetas />
          </Grid>
        </Grid>
        <Hidden mdUp>
          <div className={classes.appBarSpacer} />
        </Hidden>
      </main>
    );
  }
}

export default withStyles(styles)(InformacionUsuario);
