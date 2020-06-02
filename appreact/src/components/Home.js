import React, { Component} from 'react';
import Slider from './Slider';
import SideBar from './SideBar';
import Articles from './Articles';

class Home extends Component {

    render() {
        var buttonString = "Ir al Blog";
        return (
            <div id="home">
                <Slider
                    title="Bienvenido al blog hecho en ReactJS"
                    btn={buttonString}
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos articulos</h1>
                        <Articles
                            home = 'true'
                        />
                    </div>
                    <SideBar />
                </div>
            </div>
        )
    }
}

export default Home;