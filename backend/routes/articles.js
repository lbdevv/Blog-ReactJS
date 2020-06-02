'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');   //Carga modulo  multiparty
//Cargamos un middleware ¿Qué es un middleware? R: es un metodo que se ejecuta antes que el controlador llamado.
var md_upload =  multipart({ uploadDir: './upload/articles' });

//Rutas de prueba

router.get('/test-de-controlador', ArticleController.test);


//Rutas API RESTful
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles); //Se le pueden pasar parametros opcionales utilizando ": en un inicio" y   el nombre del parametro luego "?" para indicar que es opcional
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id', md_upload, ArticleController.upload); //Le pasamos el middleware a la ruta (md_upload)
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search_file);




module.exports = router;
