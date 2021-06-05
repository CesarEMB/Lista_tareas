const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');

const app = express();

const CustomerRoutes = require('./routes/index');
const { urlencoded } = require('express');

//settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//middlewares
app.use(morgan('dev'))
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'lista_tareas'
}, 'single'));

app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', CustomerRoutes);


//Stactis files
app.use(express.static(path.join(__dirname, 'public')));

//Empezando el servidor
app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});




module.exports = app;