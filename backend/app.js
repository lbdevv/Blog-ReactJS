'use strict'

// Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');    
var cors = require('cors');


// Ejecutar express(http)
var app = express();

app.use(cors());

var allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

// Cargar ficheros rutas
var article_routes = require('./routes/articles');

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS -> Permite peticiones de front end

// Añadir prefijos a rutas / Cargar Rutas
app.use('/api',article_routes);


// Exportar modulo (fichero actual)

module.exports = app;