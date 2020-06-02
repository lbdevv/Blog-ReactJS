import React, { Component } from "react";
import Pelicula from './Pelicula';
import Slider from './Slider';
import SideBar from './SideBar';


class Peliculas extends Component {

    state = {

    }

    // favorita: {} -> al abrir y cerrar llaves le decimos que es un objeto vacío y así poder evitar los posibles errores de "null"
    cambiarTitulo = () => {
        var { peliculas } = this.state;
        peliculas[0].titulo = "Batman Begins";
        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("Favorita Marcada");
        console.log(pelicula, indice);

        this.setState({
            favorita: pelicula
        });
    }

    //Antes de cargarse el componente ocurre esto
    componentWillMount() {
        //alert("Se va a montar el componente");
        this.setState({
            peliculas: [
                { titulo: 'Batman vs Superman', image: 'https://i.ytimg.com/vi/X7SiuQxhAjg/sddefault.jpg' },
                { titulo: 'Gran Torino', image: 'https://razonesparacreer.com/wp-content/uploads/2017/10/grantorino-708x350@2x.jpg' },
                { titulo: 'Looper', image: 'https://www.microsiervos.com/images/looper-movie.jpg' }
            ],
            nombre: 'Luis Bustamante',
            favorita: {}
        })
    }

    // componentDidMount(){
    //     alert("Ya se ha montado el componente");
    // }

    // componentWillUnmount(){
    //     alert("Me voy a desmontar");
    // }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        var favorita;

        if (this.state.favorita.titulo) {
            favorita = (<p className="favorita" style={pStyle}>
                <strong>La pelicula favorita es:</strong>
                <span>{this.state.favorita.titulo}</span>
            </p>);
        } else {
            favorita = (<p>Este es el resultado del Else</p>);
        }

        return (
            <React.Fragment>
                <Slider
                    title="Peliculas"
                    size="slider-small"

                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Selección de las peliculas favoritas de {this.state.nombre}</p>
                        <p><button onClick={this.cambiarTitulo}>Cambiar titulo</button></p>
                        {/* Formas de recorrer listas en react con state */}
                        {/* Nota en JSX no se pueden poner ";" */}
                        {/* Nota si no se le coloca el atributo alt a la imagen en react, react falla */}


                        {/* "&&" para indicar la condición  "?" como si fuera condición ternaria */}
                        {/* {
                    this.state.favorita.titulo ? (
                    <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es:</strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p>
                    ) : (<p>Este es el resultado del Else</p>)
                } */}
                        {favorita}
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>
                    <SideBar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Peliculas;