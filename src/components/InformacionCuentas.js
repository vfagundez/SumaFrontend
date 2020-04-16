import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import {
  Hidden,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  GridList,
  withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized-auto-sizer";
import { red } from "@material-ui/core/colors";

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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(),
    backgroundColor:red,

  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
    marginLeft: drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    flexGrow: 1,
    marginLeft: 0
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
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '80vh',
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
      loading: true,
      redirect: false,
      token: '0',
      open: this.props.open
    };
  }
  componentWillMount(){
    var userdata = JSON.parse(sessionStorage.getItem("userData"));
    if(userdata){
        var mitoken = userdata.access_token;
        this.setState({"token": mitoken})
    }else{
        this.setState({"redirect":true})
    }
}
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ this.state.token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch('v1/cuenta', requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((cuentas) => {
            setTimeout(() => this.setState({ cuentas: cuentas, loading: false }),300);
        })
}
  render(){
    const {classes} = this.props;

  return (
    <main className={this.props.open ? classes.content : classes.contentShift}>
      <Hidden smDown>
        <div className={classes.appBarSpacer} />
      </Hidden>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}   >
          {/* Chart 
          <Grid item xs={12} md={8} lg={8} style={{height:"100%"}}>
            <Paper className={fixedHeightPaper}>hola</Paper>
          </Grid>*/}
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4} style={{height: '80vh'}}>
                  <List className={classes.demo}>
                  {this.state.cuentas.map((cuenta) => (
                    <ListItem key={cuenta.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={cuenta.name} secondary={cuenta.amount +"€"} />
                  </ListItem>
                  ))}
                </List>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
  }
  
}


export default withStyles(styles)(InformacionCuentas);