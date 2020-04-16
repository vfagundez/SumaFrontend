import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import SpeedDial from "@material-ui/lab/SpeedDial";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Slider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  grid: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FloatButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [distribution, setDistribution] = React.useState(
    JSON.parse(sessionStorage.getItem("userData")).distribution
  );
  const [name, setName] = React.useState();
  const handleNCuentaOpen = () => {
    setOpen1(true);
  };
  const handleNCuentaClose = () => {
    setOpen1(false);
  };
  const crearCuenta = () =>{
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+JSON.parse(sessionStorage.getItem("userData")).access_token);
    var raw = JSON.stringify({"name":name,"distribution":distribution,"color":"1","icon":"3"});
    //console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("v1/cuenta/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      setOpen1(false);
  }
  const handleNMovimiento = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        <SpeedDialAction
          key="Nuevo Movimiento"
          icon={<CompareArrowsIcon />}
          tooltipTitle={"Nuevo Movimiento"}
          onClick={handleNMovimiento}
        />
        <SpeedDialAction
          key="Nueva Cuenta"
          icon={<AccountBalanceWalletIcon />}
          tooltipTitle={"Nueva Cuenta"}
          onClick={handleNCuentaOpen}
        />
        ))}
      </SpeedDial>
      {/**CREAR NUEVA CUENTA */}
      <Dialog
        fullScreen
        open={open1}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleNCuentaClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Nueva Cuenta
            </Typography>
            <Button autoFocus color="inherit" onClick={crearCuenta}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="name"
              label="Nombre de Cuenta"
              fullWidth
              onChange={e => {
                setName(e.target.value);
                console.log(name);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography id="discrete-slider-always" gutterBottom>
              Porcentaje de Ingresos asociado
            </Typography>
            <Slider
              name="distribution"
              defaultValue={80}
              aria-labelledby="discrete-slider-always"
              step={5}
              valueLabelDisplay="on"
              max={JSON.parse(sessionStorage.getItem("userData")).distribution}
              onChange={(e, newValue) => {
                setDistribution(newValue);
                console.log(distribution);
              }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
