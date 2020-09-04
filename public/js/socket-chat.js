const socket = io();
const params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")  ) {
  window.location = "index.html";
  alert("El parametro nombre y sala son necesario");
}

const usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala")
};

if (!usuario.nombre) {
  window.location = "index.html";
  alert("El nombre no puede ser vacio");
}


socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("entrarChat", usuario, function (res) {
    if (res == "El usuario ya existe") {
        
            window.location = "index.html";
       
      return alert(res);
    }
    console.log("Usuarios Conectados", res);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// // Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('listaPersona', function(personas) {

    console.log('Conectados a la sala:',personas);

});


socket.on('mensajePrivado',function(mensaje){
console.log('Mensaje Privado:',mensaje)

})