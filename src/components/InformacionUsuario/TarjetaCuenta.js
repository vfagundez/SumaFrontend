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
  Button,
  Card,
  CardContent,
  CardActions,
  Divider
} from "@material-ui/core";
import Interfaz from "../../classes/Interfaz";
import DatosUsuario from "./DatosUsuario";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Block } from "@material-ui/icons";
const drawerWidth = 240;
const styles = theme => ({
  root: {
    width: "20vh",
    height: 200,
    display: "block",
    position: "relative"
  },
  divider:{
    marginTop: "2vh",
    marginBottom:"2vh",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class TarjetaCuenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuenta: this.props.cuenta
    };
    this.Interface = new Interfaz();
    console.log(this.props.cuenta);
  }
  render() {
    const { classes } = this.props;
    return (
      <Card
        className={classes.root}
        variant="outlined"
      >
        <CardContent>
          <Avatar
      
            style={{
              backgroundColor: this.Interface.elegirColor(this.state.cuenta.color)
            }}
          >
            <AccountBalanceWalletIcon style={{display:"block"}}/>
          </Avatar>
          <Divider className={classes.divider}/>
          <Typography variant="body2">
            {this.state.cuenta.name}
          </Typography>
          <Typography variant="h5" >
            {this.state.cuenta.amount + "€"}
          </Typography>
        </CardContent>

      </Card>
    );
  }
}

export default withStyles(styles)(TarjetaCuenta);
