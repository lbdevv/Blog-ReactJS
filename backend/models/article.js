'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },//Si le pones llaves a un atributo se le pueden definir más de una sola cosa
    image: String
});

module.exports = mongoose.model('Article', ArticleSchema);
// articles --> guarda documentos de este tipo y con esta estructura dentro de la colección
