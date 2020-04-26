import React, { useEffect } from "react";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { DoneOutlined as CheckIcon } from "@material-ui/icons";
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Slider,
  FormHelperText,
  Avatar,
  Switch,
  MenuItem
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
  appBarSpacer: {
    marginBottom: "7%"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  grid: {
    width: "auto",
    position: "relative",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  avatar:{
    marginLeft:theme.spacing(0),
  },
  colorCircle: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    margin: "auto",
    borderRadius: "50%",
    display: "inline-block",
    borderStyle: "solid",
    borderColor: "transparent",
    borderWidth: "2px"
  },
  checkboxRoot: {
    padding: "0px !important"
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//Funcion para elegir el color de la cuenta
function ColorItem({ color, isChecked, onClick: onPressed }) {
  const classes = useStyles();
  return (
    <Checkbox
      classes={{ root: classes.checkboxRoot }}
      icon={<ColorUnselected color={color} />}
      checkedIcon={<ColorSelected color={color} />}
      color="default"
      checked={isChecked}
      onClick={() => onPressed(color)}
    />
  );
}
//Funcion para representar un color no seleccionado
function ColorUnselected({ color }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <span
      className={classes.colorCircle}
      style={{
        backgroundColor: color,
        borderColor: color === "#FFF" ? theme.palette.divider : "transparent"
      }}
    />
  );
}
//Funcion para representar un color seleccionado
function ColorSelected({ color }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <span
      className={classes.colorCircle}
      style={{
        backgroundColor: color,
        borderColor: color
      }}
    >
      <CheckIcon htmlColor={'white'} style={{verticalAlign:"middle"}}/>
    </span>
  );
}
export default function FloatButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);//PARA DESPLEGAR LAS OPCIONES DEL BOTON
  const [open1, setOpen1] = React.useState(false);//PARA NUEVA CUENTA
  const [open2, setOpen2] = React.useState(false);//PARA NUEVO MOVIMIENTO
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [distribution, setDistribution] = React.useState(
    JSON.parse(sessionStorage.getItem("userData")).distribution
  );
  const [cuentas, setCuentas] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState("");
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(1);//Para seleccionar el color de la cuenta
  const [cuentaElegida, setCuentaElegida] = React.useState(0);
  const [ingreso, setIngreso] = React.useState(false);


  
  const handleIngreso = () =>{
    setIngreso(!ingreso);
  }
  //Funcion para establecer la cuenta elegida para el determinado movimiento
  const handleCuentaElegida = (event) =>{
    setCuentaElegida(event.target.value);
    //console.log("El event " +event.target.value);
  }

  const handleNCuentaOpen = () => {
    setOpen1(true);
  };
  const handleNCuentaClose = () => {
    setOpen1(false);
  };
  const handleNMovimientoOpen = () => {
    setOpen2(true);
  };
  const handleNMovimientoClose = () => {
    setOpen2(false);
  };
   //obtener las cuentas del usuario equivalente a componentdidmount
  useEffect(() =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + JSON.parse(sessionStorage.getItem("userData")).access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch("v1/cuenta", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(lasCuentas => {
        setCuentas(lasCuentas);
        //console.log(cuentas);
      });
  },[]);
  //Funcion para crear un nuevo movimiento
  const crearMovimiento = () => {
    if(amount <= 0)
    {
      setError(true);
      setMensajeError(
        "La cantidad introducida no es valida, debe introducir un numero positivo"
      );
    }else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + JSON.parse(sessionStorage.getItem("userData")).access_token
      );

      var raw = JSON.stringify({
        name: name,
        description: description,
        idCuenta: cuentaElegida,
        amount: ingreso ? amount: -amount,
      });
      //console.log(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("v1/movimiento/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
      setOpen2(false);
      window.location.reload();
      //window.location.href= '/cuentas'
    }
  }
  //Funcion para crear una nueva cuenta
  const crearCuenta = () => {
    if (distribution <= 0) {
      setError(true);
      setMensajeError(
        "El porcentaje de ingresos no es suficiente, prueba reduciendo la cantidad destinada a otras cuentas"
      );
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + JSON.parse(sessionStorage.getItem("userData")).access_token
      );
      var raw = JSON.stringify({
        name: name,
        distribution: distribution,
        color: selectedColor,
      });
      //console.log(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("v1/cuenta/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
      setOpen1(false);
      //Actualizamos el valor de la distribución en sesion
      let prevData = JSON.parse(sessionStorage.getItem("userData"));
      //console.log(prevData["distribution"]);
      prevData["distribution"] = prevData["distribution"] - distribution;
      sessionStorage.setItem("userData", JSON.stringify(prevData));
      //console.log(prevData);
      //window.location.href='/cuentas'
      //window.location.reload();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onSelectColor = color => {
    setSelectedColor(color);
  };
  const elegircolor =(color)=>{
    if (color == 1)//Negro
        {
            return '#29282C';  //Negro
        } else if (color == 2)//VIOLETA
        {
            return '#6B2C91';  //Violeta
        } else if (color == 3)//AMARILLO
        {
            return '#F9A825';  //Amarillo
        } else if (color == 4)//VERDE
        {
            return '#A1BF5B';  //Verde
        } else if (color == 5)//AZUL OSCURO 
        {
            return '#273B89';  //Azul oscuro
        } else if (color == 6)//NARANJA
        {
            return '#F15A2B';  //Naranja oscuro
        } else if (color == 7)//AZUL VERDOSO
        {
            return '#52D0A1';  //Azul Verdoso
        }
  }
  /**FUNCION PARA CREAR UNA NUEVA CUENTA */
  const crearNuevaCuenta = () =>{
    return (
      <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
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
            guardar
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} className={classes.grid} justify="center">
          <Grid item xs={2} justify="center">
            <Avatar className={classes.avatar} style={{backgroundColor: elegircolor(selectedColor)}}>
              <AccountBalanceWalletIcon />
            </Avatar>
          </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="name"
            error={error}
            label="Nombre de Cuenta"
            fullWidth
            onChange={e => {
              setName(e.target.value);
              //console.log(name);
            }}
          />
        </Grid>
        {/**LA DESCRIPCIÓN DE LA CUENTA */}
        <Grid item xs={12}>
          <TextField
            multiline
            required
            error={error}
            id="description"
            label="Descripción de la cuenta"
            fullWidth
            onChange={e => {
              setDescription(e.target.value);
              //console.log(name);
            }}
          />
        </Grid>
        
        {/**ELEGIR CANTIDAD APORTADA A LA CUENTA */}
        <Grid item xs={12}>
          <Typography id="discrete-slider-always" gutterBottom>
            Porcentaje de Ingresos asociado
          </Typography>
          <div className={classes.appBarSpacer}></div>
          <Slider
            name="distribution"
            defaultValue={
              JSON.parse(sessionStorage.getItem("userData")).distribution
            }
            aria-labelledby="discrete-slider-always"
            step={5}
            valueLabelDisplay="on"
            max={JSON.parse(sessionStorage.getItem("userData")).distribution}
            onChange={(e, newValue) => {
              setDistribution(newValue);
              //console.log(distribution);
            }}
          />
        </Grid>
        {/**ELEGIR COLOR DE LA CUENTA */}
        <Grid item xs={12}>
        <Typography id="discrete-slider-always" gutterBottom>
            Color de la cuenta
          </Typography>
          <Grid container spacing={5}>
          <Grid item>
          <ColorItem
            key={1}
            color="#29282C"
            isChecked={selectedColor ===1}
            onClick={() => onSelectColor(1)}
          />
          </Grid>
          <Grid item>
          <ColorItem
            key={2}
            color="#6B2C91"
            isChecked={selectedColor ===2}
            onClick={() => onSelectColor(2)}
          />
          </Grid>
          <Grid item>
          <ColorItem
            key={3}
            color="#F9A825"
            isChecked={selectedColor ===3}
            onClick={() => onSelectColor(3)}
          />
          </Grid>
          <Grid item>
          <ColorItem
            key={4}
            color="#A1BF5B"
            isChecked={selectedColor ===4}
            onClick={() => onSelectColor(4)}
          />
          </Grid>
          <Grid item>
          <ColorItem
            key={5}
            color="#273B89"
            isChecked={selectedColor ===5}
            onClick={() => onSelectColor(5)}
          />
          </Grid>
          <Grid item>
          <ColorItem
            key={6}
            color="#F15A2B"
            isChecked={selectedColor ===6}
            onClick={() => onSelectColor(6)}
          />
          </Grid>
          <Grid item>
          <ColorItem
            key={7}
            color="#52D0A1"
            isChecked={selectedColor ===7}
            onClick={() => onSelectColor(7)}
          />
          </Grid>
          </Grid>
        
        </Grid>
        <Grid item xs={12}>
          <FormHelperText error={error}>{mensajeError}</FormHelperText>
        </Grid>
      </Grid>
    </Dialog>
    );
  }
  /**FUNCION PARA CREAR UN NUEVO MOVIMIENTO */
  const crearNuevoMovimiento = () =>{
    return (
      <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      open={open2}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleNMovimientoClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nuevo {ingreso ? "Ingreso":"Gasto"}
          </Typography>
          <Button autoFocus color="inherit" onClick={crearMovimiento}>
            guardar
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} className={classes.grid} justify="center">
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            label="Nombre del Movimiento"
            fullWidth
            onChange={e => {
              setName(e.target.value);
              //console.log(name);
            }}
          />
        </Grid>
        {/**LA DESCRIPCIÓN DEL MOVIMIENTO */}
        <Grid item xs={12}>
          <TextField
            multiline
            required
            id="description"
            label="Descripción del movimiento"
            fullWidth
            onChange={e => {
              setDescription(e.target.value);
              //console.log(name);
            }}
          />
        </Grid>
        
        {/**INTRODUCIR CANTIDAD DEL MOVIMIENTO */}
        <Grid item xs={12}>
        <TextField
          fullWidth
          error={error}
          id="filled-number"
          label="Cantidad"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => {
            setAmount(e.target.value);
            //console.log(name);
          }}
          helperText="Introduce un numero positivo"
        />
        </Grid>
        <Grid item xs={2}>
          <div style={{marginTop:'15px'}}>
          <Switch value={ingreso} onClick={handleIngreso}/>
          </div>
        </Grid>
        {/**INTRODUCIR CUENTA ASOCIADA*/}
        <Grid item xs={10}>
        {ingreso ? (<></>): (
          <TextField
          fullWidth
          id="standard-select-currency"
          select
          label="Selecciona la cuenta asociada"
          value={cuentaElegida}
          onChange={handleCuentaElegida}
        >
          {cuentas.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        )}
        
        </Grid>

      </Grid>
    </Dialog>
    );
  }
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
          onClick={handleNMovimientoOpen}
        />
        <SpeedDialAction
          key="Nueva Cuenta"
          icon={<AccountBalanceWalletIcon />}
          tooltipTitle={"Nueva Cuenta"}
          onClick={handleNCuentaOpen}
        />
        ))}
      </SpeedDial>
      {crearNuevaCuenta()} 
      {crearNuevoMovimiento()} 
    </div>
  );
}
