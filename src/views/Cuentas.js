import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import { Hidden } from "@material-ui/core";
import FloatButton from "../components/FloatButton";
import BottomNav from "../components/BottomNavigation";
import InformacionCuentas from "../components/InformacionCuentas";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    height: '100vh'
    //flexGrow: 1
  }
});
/**
 * Componente que representa la vista principal de la aplicación
 */
class Cuentas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, //variable para redirigir al login si no esta logeado
      open: false //Variable para compropbar si el menu lateral esta abierto
    };
    this.updateOpen = this.updateOpen.bind(this);
  }

  componentWillMount() {
    //Comprobamos que el usuario esta logueado comprobando que exista "userData"
    if (sessionStorage.getItem("userData")) {
      console.log("Call user feed");
    } else {
      //Si no redirigimos al login
      this.setState({ redirect: true });
    }
  }
  //Función para actualizar el estado del state open, es decir si el menu esta abierto o no
  updateOpen() {
    this.setState({ open: !this.state.open });
  }
  //RENDERIZADO
  render() {
    const { classes } = this.props;
    //Si el state para redirigir es verdadero redirigimos al login
    if (this.state.redirect) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div className={classes.root}>
        {/**La Barra de navegación  */}
        <NavBar updateOpen={this.updateOpen} open={this.state.open} />
        {/**La barra inferior (solo para moviles) */}
        <BottomNav />
        {/**El contenido de la pagina */}
        <InformacionCuentas open={this.state.open} />
        {/**El boton flotante */}
        <FloatButton />
      </div>
    );
  }
}
export default withStyles(styles)(Cuentas);
