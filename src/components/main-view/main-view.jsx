import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { Row, Col, Navbar, Nav, Form, Button } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';  
import { ProfileView } from '../profile-view/profile-view';

import "./main-view.scss";


export class MainView extends React.Component {

    constructor() {
      super();
        this.state = {
          movies: [],
          user: null,
        };
    }

    componentDidMount() {
      const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.username
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.username);
      this.getMovies(authData.token);
    }

    getUser(token) {
      axios.get(`https://flixspotter.herokuapp.com/users`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    getMovies(token) {
      axios.get(`https://flixspotter.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
 
    onLoggedout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
      user: null
      });
    } 

    render() {
      const { user, movies } = this.state;
      
      return (
        <Router> 
          <div className="main-view">
            <header>
              <Navbar expand="lg" fixed="top" className='nav-bar'>
                <Navbar.Brand className='app-name navbar-brand' as={Link} to={`/`} target='_self'>FlixSpotter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {user &&
                      <Nav.Link as={Link} to={`/users/${user}`} target='_self' className='navbar-item'>My Account</Nav.Link>
                    }
                  </Nav>
                  <Form className="inline">
                    {user &&
                      <Link to={`/`}>
                        <Button variant="dark" className='logout-button' onClick={() => this.onLogout()}>Logout</Button>
                      </Link>
                    }
                  </Form>
                </Navbar.Collapse>
              </Navbar>
            </header> 

            <Row className="main-view justify-content-md-center">
              {/* Main View */}
              <Route exact path="/" render={() => {
                if (!user) return  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }} />

              {/* Register View */}
              <Route path="/register" render={() => {  
                if (user) return <Redirect to="/" />
                return <Row>
                  <Col>
                    <RegistrationView user={user} />
                  </Col>
                </Row>
              }} />

              {/* Movies View */}
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              {/* Director View */}
              <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              {/* Genre View */}
              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              {/* Profile View */}
              <Route path="/users/:username" render={({ history }) => {
                if (!user) return <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
                if (movies.length === 0) return <div className="mainView" />;
                return <ProfileView history={history} movies={movies} />
              }} />
            </Row>
          </div>
        </Router>
      );
    }
}

export default MainView;