const express = require('express'); //importamos express
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el servidor
const app = express(); //utilizamos la funcion de express

//conectar a la bse de datos
conectarDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json para leer los datos que el usuario coloco

app.use(express.json({ extended: true}));


//crear un puerto de la app

const port = process.env.PORT || 4000; //SI NO TIENEN PUERTO DISPONIBLE HERAKOO SE LE ASIGNA EL 4000


//Importar rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth')); //se importa en el archivo porncipal 
app.use('/api/proyectos', require('./routes/proyectos')); //se importa en el de proyectos
app.use('/api/tareas', require('./routes/tareas')); //se importa en el de tareas




//Definir la app principal
//app.get('/', (req, res) => {
   // res.send('Hola mundo')
//});

//Iniciar la app

app.listen(port, '0.0.0.0', () =>{
    console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});