import React, { Component } from 'react';
import Slider from './Slider';
import SideBar from './SideBar';
import Articles from './Articles';


class Blog extends Component {

    render() {
            
        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
              
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos que vendran del api rest de node*/}
                       <Articles/>

                    </div>
                    <SideBar
                    blog="true"
                    />
                </div>
            </div>
        )
    }
}

export default Blog;