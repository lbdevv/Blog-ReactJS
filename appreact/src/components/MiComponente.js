import React, {Component} from 'react';


class MiComponente extends Component{
    //Metodo render se encarga de mostrar lo que se carga en pantalla 
    render(){

        let Receta ={
            nombre:'Pizza',
            ingredientes:['Tomate','Queso','Jamon cocido'],
            calorias: 400
        } ;
        return(
            <div className="mi-componente">
                <h1>{'Receta: ' + Receta.nombre}</h1>
                <h2>{'Calorias: ' + Receta.calorias}</h2>
                
                {this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                }
                
                <ol>
                {
                    Receta.ingredientes.map((ingrediente,i) => {
                        return(
                            <li key={i}>
                                {ingrediente}
                            </li>
                        )
                    })
                }
                </ol>
                <hr/>
            </div>
        );
    }
}

export default MiComponente;