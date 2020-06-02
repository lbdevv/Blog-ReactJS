import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Global from '../Global';
import SideBar from './SideBar';
import Moment from 'react-moment';
import 'moment/locale/es';
import DefaultImage from '../assets/images/default-image.jpg';


class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            })
            .catch(res => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    deleteArticle = (id) => {

        swal({
            title: "Estás seguro?",
            text: "Borrarás permanentemente el articulo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });
                            if (this.state.status === 'deleted') {
                                swal(
                                    'Eliminado',
                                    'El articulo ha sido eliminado con éxito.',
                                    'success'
                                )
                            }
                        });
                } else {
                    swal("Tranquilo, no se ha borrado nada");
                }
            });




    }


    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to={'/blog'} />
        }

        var article = this.state.article;
        return (

            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">

                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src={DefaultImage} alt="Paisaje" />
                                    )
                                }

                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <button onClick={() => { this.deleteArticle(article._id) }} className="btn btn-danger">Eliminar</button>


                            <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>
                            <div className="clearfix"></div>
                        </article>
                    }
                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe.</h2>
                            <p>Intentalo de nuevo más tarde.</p>
                        </div>

                    }

                    {this.state.status == null &&
                        <div className="article">
                            <p><strong>Cargando...</strong></p>
                        </div>

                    }
                </section>

                <SideBar />
            </div>
        )
    }
}

export default Article;