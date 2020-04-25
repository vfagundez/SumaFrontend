import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Hidden,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  withStyles,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  useTheme,
  AppBar,
  Toolbar,
  CircularProgress
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import elijaCuenta from "./../assets/elijacuenta.PNG";
import elijamovimiento from "./../assets/elijamovimiento.png";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import InfoMovimiento from "./InfoMovimiento";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
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
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
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
  demo2: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 128px)"
    },
    height: "calc(100vh - 64px)",
    maxHeight: "100%"
  },
  title: {
    margin: theme.spacing(0, 0, 2)
  }
});

class InformacionCuentas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      loading: true, //indica si la información se esta cargando
      redirect: false, //si no estas logeado te redirecciona
      token: "0", //el token del usuario para realizar las peticiones al backend
      open: this.props.open, //comprueba si el menu lateral esta abierto o no
      cuenta: false, //comprueba si se ha pinchado para mostrar los movimientos de una cuenta
      cuentakey: 0,
      movimiento: false, //comprueba se se ha pinchado para mostrar la info de un movimiento
      movimientokey: 0
    };
    this.prueba = this.prueba.bind(this);
    this.handleCuenta = this.handleCuenta.bind(this);
    this.elegircolor = this.elegircolor.bind(this);
    this.elegirIcono = this.elegirIcono.bind(this);
    this.ingresoDeuda = this.ingresoDeuda.bind(this);
    this.acomodarFecha = this.acomodarFecha.bind(this);
    this.handleMovimiento = this.handleMovimiento.bind(this);
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
  prueba() {
    alert("hola");
  }
  handleCuenta(key, numero) {
    if (numero == 0) {
      this.setState({ cuenta: !this.state.cuenta });
    } else {
      this.setState({ cuenta: true });
    }
    this.setState({ cuentakey: numero });
    if (this.state.cuenta == false) {
      this.setState({ movimiento: false });
    }
    console.log(this.state);
    console.log(numero);
  }
  handleMovimiento(key, numero) {
    console.log(numero);
    if (numero == 0) {
      this.setState({ movimiento: !this.state.movimiento });
    } else {
      this.setState({ movimiento: !this.state.movimiento });
      //this.setState({movimiento: false});
      //this.setState({movimiento: true});
    }
    this.setState({ movimientokey: numero });
    console.log(this.state.movimientokey);
    //Dado que hemos podido borrar un movimiento
    this.componentDidMount(); //actualizamos los datos
  }
  elegircolor(color) {
    if (color == 1) {
      //Negro
      return "#29282C"; //Negro
    } else if (color == 2) {
      //VIOLETA
      return "#6B2C91"; //Violeta
    } else if (color == 3) {
      //AMARILLO
      return "#F9A825"; //Amarillo
    } else if (color == 4) {
      //VERDE
      return "#A1BF5B"; //Verde
    } else if (color == 5) {
      //AZUL OSCURO
      return "#273B89"; //Azul oscuro
    } else if (color == 6) {
      //NARANJA
      return "#F15A2B"; //Naranja oscuro
    } else if (color == 7) {
      //AZUL VERDOSO
      return "#52D0A1"; //Azul Verdoso
    }
  }
  elegirIcono(amount) {
    if (amount < 0) {
      return <TrendingDownIcon />;
    } else {
      return <TrendingUpIcon />;
    }
  }
  /**Esta funcion cambia el color del texto dependiendo si es un ingreso o una deuda */
  ingresoDeuda(amount) {
    if (amount < 0) {
      return (
        <Typography variant="inherit" color="error">
          {amount + "€"}
        </Typography>
      );
    } else {
      return (
        <Typography variant="inherit" color="textSecondary">
          {amount + "€"}
        </Typography>
      );
    }
  }
  /** Funcion que convierte la fecha unix  a fecha normal */
  acomodarFecha(fecha) {
    var date = new Date(fecha * 1000);
    return date.toLocaleDateString();
  }
  render() {
    const { classes } = this.props;
    const noCuenta = () => {
      return (
        <Hidden smDown>
          <Grid
            container
            xs={12}
            md={7}
            lg={8}
            justify="center"
            alignItems="center"
          >
            <img
              src={elijaCuenta}
              alt="elija cuenta"
              height="200"
              weight="200"
            />
            <div>
              <Typography variant="h6">No hay movimientos</Typography>
              <Typography variant="h7">
                Selecciona una cuenta para ver sus movimientos
              </Typography>
            </div>
          </Grid>
        </Hidden>
      );
    };
    const noMovimiento = () => {
      return (
        <Hidden smDown>
          <Grid
            container
            xs={12}
            md={5}
            lg={5}
            justify="center"
            alignItems="center"
          >
            <img
              src={elijamovimiento}
              alt="elija cuenta"
              height="200"
              weight="200"
            />
            <div>
              <Typography variant="h6">No hay Información</Typography>
              <Typography variant="h7">
                Selecciona un movimiento para ver su información
              </Typography>
            </div>
          </Grid>
        </Hidden>
      );
    };
    /**Funcion que muestra los movimientos de una cuenta */
    const cuenta = numeroCuenta => {
      return (
        <>
          <Grid item xs={12} md={3} lg={3}>
            {/**La barra de opciones del movimiento */}
            <AppBar position="static" color="white" elevation={0}>
              <Toolbar>
                {/**Boton para cerrar la información del movimiento */}
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={e => this.handleCuenta(e, 0)}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List className={classes.demo2}>
              {this.state.cuentas.map(cuenta => {
                if (cuenta.id == numeroCuenta) {
                  return cuenta.movimientos.map(movimiento => (
                    <ListItem
                      button
                      key={movimiento.id}
                      onClick={e => this.handleMovimiento(e, movimiento.id)}
                    >
                      <ListItemAvatar>
                        <div onClick={this.prueba}>
                          <Avatar
                            style={{
                              backgroundColor: this.elegircolor(cuenta.color)
                            }}
                          >
                            {this.elegirIcono(movimiento.amount)}
                          </Avatar>
                        </div>
                      </ListItemAvatar>
                      <ListItemText
                        primary={movimiento.name}
                        secondary={this.acomodarFecha(movimiento.created_at)}
                      />
                      <ListItemSecondaryAction>
                        <ListItemText
                          secondary={this.ingresoDeuda(movimiento.amount)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ));
                }
              })}

              <Hidden smUp>
                <div className={classes.appBarSpacer} />
              </Hidden>
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem />
        </>
      );
    };
    /**Funcion que muestra un listado con todas las cuentas del usuario */
    const cuentas = () => {
      return (
        <>
          <Grid item xs={12} md={3} lg={3}>
            {/**Circulo de carga */}
            {this.state.loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "calc(100vh - 64px)",
                  alignContent: "center"
                }}
              >
                <CircularProgress
                  style={{ display: "block", alignSelf: "center" }}
                />
              </div>
            ) : (
              /**Las cuentas del usuario */
              <List className={classes.demo}>
                {this.state.cuentas.map(cuenta => (
                  <ListItem
                    button
                    key={cuenta.id}
                    onClick={e => this.handleCuenta(e, cuenta.id)}
                  >
                    <ListItemAvatar>
                      <div onClick={this.prueba}>
                        <Avatar
                          style={{
                            backgroundColor: this.elegircolor(cuenta.color)
                          }}
                        >
                          <AccountBalanceWalletIcon />
                        </Avatar>
                      </div>
                    </ListItemAvatar>
                    <ListItemText
                      primary={cuenta.name}
                      secondary={cuenta.amount + "€"}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <MoreHorizIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <Hidden smUp>
                  <div className={classes.appBarSpacer} />
                </Hidden>
              </List>
            )}
          </Grid>
          <Divider orientation="vertical" flexItem />
        </>
      );
    };
    const cuentaNoMov = keycuenta => {
      return (
        <>
          {/**Si se ha seleccionado un movimiento y estamos en un movil se oculta los movimientos de la cuenta */}
          {this.state.movimiento ? (
            <Hidden smDown>{cuenta(keycuenta)}</Hidden>
          ) : (
            cuenta(keycuenta)
          )}
          {/** Y solo se muestra la info del movimiento */}
          {this.state.movimiento ? (
            <InfoMovimiento
              akey={this.state.movimientokey}
              handleMovimiento={this.handleMovimiento}
              movimiento={this.state.movimiento}
            />
          ) : (
            noMovimiento()
          )}
        </>
      );
    };
    return (
      <main
        className={this.props.open ? classes.content : classes.contentShift}
      >
        <Grid container spacing={0}>
          {/**Si se ha seleccionado una cuenta y estamos en un movil se oculta el menu de cuentas */}
          {this.state.cuenta ? <Hidden smDown>{cuentas()}</Hidden> : cuentas()}
          {/**Si se ha seleccionado un movimiento */}
          {this.state.cuenta ? cuentaNoMov(this.state.cuentakey) : noCuenta()}
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(InformacionCuentas);
