import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
  Input,
  OutlinedInput,
  InputLabel,
  FormControl
} from "@material-ui/core";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      error: false,
      username: "",
      password: "",
      redirect: false,
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * Funcion que permite logearse en la aplicación
   */
  login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(this.state);
    //console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    if(this.state.username && this.state.password){
      fetch("v1/user/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        
        console.log(result['id']);
        if(result['access_token'])
        {
          sessionStorage.setItem('userData',JSON.stringify(result));

          this.setState({redirect:true});
        }
      })
      .catch(this.setState({error:true}));
    }
    
  }
  onChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state)
  }
  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };
  
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render()
  {
    const {
      classes,
    } = this.props;
    //Si el ya se ha logeado se le envia al home
    if(this.state.redirect){
      return (<Redirect to={'/'}/>)
    }
    //Si el usuario ya esta logeado se le manda a home
    if(sessionStorage.getItem("userData")){
      return (<Redirect to={'/'}/>)
    }
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/*Icono superior del inicio de sesión*/}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {/*Titulo inicio de sesión*/}
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {/*Formulario para recoger los datos del usuario*/}
          <form 
            className={classes.form} 
            noValidate
            onFormSubmit={e => {
              e.preventDefault();
              this.login();
            }}
            >
            {/*Campo para recoger el username*/}
            <TextField
              error= {this.state.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.onChange}
            />
            <FormControl variant="outlined" className={classes.form} >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              error= {this.state.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={this.state.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </FormControl>
            {/*Campo para recoger el password/}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
              
            />
            {/*Boton para iniciar sesión*/}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.login}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"¿No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
  
}
export default withStyles(styles)(SignIn);