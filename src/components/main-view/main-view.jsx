import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';  
import { ProfileView } from '../profile-view/profile-view';

import "./main-view.scss";
import logo from '../img/logo.png';


class MainView extends React.Component {

    constructor() {
      super();
        this.state = {
          user: null,
        };
    }

    componentDidMount() {
      const accessToken = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getUser(user, accessToken);
        this.getMovies(accessToken);  
      }
    }

    getUser(username, token) {
      axios.get(`https://flixspotter.herokuapp.com/user/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUser(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    getMovies(token) {
      axios.get(`https://flixspotter.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    onLoggedIn(authData) {
      console.log(authData);
      this.props.setUser(authData.user);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.username);
      this.getMovies(authData.token);  
      console.log('Logged in');
      window.open('/', '_self');
    }
 
    onLoggedout() {
      this.props.setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Logged out')
      window.open('/', '_self');
    } 

    render() {
      const { user } = this.state;
      const { movies } = this.props;
      
      return (
        <Router> 
          <div>
            <header className="mb-4">
              <Navbar expand="lg" fixed="top" className="nav-bar">
                <Navbar.Brand className="navbar-brand" as={Link} to={`/`} target='_self'>
                  <Image className="w-100 h-25 m-auto" src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {user &&
                      <Nav.Link as={Link} to={`/users/${user}`} target='_self' className="text-light">My Account</Nav.Link>
                    }
                  </Nav>
                  <Form className="inline">
                    {user &&
                      <Link to={`/`}>
                        <Button variant="dark" className="logout-button" onClick={() => this.onLoggedout()}>Logout</Button>
                      </Link>
                    }
                  </Form>
                </Navbar.Collapse>
              </Navbar>
            </header>
          </div>
            
          <Container><br />
            <Row className="main-view">
              {/* Main View */}
              <Route exact path="/" render={() => {
                if (!user) return  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
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
                return <Col xs={10} md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              {/* Director View */}
              <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col xs={10} md={8} className="mt-5">
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              {/* Genre View */}
              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col xs={10} md={8} className="mt-5">
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }} />

              {/* Profile View */}
              <Route exact path="/users/:username" render={({ history }) => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                if (movies.length === 0) return;
                return <ProfileView history={history} movies={movies} />
              }} />
            </Row>       
          </Container>
        </Router>
      );
    }
}
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);