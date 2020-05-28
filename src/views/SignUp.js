import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Usuario from "../classes/Usuario.js";
import { Redirect, Route } from "react-router-dom";
import { useRadioGroup, withStyles, CircularProgress } from "@material-ui/core";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_repeat: "",
      redirect: false,
      loading: false,
      //Errores
      errorUsr: false,
      errorPw: false,
      errorPwRepeat: false,
      //Mensajes de errores
      MsgErrorUsr: "",
      MsgErrorPw: "",
      MsgErrorPwRepeat: ""
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.signup = this.signup.bind(this);
  }
  signup() {
    this.setState({ loading: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      password_repeat: this.state.password_repeat
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    if (this.state.username && this.state.password) {
      fetch("v1/user/signup", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("el resultado" + JSON.stringify(result));
          if (result.access_token) {
            sessionStorage.setItem("userData", JSON.stringify(result));
            //return true;
            this.setState({ redirect: true });
            this.setState({ loading: false });
          } else {
            this.setState({ loading: false });
            this.setState({ redirect: false });
            this.setState({ errorUsr: true });
            this.setState({ MsgErrorUsr: "Ese usuario ya existe" });
            console.log("errors", result.errors);
            //return false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    //return true;
  }
  comprobarUsername = () => {
    if (this.state.username == "") {
      this.setState({ errorUsr: true });
      this.setState({
        MsgErrorUsr: "El nombre de usuario no puede estar vacio"
      });
      return false; //Se detiene el crear un nuevo usuario
    }
    return true; //Se sigue adelante
  };
  comprobarPwd = () => {
    if (this.state.password.length < 8) {
      this.setState({ errorPw: true });
      this.setState({
        MsgErrorPw:
          "La longitud de la contraseña debe ser de al menos 8 caracteres"
      });
      return false;
    }
    if (this.state.password != this.state.password_repeat) {
      this.setState({ errorPwRepeat: true });
      this.setState({ MsgErrorPwRepeat: "la contraseña no coincide" });
      return false;
    }
    return true;
  };

  /**
   * Controlador para crear un nuevo usuario
   */
  handleSignup = () => {
    this.setState({ errorUsr: false });
    this.setState({ errorPw: false });
    this.setState({ errorPwRepeat: false });
    this.setState({ MsgErrorUsr: "" });
    this.setState({ MsgErrorPw: "" });
    this.setState({ MsgErrorPwRepeat: "" });
    /*let user = new Usuario(
      this.state.username,
      this.state.password,
      this.state.password_repeat
    );*/
    if (this.comprobarUsername() && this.comprobarPwd()) {
      let resultado = this.signup();
      //this.setState({loading: true});
      //this.setState({ redirect: resultado });
      //console.log(this.state);
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { classes } = this.props;
    // Si se esta cargando
    if (this.state.loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "calc(100vh - 64px)",
            alignContent: "center"
          }}
        >
          <CircularProgress style={{ display: "block", alignSelf: "center" }} />
          ;
        </div>
      );
    }
    //Si el ya se ha logeado se le envia al home
    if (this.state.redirect && !this.state.loading) {
      return <Redirect to={"/"} />;
    }
    //Si el usuario ya esta logeado se le manda a home
    if (sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  onChange={this.onChange}
                  error={this.state.errorUsr}
                  helperText={this.state.MsgErrorUsr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={this.onChange}
                  error={this.state.errorPw}
                  helperText={this.state.MsgErrorPw}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password_repeat"
                  label="Repite la contraseña"
                  type="password"
                  id="password_repeat"
                  onChange={this.onChange}
                  error={this.state.errorPwRepeat}
                  helperText={this.state.MsgErrorPwRepeat}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSignup}
            >
              Registrarse
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles)(SignUp);
