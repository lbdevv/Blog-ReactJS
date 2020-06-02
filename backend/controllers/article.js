'use strict'

var validator = require('validator');
var Article = require('../models/article');
var Fs = require('fs');
var Path = require('path');

var controller = {


    test: (req, res) =>{
        return res.status(200).send({
             message: 'Soy la accion test de mi controlador de articulos'
        });
    },
    save: (req,res) => {
        //Recoger los parametros por post
           var params = req.body;
           console.log(params);
        //validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_title && validate_content){


            //Crear el objeto a guardar
            var article = new Article();
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            //Asignar valores

            article.save( (err,articleStored) => {

                if(err || !articleStored){

                    return res.status(404).send({
                        status:'error',
                        message: 'El articulo no se ha guardado'
                     });

                }else{
                    //Guardar el Articulo
                    return res.status(200).send({
                        status:'success',
                        article: articleStored
                    });
        
                }

            } );

            //Guardar el Articulo

            //Devolver respuesta
 

        }else{
            return res.status(200).send({
                status:'error',
                message: 'Los datos no son validos'
             });
        }

    },
    getArticles: (req,res) => {

        var query = Article.find({});

        var last = req.params.last;

        if(last || last != undefined){
           query.limit(5);
        }

        //Find
        query.sort('-_id').exec((err, articles) => { //en el metodo sort('-id') el signo "-" indica que la forma de ordenar los elementos es descendente

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al obtener los articulos'
                });
            }
            if(!articles){
                return res.status(404).send({
                    status:'error',
                    message: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            })


        });

      
    },
    getArticle: (req,res) => {

        //Recoger el id de la Url
        var articleID = req.params.id;

        //Comprobar que existe
        if(!articleID || articleID == null){

            return res.status(404).send({
                status:'error',
                message: 'No existe el articulo'
            });

        }

        //Buscar el articulo 
        Article.findById(articleID, (err,article) => {

            if(err || !article){
                return res.status(404).send({
                    status:'error',
                    message: 'No existe el articulo'
                });
            }

            return res.status(200).send({
                status:'success',
                article
            });
        });
    },

    update: (req,res) =>{
         
        //recoger el id del articulo que viene por la url
        var  articleID = req.params.id;
        //recoger los datos que llegan por put
        var params = req.body;

        //validar los datos

        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){

            return res.status(404).send({
                status:'error',
                message: 'Faltan datos por enviar'
            });

        }

        if(validate_title && validate_content){
            // Find and update
            Article.findOneAndUpdate({_id: articleID}, params, {new:true}, (err, articleUpdated) => {

                if(err){
                    return res.status(500).send({
                        status:'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!articleUpdated){
                    return res.status(404).send({
                        status:'error',
                        message: 'No existe el articulo'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    article: articleUpdated
                });

            });
        }else{
            return res.status(200).send({
                status:'error',
                message: 'La validación no es correcta'
            });
        }
    },

    delete: (req,res) => {
        //recoger el id de la url
        var articleID = req.params.id;
        // find and delete
        Article.findOneAndDelete({_id: articleID}, (err, articleRemoved) => {

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al borrar'
                });
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status:'error',
                    message: 'El articulo no existe'
                });
            }

            return res.status(200).send({
                status:'success',
                article: articleRemoved
            });

        });
    },

    upload: (req,res) => {
        //Configurar el modulo connect multiparty router/article.js (Hecho)

        //Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

    
        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //Conseguir el nombre y la extensión del archivo
        var File_Path = req.files.file0.path;
        var File_Split = File_Path.split('\\'); //Esto funciona en windows.

        // *ADVERTENCIA* EN LINUX O MAC 
        //var File_Split = file_path.split('/');

        //Nombredel archivo

        var File_Name = File_Split[2];

        //Exntensión del fichero
        var Extension_Split = File_Name.split('\.');
        var File_Ext = Extension_Split[1];

        //Comprobar la extensión (Solo imagenes)

        if(File_Ext != 'png' && File_Ext != 'jpg' && File_Ext != 'jpeg' && File_Ext != 'gif'){
               //Borrar el archivo
            Fs.unlink(File_Path, (err)=>{
                return res.status(200).send({
                   status: 'error',
                   message: 'La extensión de la imagen no es valida'
                });
           }); // Unlink de la libreria file System "fs" permite eliminar un archivo através de su dirección o path

        }else{
            
            //Sacando la id de la url
            var articleID = req.params.id;
            Article.findOneAndUpdate({_id: articleID}, {image: File_Name},{new: true}, (err, ArticleUpdated) =>{
                
                if(err || !ArticleUpdated){
                    return res.status(404).send({
                        status:'error',
                        message: 'Error al guardar la imagen de articulo'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    article: ArticleUpdated
                 });
            });

           
        }
        //End Upload File
    },

    getImage: (req,res) =>{

        var File = req.params.image;
        var Path_File = './upload/articles/' + File;

        Fs.exists(Path_File, (exists) => {

            if(exists)
            {
                return res.sendFile(Path.resolve(Path_File));
            }
            else
            {
                return res.status(404).send({
                    status:'Error',
                    message:'No existe el fichero'
                 });
            }
        });
    },

    search_file: (req,res) =>{
        //Sacar el string a buscar
        var SearchString = req.params.search;

        //find or
        Article.find({ "$or":[
            {"title": {"$regex": SearchString, "$options": "i"}},
            {"content": {"$regex": SearchString, "$options": "i"}},
        ]})
        .sort([['date','descending']])
        .exec((err,articles) => {

            
            if(err){
                console.log(err);
                return res.status(500).send({
                    status:'Error',
                    message:'Error en la peticion'
                 });
            }

            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status:'Error',
                    message:'No hay articulos para mostrar'
                 });
            }

            return res.status(200).send({
                status:'Success',
                articles
             });
        });
    }


}; //End controller

module.exports = controller;