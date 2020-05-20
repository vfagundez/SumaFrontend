/**
 * *Componente para mostrar la imagen del usuario o su inicial en un avatar
 * *que ocupa completamente el grid
 * 2020.05.18
 */
import React, { Component } from "react";
import { withStyles, Grid, Paper, Avatar, Typography, Button } from "@material-ui/core";
import Usuario from "../../classes/Usuario";
import DatosUsuario from "./DatosUsuario";
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
      marginTop: "3vh",
    },
    marginTop: "7vh",
    marginBottom: "1vh",
    width: "15vh",
    height: "15vh",
    backgroundColor: "#3f51b5",
    fontSize: "10vh"
    //backgroundColor: theme.palette.background.paper
  },
  Nombre:{
    marginTop: "1vh",
    marginBottom: "2vh",
  }
});

class AvatarUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.DatosUser = new Usuario();
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={0} square >
        <Grid container justify="center">
          <Grid item xs={12}className={classes.posicionarAvatar}>
            <Avatar className={classes.Avatar}>
              {this.DatosUser.obtenerInicialUsuario()}
            </Avatar>
          </Grid>
          <Grid item xs={12} className={classes.Nombre}>
            <Typography align="center"variant="h5">{this.DatosUser.obtenerNombreUsuario()}</Typography>
          </Grid>
            <Button variant="contained"size="small" color="primary" className={classes.margin}>
          Editar
        </Button>
          <Grid item xs={12}>
            <DatosUsuario/>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(AvatarUsuario);
