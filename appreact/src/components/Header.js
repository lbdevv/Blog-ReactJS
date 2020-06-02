import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';


class Header extends Component {
    render() {

        return (
            <header id="header">
                <div className="center">

                    <div id="logo">
                        <img src={logo} alt="Logotipo" className="app-logo" />
                            <span id="brand">
                                <strong>Blog</strong> React
                        </span>
                    </div>

                        <nav id="menu">
                            <ul>
                                <li><NavLink to="/home" activeClassName="active"> Inicio </NavLink> </li>
                                <li><NavLink to="/blog" activeClassName="active">Blog</NavLink> </li>
                                <li><NavLink to="/formulario" activeClassName="active">Formulario</NavLink></li>
                                <li><NavLink to="/peliculas" activeClassName="active">Peliculas</NavLink></li>
                                <li><NavLink to="/pruebas/Luis" activeClassName="active">Página 2</NavLink></li>
                            </ul>
                        </nav>
                        <div className="clearfix"></div>
                    </div>
     
            </header>
        );
    }
}

export default Header;