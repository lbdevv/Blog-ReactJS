import React, { Component } from 'react';
import Slider from './Slider';
import SideBar from './SideBar';

class Formulario extends Component {


    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    biografiaRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user:{}
    }

    recibirFormulario = (e) =>{
        e.preventDefault();

        var genero = "hombre";

        if(this.generoHombreRef.current.checked){
            genero = this.generoHombreRef.current.value;
        }else if(this.generoMujerRef.current.checked){
            genero = this.generoMujerRef.current.value;
        }else{
            genero = this.generoOtroRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            biografia: this.biografiaRef.current.value,
            genero: genero
        }

        this.setState({
            user:user
        });
        
        console.log(user);
    }

    // creamos un objeto vacio para almacenar los datos del usuario


    render() {
        if(this.state.user){
            var user = this.state.user;
        }
        return (
            <div id="formulario">
                <Slider
                    title="Formulario"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">

                        <div className="subheader">Formulario</div>

                        {/* Mostrar datos del formulario */}

                        {user.nombre &&
                            <div id="user-data">
                                <p>nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellido: <strong>{user.apellidos}</strong></p>
                                <p>Biografia: <strong>{user.biografia}</strong></p>
                                <p>Genero: <strong>{user.genero}</strong></p>
                            </div>
                        }


                        {/* Listado de articulos que vendran del api rest de node*/}
                        <form className="mid-form" onSubmit={this.recibirFormulario} >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="biografia">Biografia</label>
                                <textarea name="biografia" id="" cols="30" rows="10" ref={this.biografiaRef} ></textarea>
                            </div>
                            <div className="form-group radio-buttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre
                          <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer
                          <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} /> Otro
                      </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </div>
                    <SideBar
                        blog="false"
                    />
                </div>
            </div>
        )
    }
}

export default Formulario;