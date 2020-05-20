export default  class Usuario{
    /**
     * 
     * @param {*} username El nombre del usuario
     * @param {*} password La contraseña del usuario
     * @param {*} password_repeat La repetición de la contraseña del nuevo usuario
     */
    constructor(username,password,password_repeat){
        this.datos = {
            username: username,
            password: password,
            password_repeat: password_repeat,
        }
    }
    signup() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(this.datos);
        console.log(raw);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };
          if (this.datos.username && this.datos.password) {
            fetch("v1/user/signup", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log("el resultado" + JSON.stringify(result));
                if (result.access_token) {
                  sessionStorage.setItem('userData',JSON.stringify(result));
                  return true;
                  //this.setState({ redirect: true });
                } else {
                  console.log("errors", result.errors);
                  //return false;
                }
              })
              .catch(error => console.log("error", error));
          }
          return true;
          
        
    }
    //Función que devuelve la inicial del nombre del usuario registrado
  obtenerInicialUsuario() {
    var userdata = JSON.parse(sessionStorage.getItem("userData"));
    var nombre = userdata.username;
    return nombre.charAt(0);
  }
    //Función que devuelve del nombre del usuario registrado
    obtenerNombreUsuario() {
      var userdata = JSON.parse(sessionStorage.getItem("userData"));
      var nombre = userdata.username;
      return nombre;
    }
}

