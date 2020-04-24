import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Hidden,
  withStyles,
  IconButton,
  Divider,
  AppBar,
  Toolbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const styles = theme => ({
  navBottom: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    position: "fixed",
    bottom: theme.spacing(0)
  },
  demo: {
    width: "100%",
    //maxWidth: 360,
    //backgroundColor: 'blue',//theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 64px)',
    },
    height: "100vh",
    maxHeight: "100%"
  },
  appBarSpacer: theme.mixins.toolbar,
  root: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  },
  menuButton: {
    marginRight: theme.spacing(0)
  },
  precio: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});
class InfoMovimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movimiento: [],
      loading: true,
      token: 0,
      redirect: false,
      mov: this.props.movimiento,//indica si hay un movimiento seleccionado  o no

    };
    this.volver = this.volver.bind(this);
    this.eliminar =this.eliminar.bind(this);
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
    fetch("v1/movimiento/" + this.props.akey, requestOptions)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(movimiento => {
        console.log(movimiento);
        setTimeout(
          () => this.setState({ movimiento: movimiento, loading: false }),
          300
        );
      });
  }
  //Para cerrar la informacion del movimiento en cuestion
  volver(e){
      this.props.handleMovimiento(e,0);
      this.setState({mov:!this.state.movimiento})
  }
  //elimina el movimiento actual de la base de datos
  eliminar(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.state.token);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch("v1/movimiento/" + this.props.akey, requestOptions)
      .then(response => {
        console.log(response);
        //return response.json();
      })
      .then(movimiento => {
        console.log(movimiento);
        setTimeout(
          () => this.setState({ movimiento: movimiento, loading: false }),
          300
        );
      });
      this.volver();
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container xs={12} md={"true"} lg={"true"} className={classes.demo}>
        <div className={classes.root}>
          {/**La barra de opciones del movimiento */}
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                {/**Boton para cerrar la información del movimiento */}
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={(e)=> this.volver(e)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}></Typography>
              {/**Boton para borrar el movimiento */}
              <IconButton edge="end" color="inherit" aria-label="menu" className={classes.menuButton} onClick={this.eliminar}>
                <DeleteOutlineIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/**La información del movimiento */}
          <div className={classes.section1}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {this.state.movimiento.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6" className={classes.precio}>
                  {this.state.movimiento.amount + "€"}
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary" variant="body2">
              {this.state.movimiento.description}
            </Typography>
          </div>
          <Divider variant="middle" />
          <div className={classes.section2}>
            <Typography gutterBottom variant="body1">
              Categorias
            </Typography>
            <div>
              <Chip className={classes.chip} label="Extra Soft" />
              <Chip className={classes.chip} color="primary" label="Soft" />
              <Chip className={classes.chip} label="Medium" />
              <Chip className={classes.chip} label="Hard" />
            </div>
          </div>
          <div className={classes.section3}>
            <Button color="primary">Add to cart</Button>
          </div>
        </div>
      </Grid>
    );
  }
}
export default withStyles(styles)(InfoMovimiento);
