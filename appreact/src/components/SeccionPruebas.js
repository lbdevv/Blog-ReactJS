import React, { Component } from 'react';
import MiComponente from './MiComponente'; //No hace falta ponerle el ".js"


class SeccionPruebas extends Component {

    contador = 0;

    /*
    constructor(props){
      super(props);

      this.state = {
        contador: 0
      }
    }*/
    state = {
      contador: 0
    };
    
    HolaMundo(Nombre, Edad) {

        var Presentacion = (
          <div>
            <h2>Hola, soy {Nombre}</h2>
            <h3>Tengo {Edad} Años</h3>
          </div>
        );  
      
        return Presentacion;
      }

      sumar = (e) =>{
        this.setState({
          contador: (this.state.contador + 1)
        });
      }

      restar = (e) =>{
        this.setState({
          contador: (this.state.contador - 1)
        });
      }
    


    render() {
        var Nombre = "Luis";
        var Edad = 25;
        return (
            <section id="content">

                <h2 className="subheader">Últimos artículos</h2>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                {this.HolaMundo(Nombre, Edad)}

                <section className="componentes">
                    {/* Al final cada componente se traduce en una mini etiqueta Html que puedo cargarla y repetirla tantas veces como quiera */}
                    <MiComponente />
                </section>
                {/* en JSX no se puede usar directamente el atributo "class" para añadir
       una clase css a un elemento html porque se puede confundir el sistema react
        con la palabras reservada "class" para crear una clase, entonces es necesario
         ponerle className para añadir css a una etiqueta */}

            <h2 className="subheader">Estado</h2>
            <p>
              {this.state.contador}
            </p>
            <p>
                <input type="button" value="Sumar" onClick={this.sumar}/>
                <input type="button" value="Restar" onClick={this.restar}/>
            </p>


            </section>
        );
    }
}

export default SeccionPruebas;