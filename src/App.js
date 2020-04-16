import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Movimientos from './views/Movimientos';
import Cuentas from './views/Cuentas';
import { light, dark } from "./theme";





function App() {
  //Comprobamos la elección del tema en el dispositivo del usuario
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  console.log("c"+prefersDarkMode);//Comprobación
  //Establecemos el tema principal en funcion de la configuración del usuario
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',//prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    //Establecemos el tema
    <ThemeProvider theme={theme}>
      {/*Establecemos las rutas de navegación de la aplicación*/}
      <Router>
        {/*Ruta para entrar en la aplicación*/}
        <Route exact path="/signin">
          <SignIn/>
        </Route>
        {/*Ruta para registrarse en la aplicación*/}
        <Route exact path="/signup">
          <SignUp/>
        </Route>
        {/*Ruta para las cuentas*/}
        <Route exact path="/cuentas">
          <Cuentas/>
        </Route>
        {/*Ruta para los movimientos*/}
        <Route exact path="/movimientos">
          <Movimientos/>
        </Route>
        {/*Ruta para la pantalla principal de la aplicación*/}
        <Route exact path="/">
          <Dashboard/>
        </Route>
        </Router>
    </ThemeProvider>
  );
}

export default App;
