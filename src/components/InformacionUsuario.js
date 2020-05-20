/**
 * *Componente para mostrar la información del usuario registrado
 * 2020.05.18
 */
import React, { Component } from "react";
import {
  withStyles, Grid,
} from "@material-ui/core";
import AvatarUsuario from './InformacionUsuario/AvatarUsuario';
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
  }
});

class InformacionUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open //comprueba si el menu lateral esta abierto o no
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main
        className={this.props.open ? classes.content : classes.contentShift}
      >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <AvatarUsuario/>
            </Grid>
          </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(InformacionUsuario);
