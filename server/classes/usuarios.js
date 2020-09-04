class Usuarios {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id, nombre,sala) {
    const persona = { id, nombre,sala};
    this.personas.push(persona);
    return this.personas;
  }

  getPersonaId(id) {
    const persona = this.personas.filter((persona) => {
      return (persona.id === id);
    })[0];

    return persona;
  }

  getPersonaName(nombre) {
    const persona = this.personas.filter((persona) => {
      return (persona.nombre === nombre);
    })[0];

    return persona;
  }

  getPersonas() {
    return this.personas;
  }

  getPersonasSala(sala) {
const personasEnSala = this.personas.filter(persona=>{
  return persona.sala === sala
})

return personasEnSala
  }

  borrarPersona(id) {
    const personaBorrada = this.getPersonaId(id);
    this.personas = this.personas.filter((persona) => {
      return persona.id != id;
    });

    return personaBorrada;
  }
}



module.exports = {
  Usuarios,
};
