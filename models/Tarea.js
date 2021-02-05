//importamos mongoose
const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true 
    },
    fechainicio: {
        type: String,
        required: true,
        trim: true
    },
    fechafin: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean, //esta parte es la parte del id cuando se agrgea un nuevo usuario a BD
        default: false //hace referencia a donde queremos buscar el ID
        

    }, 
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId, //esta parte es la parte del id cuando se agrgea un nuevo usuario a BD
        ref: 'Proyecto' //hace referencia a donde queremos buscar el ID
        

    }
   
});

module.exports = mongoose.model('Tarea', TareaSchema);