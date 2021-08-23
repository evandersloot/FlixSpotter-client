import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import "./main-view.scss";


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: false
        };
    }

    componentDidMount() {
        axios.get('https://flixspotter.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onSignUp(register) {
        this.setState({
            register
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!register) return <RegistrationView onSignUp={register => this.onSignUp(register)} />
      
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view"/>;
      
        return (
          <div className="main-view">
            {selectedMovie
              ? (                
                <Row className="d-flex justify-content-md-center">
                    <Col md={12}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </Col>
                </Row>                         
              )
              : 
              (
                <Row className="d-flex justify-content-md-center">
                {movies.map(movie => (
                    <Col className="my-2 movie-card-col"  xs={12} md={8} lg={4} xl={3}>                      
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    </Col>
                ))}
                </Row>
              )
            }
          </div>
        );
    }
}