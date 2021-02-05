//importamos mongoose
const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //esta parte es la parte del id cuando se agrgea un nuevo usuario a BD
        ref: 'Usuario' //hace referencia a donde queremos buscar el ID
        

    }, 
    creado: {
        type: Date,
        default: Date.now()
    }
   
});

module.exports = mongoose.model('proyectos', ProyectoSchema);