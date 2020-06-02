import React, { Component } from 'react';
import Slider from './Slider';
import SideBar from './SideBar';
import Articles from './Articles';


class Search extends Component {


    render() {
        
        var Searched = this.props.match.params.search;

        return (
            <div id="blog">
                <Slider
                    title={'Busqueda:' + Searched}
                    size="slider-small"
              
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos que vendran del api rest de node*/}
                       <Articles
                            search = {Searched}
                       />

                    </div>
                    <SideBar
                    blog="true"
                    />
                </div>
            </div>
        )
    }
}

export default Search;