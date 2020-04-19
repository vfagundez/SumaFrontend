import React, { Component } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Redirect, Route, NavLink, useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import {
  Typography,
  withStyles,
  SvgIcon,
  Box,
  Hidden,
  useMediaQuery
} from "@material-ui/core";


const drawerWidth = 240;//Tamaño maximo del menu lateral
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom:"1px solid #000",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  toolbar: {
    paddingRight: 24 // mantiene un padding lateral cuando el menu esta cerrado
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  menuLateral: {
    marginLeft: theme.spacing(1)
  },
  prueba: {
    flexGrow: 1,
    align: "center"
  }
});

/**
 * Clase dedicada a la barra superior de navegación y al menu lateral
 */
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      anchorEl: null,
      open: this.props.open
    };
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.obtenerRuta = this.obtenerRuta.bind(this);
  }
  //isMobile = useMediaQuery(this.theme.breakpoints.down("xs"));
  //Funcion encargada de finalizar la sesión
  logout() {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  handleDrawerOpen(event) {
    this.props.updateOpen(event);
    this.setState({ open: !this.state.open });
  }
  handleRedirect(site) {
    let path= '/movimientos';
    let history = useHistory();
    history.push(path);
  }
  obtenerRuta(){
    var pathname = window.location.pathname;
    pathname = pathname.slice(1);
    pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    if(pathname=== "")
    {
        pathname="Dashboard";
    }
    return pathname;
}

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={"/signin"} />;
    }
    //console.log(this.state);
    return (
      <div>
        <Hidden smDown>
        {/*BARRA DE NAVEGACIÓN*/}
        <AppBar position="fixed" className={classes.appBar} color="primary" elevation={0} >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              <Hidden smDown>{this.obtenerRuta()}</Hidden>
            </Typography>
            <Hidden mdUp>
              {/*El logo de la aplicación para movil*/}
              <Box className={classes.prueba}>
                <SvgIcon>
                  <g
                    id="Grupo_24"
                    data-name="Grupo 24"
                    transform="translate(-1833.959 -751.815)"
                  >
                    <path
                      id="Trazado_33"
                      data-name="Trazado 33"
                      d="M134.432,258.578v-3.729l-5.832.124h-.017l0-5.974-3.728,0,0,5.845H119v3.734h5.849v5.849h3.733v-5.849Z"
                      transform="translate(1714.959 509.116)"
                      fill="#ffc600"
                    />
                  </g>
                </SvgIcon>
              </Box>
            </Hidden>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.logout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        {/*MENU DE NAVEGACIÓN*/}
        
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <Toolbar />
            <List className={classes.menuLateral}>
                <ListItem button key="Dashboard" onClick={event =>  window.location.href='/'}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Panel Principal" />
                </ListItem>

                <ListItem button key="Cuentas" onClick={event =>  window.location.href='/cuentas'}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cuentas" />
                </ListItem>

                <ListItem button key="Movimientos" onClick={event =>  window.location.href='/movimientos'}>
                  <ListItemIcon>
                    <CompareArrowsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movimientos" />
                </ListItem>
            </List>
            <Divider />
          </Drawer>
        </Hidden>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);
