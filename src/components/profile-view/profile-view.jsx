import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, Container, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      name: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
      validated: null
    }
  }
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://flixspotter.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
        this.setState({
            name: response.data.name,
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,
            birthday: response.data.birthday,
            FavoriteMovies: response.data.FavoriteMovies
        });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleRemove(e, movie) {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://flixspotter.herokuapp.com/users/${username}/movies/remove/${movie}`, {
        headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert(this.props.movie.Title + ' has been deleted your favorites list!')
            this.componentDidMount()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleUpdate(e) {
        this.setState({
            validated: null
        });
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            this.setState({
                validated: true,
            })
            return
        }
        e.preventDefault()

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.put(`https://flixspotter.herokuapp.com/users/${username}`, {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthday: this.state.birthday
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            const data = response.data;
            alert('Your changes have been saved!')
            this.setState({
                name: data.name,
                username: data.username,
                password: data.password,
                email: data.email,
                birthday: data.birthday,
            })
            localStorage.setItem('user', data.username)
            window.open(`/users/${username}`, '_self')
        })
        .catch(function (error) {
            console.log(error)
        });
      }

      setUsername(username) {
        this.setState({username})
      }

      setPassword(password) {
        this.setState({password})
      }

      setEmail(email) {
        this.setState({email})
      }

      setBirthday(birthday) {
        this.setState({birthday})
      }

    handleDelete(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://flixspotter.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            alert('You have deleted your account!')
            window.open('/', '_self');
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        const { FavoriteMovies, validated } = this.state;
        const username = localStorage.getItem('user');
        const { movies } = this.props;

        return (
          <Container className="profile-view mt-5">
            <Tabs defaultActiveKey="profile" transition={false} className="profile-tabs">

              <Tab className="tab-item" eventKey="profile" title="Profile">
                  <Card className="profile-card" border="info">
                    <Card.Title className="text-center text-light">{username}'s Favorite Movies</Card.Title>
                    {FavoriteMovies.length < 1 && <div className="card-content text-center text-light">You're slacking! You don't like Movies?</div>}
                    <div md={4} className="fav-movies">
                      {FavoriteMovies.length > 0 && movies.map((movie) => {
                          if (movie._id === FavoriteMovies.find((favorite) => favorite === movie._id)) {
                          return (

                            <Card className="fav-card">
                              <Link to={`/movies/${movie._id}`}>
                                <Card.Img className="movie-image" src={movie.ImagePath} />
                              </Link>
                              <div className="featured-movie">
                                {movie.Featured ? (
                                  <p className="card-title"><span className="featured">Featured!</span></p>
                                  ) : (
                                  <p className="card-title"></p>
                                )}
                              </div>
                              <div className="handle-remove">
                                <svg variant="danger" value={movie._id} onClick={e => this.handleRemove(e, movie._id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                              </div>
                            </Card>
                            )
                          }
                      })}
                  </div>
                  </Card>
                </Tab>
                <Tab className="tab-item" eventKey="update" title="Update">
                  <Card className="update-card text-light">
                    <Card.Title className="profile-title">Update {username}'s Profile</Card.Title>
                    <Card.Subtitle className="card-subtitle-update">Please fill in every field.</Card.Subtitle>
                    <Card.Body>
                      <Form noValidate validated={validated} className="update-form" onSubmit={e => this.handleUpdate(e, this.name, this.username, this.password, this.email, this.birthday)}>
                        <Form.Group controlId="formBasicUsername">
                          <Form.Label className="form-label">Username</Form.Label>
                          <Form.Control type="text" placeholder="Change Username" name="username" onChange={e => this.setUsername(e.target.value)} />
                          <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label className="form-label">
                            Password <span className="required">*</span>
                          </Form.Label>
                          <Form.Control type="password" placeholder="Current or New Password" onChange={e => this.setPassword(e.target.value)} />
                          <Form.Control.Feedback type="invalid">Please enter a valid password with at least 8 characters.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label className="form-label">Email</Form.Label>
                          <Form.Control type="email" placeholder="Change Email" onChange={e => this.setEmail(e.target.value)} />
                          <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicBirthday">
                          <Form.Label className="form-label">Username</Form.Label>
                          <Form.Control type="date" placeholder="Change Birthday" onChange={e => this.setBirthday(e.target.value)} />
                          <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                        </Form.Group>
                        <Button className="update-button mt-2" type="submit" variant="info">Update</Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab>

                <Tab className="tab-item" eventKey="delete" title="Delete Profile">
                  <Card className="update-card text-light">
                    <Card.Title className="profile-title">Delete Profile</Card.Title>
                    <Card.Subtitle className="text-muted">Sorry to see you leave. You will have to create a new account and start over is you wish to come back.</Card.Subtitle>
                    <Card.Body>
                      <Button className="button" variant="danger" onClick={(e) => this.handleDelete(e)}>Click Here If You're Sure!</Button>
                    </Card.Body>
                  </Card>
                </Tab>
            </Tabs>
          </Container>
        )
    }
}

ProfileView.propTypes = {
user: propTypes.shape({
    FavoriteMovies: propTypes.arrayOf(
    propTypes.shape({
        _id: propTypes.string.isRequired,
        Title: propTypes.string.isRequired
    })
    ),
    username: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    password: propTypes.string,
})
};

export default ProfileView;
