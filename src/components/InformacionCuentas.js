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
  IconButton
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import elijaCuenta from "./../assets/elijacuenta.PNG";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
    marginLeft: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0)
    }
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
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '100%',
    maxHeight: '100%',
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
    this.prueba =this.prueba.bind(this);
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
prueba(){
  alert("hola");
}
  render(){
    const {classes} = this.props;

  return (
    <main className={this.props.open ? classes.content : classes.contentShift}>
      <Hidden smDown>
        <div className={classes.appBarSpacer} />
      </Hidden>
        <Grid container spacing={0}   >
          <Grid item xs={12} md={4} lg={3}>
                  <List className={classes.demo}>
                  {this.state.cuentas.map((cuenta) => (
                    <ListItem button key={cuenta.id}>
                    <ListItemAvatar>
                    <div onClick={this.prueba}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </div>
                    </ListItemAvatar>
                    <ListItemText primary={cuenta.name} secondary={cuenta.amount +"€"} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <MoreHorizIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                  </ListItem>
                  ))}
                </List>
          </Grid>
          <Hidden smDown>
            <Grid container xs={12} md={8} lg={9} justify="center" alignItems="center">
                    <img src={elijaCuenta} alt="elija cuenta" height="200" weight="200"/>
                    <div>
                    <Typography variant="h6">No hay movimientos</Typography>
                    <Typography variant="h7">Selecciona una cuenta para ver sus movimientos</Typography>
                    </div>
            </Grid>
          </Hidden>
        </Grid>
        </main>
  );
  }
  
}


export default withStyles(styles)(InformacionCuentas);