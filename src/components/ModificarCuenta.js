/**
 * *Componente destinado a crear el componente de modificar la cuenta actual
 * 2020.05.10
 */
import React, { Component } from "react";
import {
  withStyles,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Avatar,
  Divider,
  Button
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  FormHelperText,
  Switch,
  MenuItem
} from "@material-ui/core";
import Interfaz from "../classes/Interfaz";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  DoneOutlined as CheckIcon,
  CenterFocusStrong
} from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";

const Usestyles = makeStyles(theme => ({
  checkboxRoot: {
    padding: "0px !important"
  },
  colorCircle: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    margin: "auto",
    borderRadius: "50%",
    display: "inline-block",
    borderStyle: "solid",
    borderColor: "transparent",
    borderWidth: "2px"
  },
  checkboxRoot: {
    padding: "0px !important"
  },
}));
const styles = theme => ({
  fondoGrafico: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 64px)"
    },
    height: "100vh",
    maxHeight: "100%",
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  avatarCelda: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    //marginLeft:theme.spacing(0),
    display: "block",
    alignSelf: "auto"
  },
  grid: {
    width: "100%",
    position: "relative",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2)
  },
  appBar: {
    position: "relative"
  },
  appBarSpacer: {
    marginBottom: "7%"
  }
});

//Funcion para elegir el color de la cuenta
function ColorItem({ color, isChecked, onClick: onPressed }) {
  const classes = Usestyles();
  return (
    <Checkbox
      classes={{ root: classes.checkboxRoot }}
      icon={<ColorUnselected color={color} />}
      checkedIcon={<ColorSelected color={color} />}
      color="default"
      checked={isChecked}
      onClick={() => onPressed(color)}
    />
  );
}
//Funcion para representar un color no seleccionado
function ColorUnselected({ color }) {
  const classes = Usestyles();
  const theme = useTheme();
  return (
    <span
      className={classes.colorCircle}
      style={{
        backgroundColor: color,
        borderColor: color === "#FFF" ? theme.palette.divider : "transparent"
      }}
    />
  );
}
//Funcion para representar un color seleccionado
function ColorSelected({ color }) {
  const classes = Usestyles();
  const theme = useTheme();
  return (
    <span
      className={classes.colorCircle}
      style={{
        backgroundColor: color,
        borderColor: color
      }}
    >
      <CheckIcon htmlColor={"white"} style={{ verticalAlign: "middle" }} />
    </span>
  );
}

class ModificarCuenta extends Component {
  /**
   * Constructor de la clase
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      cuentaAbierta: this.props.cuentaAbierta,
      selectedColor: this.props.cuentaAbierta.color,
      name: this.props.cuentaAbierta.name,
      description: ""+this.props.cuentaAbierta.description,
      distribution: this.props.cuentaAbierta.XXXXX[0].distribution,
      id: this.props.cuentaAbierta.id,
    };
    this.Interface = new Interfaz();
    console.log(this.props.cuentaAbierta);
    this.onSelectColor = this.onSelectColor.bind(this);
    this.ActualizarCuenta = this.ActualizarCuenta.bind(this);
  }
  //Para cerrar la informacion de la cuenta en cuestion
  volver(e) {
    this.props.handleCuenta(e, 0);
    this.setState({ mov: !this.state.cuentaAbierta });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value })
  };
  onSelectColor = color => {
    this.setState({ selectedColor: color });
  };
  ActualizarCuenta(){
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + JSON.parse(sessionStorage.getItem("userData")).access_token
      );
      var raw = JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        distribution: this.state.distribution,
        color: this.state.selectedColor,
      });
      //console.log(raw);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("v1/cuenta/"+this.state.id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
      //Actualizamos el valor de la distribución en sesion
      let prevData = JSON.parse(sessionStorage.getItem("userData"));
      //console.log(prevData["distribution"]);
      prevData["distribution"] = prevData["distribution"] +this.state.cuentaAbierta.XXXXX[0].distribution - this.state.distribution;
      sessionStorage.setItem("userData", JSON.stringify(prevData));
      //console.log(prevData);
      //window.location.href='/cuentas'
      window.location.reload();

  }
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
      <Paper
        elevation={0}
        variant="outlined"
        square
        className={classes.fondoGrafico}
      >
        <Grid container spacing={3} className={classes.grid} justify="center">
          {/**La barra de opciones de la cuenta */}
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              {/**Boton para cerrar la información de la cuenta */}
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={e => this.volver(e)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}></Typography>
              {/**Boton para borrar la cuenta */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                className={classes.menuButton}
                onClick={this.eliminar}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} justify="center" >
            <Typography variant="h4">Modificar Cuenta</Typography>
            
          </Grid>
          <Grid item xs={2} justify="center" className={classes.avatarCelda}>
            <Avatar
              className={classes.avatarCelda}
              style={{
                backgroundColor: this.Interface.elegirColor(
                    this.props.cuentaAbierta.color//this.state.selectedColor
                )
              }}
            >
              <AccountBalanceWalletIcon className={classes.avatar} />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1" className={classes.title}>
              Nombre
            </Typography>
            <TextField
              required
              name="name"
              id="name"
              //error={error}
              label={this.props.cuentaAbierta.name}
              fullWidth
              onChange={this.onChange}
            />
          </Grid>

          {/**LA DESCRIPCIÓN DE LA CUENTA */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.title}>
              Descripción
            </Typography>
            <TextField
              multiline
              required
              //error={error}
              name="description"
              id="description"
              label={this.props.cuentaAbierta.description}
              fullWidth
              onChange={this.onChange}
            />
          </Grid>

          {/**ELEGIR CANTIDAD APORTADA A LA CUENTA */}
          <Grid item xs={12}>
            <Typography id="discrete-slider-always" gutterBottom>
              Porcentaje de Ingresos asociado
            </Typography>
            <div className={classes.appBarSpacer}></div>
            <Slider
              name="distribution"
              defaultValue={this.props.cuentaAbierta.XXXXX[0].distribution}
              aria-labelledby="discrete-slider-always"
              step={5}
              valueLabelDisplay="on"
              max={
                this.props.cuentaAbierta.XXXXX[0].distribution +
                JSON.parse(sessionStorage.getItem("userData")).distribution
              }
              onChange={this.onChange}
            />
          </Grid>
          {/**ELEGIR COLOR DE LA CUENTA */}
          <Grid item xs={12}>
            <Typography id="discrete-slider-always" gutterBottom>
              Color de la cuenta
            </Typography>
            <Grid container spacing={5}>
              <Grid item>
                <ColorItem
                  key={1}
                  color="#29282C"
                  isChecked={this.selectedColor === 1}
                  onClick={() => this.onSelectColor(1)}
                />
              </Grid>
              <Grid item>
                <ColorItem
                  key={2}
                  color="#6B2C91"
                  isChecked={this.selectedColor === 2}
                  onClick={() => this.onSelectColor(2)}
                />
              </Grid>
              <Grid item>
                <ColorItem
                  key={3}
                  color="#F9A825"
                  isChecked={this.selectedColor === 3}
                  onClick={() => this.onSelectColor(3)}
                />
              </Grid>
              <Grid item>
                <ColorItem
                  key={4}
                  color="#A1BF5B"
                  isChecked={this.selectedColor === 4}
                  onClick={() => this.onSelectColor(4)}
                />
              </Grid>
              <Grid item>
                <ColorItem
                  key={5}
                  color="#273B89"
                  isChecked={this.selectedColor === 5}
                  onClick={() => this.onSelectColor(5)}
                />
              </Grid>
              <Grid item>
                <ColorItem
                  key={6}
                  color="#F15A2B"
                  isChecked={this.selectedColor === 6}
                  onClick={() => this.onSelectColor(6)}
                />
              </Grid>
              <Grid item>
                <ColorItem
                  key={7}
                  color="#52D0A1"
                  isChecked={this.selectedColor === 7}
                  onClick={() => this.onSelectColor(7)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={this.ActualizarCuenta}
            >
              Guardar
            </Button>
            </Grid>
        </Grid>
      </Paper>
    );
  }
}
/**
 * Exportamos la clase
 */
export default withStyles(styles)(ModificarCuenta);
