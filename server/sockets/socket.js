const { io } = require("../server");
const { Usuarios } = require("../classes/usuarios");
const { crearMensaje } = require("../helps/helps");
const usuarios = require("../classes/usuarios");
const usuario = new Usuarios();

io.on("connection", (client) => {
  client.on("entrarChat", (data, callback) => {

    if (!data.nombre || !data.sala) {
      return callback({
        error: true,
        mensaje: "El nombre y la sala son necesarios",
      });
    }

    const existe = usuario.getPersonaName(data.nombre);

    if (!existe) {

      client.join(data.sala)
      const personas = usuario.agregarPersona(client.id, data.nombre,data.sala);
  

      client.broadcast.to(data.sala).emit("listaPersona", usuario.getPersonasSala(data.sala));

      callback(usuario.getPersonasSala(data.sala));
    }
    {
      callback("El usuario ya existe");
    }
  });

  client.on("crearMensaje", (data) => {
    const persona = usuario.getPersonaId(client.id);

    const mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
  });

  client.on("disconnect", () => {
    const personaBorrada = usuario.borrarPersona(client.id) || {nombre:'Error'}  

    client.broadcast.to(personaBorrada.sala).emit(
      "crearMensaje",
      crearMensaje("Administrador", `${personaBorrada.nombre} abandono la sala`)
    );

    client.broadcast.to(personaBorrada.sala).emit("listaPersona", usuario.getPersonasSala(personaBorrada.sala));
  });

  client.on("mensajePrivado", (data) => {
    const persona = usuario.getPersonaId(client.id);
    client.broadcast
      .to(data.para)
      .emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
  });
});
