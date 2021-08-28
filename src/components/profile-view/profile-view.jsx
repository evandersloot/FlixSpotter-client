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
      favorites: [],
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
        .then((response) => {
        this.setState({
            Name: response.data.name,
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday,
            Favorites: response.data.Favorites
        });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleRemove(e, movie) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://flixspotter.herokuapp.com/users/${username}/movies/${movie}`,{
        headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert(this.props.movie.Title + 'has been removed from your favorites!')
        })
        .catch(function (error) {
            console.log(error);
        });
    } 

    handleUpdate(e, newUsername, newPassword, newEmail) {
        this.setState({
            validated: null,
        });
        const form = e.target;
        if (form.checkValidity() === false) {
            e.preventDefault();
            this.setState({
                validated: true,
            });
            return;
        }
        e.preventDefautlt();
    
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.put(`https://flixspotter.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },    
            data: {
                Username: newUsername ? newUsername : this.state.Username,
                Password: newPassword ? newPassword : this.state.Password,
                Email: newEmail ? newEmail : this.state.Email
            },
                 
        })
        .then((response) => {
            alert('Your changes have been saved!');
            this.setState({
                Name: response.data.Name,
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthdate: response.data.Birthdate,
            });
            localStorage.setItem('user', this.state.Username);
            window.open(`/users/${username}`, '_self');
        })
        .catch(e => {
            console.log(error);
        });
      }
    
      setUsername(input) {
          this.Username = input;
      }
      setPassword(input) {
          this.Password = input;
      }
      setEmail(input) {
          this.Email = input;
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
        const { movies } = this.props;
        const { favorites, validated } = this.state;
        const username = localStorage.getItem('user');

        return (
            <Container className='profile-view'>
            <Tabs defaultActiveKey='profile' transition={false} className='profile-tabs'>
    
              <Tab className='tab-item' eventKey='profile' title='Profile'>
                <Card className='profile-card' border='info'>
                  <Card.Title className='profile-title'>{username}'s Favorite Movies</Card.Title>
                  {favorites.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}
                  <div className='favorites-container'>
                    {favorites.length > 0 &&
                      movies.map((movie) => {
                        if (movie._id === favorites.find((favMovie) => favMovie === movie._id)) {
                         return (
                          <div key={movie._id}>
                            <Card className="h-100 mt-2 pt-1">
                              <Link to={`/movies/${movie._id}`}>
                                <Card.Img variant='top' src={movie.ImagePath} />
                              </Link>
                              <Card.Body>
                              <Card.Title>{movie.Title}</Card.Title>
                              <Card.Text>{movie.Description}</Card.Text>
                              </Card.Body>
                              <Card.Footer>   
                              <Link to={`/movies/${movie._id}`}>
                                <div className="open-button">
                                <Button variant="primary">Open</Button>
                                </div>
                              </Link>
                              </Card.Footer>
                            </Card>                                     
                          </div>
                          )
                        }}  
                      )
                    } 
                </div>
                </Card>
              </Tab>
              <Tab className='tab-item' eventKey='update' title='Update'>
                <Card className='update-card' border='info'>
                <Card.Title className='profile-title'>Update Profile</Card.Title>
                <Card.Subtitle className='card-subtitle-update'>Update each field you wish to make changes to.</Card.Subtitle>
                <Card.Body>
                    <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email)}>
                    <Form.Group controlId='formBasicUsername'>
                        <Form.Label className='form-label'>Username</Form.Label>
                        <Form.Control type='text' placeholder='Change Username' onChange={(e) => this.setUsername(e.target.value)} />
                        <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label className='form-label'>
                        Password <span className='required'>*</span>
                        </Form.Label>
                        <Form.Control type='password' placeholder='Current or New Password' onChange={(e) => this.setPassword(e.target.value)} />
                        <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 characters.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label className='form-label'>Email</Form.Label>
                        <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
                        <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                    </Form.Group>
                    <Button className='update-profile-button' type='submit' variant='info'>
                        Update
                    </Button>
                    </Form>
                </Card.Body>
                </Card>
              </Tab>

              <Tab className='tab-item' eventKey='delete' title='Delete Profile'>
                <Card className='update-card'>
                <Card.Title className='profile-title'>Delete Profile</Card.Title>
                <Card.Subtitle className='text-muted'>Sorry to see you leave. You will have to create a new account and start over is you wish to come back.</Card.Subtitle>
                <Card.Body>
                    <Button className='button' variant='danger' onClick={(e) => this.handleDelete(e)}>
                    Click Here If You're Sure!
                            </Button>
                </Card.Body>
                </Card>
              </Tab>
            
            </Tabs>
            </Container>
        )}
    }
      
ProfileView.propTypes = {
user: propTypes.shape({
    favorites: propTypes.arrayOf(
    propTypes.shape({
        _id: propTypes.string.isRequired,
        Title: propTypes.string.isRequired,
    })
    ),
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.string,
})
};