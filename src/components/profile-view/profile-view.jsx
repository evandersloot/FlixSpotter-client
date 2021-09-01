import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, Container, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    (this.username = null), (this.password = null), (this.email = null);
    this.state = {
      username: null,
      password: null,
      email: null,
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
        .then((response) => {
        this.setState({
            username: response.data.Username,
            password: response.data.Password,
            email: response.data.Email,
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
            alert(`${movie.Title} has been deleted from your favorites!`);
            this.componentDidMount()
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
                username: newUsername ? newUsername : this.state.username,
                password: newPassword ? newPassword : this.state.password,
                email: newEmail ? newEmail : this.state.email
            },
                 
        })
        .then((response) => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
            });
            alert('Your changes have been saved!');
            localStorage.setItem('user', this.state.username);
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    
      setUsername(input) {
          this.username = input;
      }
      setPassword(input) {
          this.password = input;
      }
      setEmail(input) {
          this.email = input;
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
        const { FavoriteMovies, validated, username, email } = this.state;
        const { movies } = this.props;

        return (
            <Container className="profile-view">
            <Tabs defaultActiveKey="profile" transition={false} className="profile-tabs">
    
              <Tab className="tab-item" eventKey="profile" title="Profile">
                <Card className="profile-card" border="info">
                  <Card.Title className="text-center">{username}'s Favorite Movies</Card.Title>
                  {FavoriteMovies.length < 1 && <div className="card-content">You're slacking! You don't like Movies?</div>}
                  <div className="card-container">
                    {FavoriteMovies.length > 0 && movies.map((movie) => {
                        if (movie._id === FavoriteMovies.find((favorite) => favorite === movie._id)) {
                         return (
                         
                            <Card className="card-style" key={movie._id} >
                              <Link to={`/movies/${movie._id}`}>
                                <Card.Img variant='top' src={movie.ImagePath} />
                              </Link>
                              <Card.Body>
                              <Card.Title className="text-center">{movie.Title}</Card.Title>
                              </Card.Body>
                              <Card.Footer>   
                              <Link to={`/movies/${movie._id}`}>
                                <div className="remove-button">
                                <Button variant="danger" size="sm" onClick={e => this.handleRemove(e, movie._id)}>Remove</Button>
                                </div>
                              </Link>
                              </Card.Footer>
                            </Card>                                     
                          
                          )
                        }}  
                      )
                    } 
                </div>
                </Card>
              </Tab>
              <Tab className="tab-item" eventKey="update" title="Update">
                <Card className="update-card" border="info">
                <Card.Title className="profile-title">Update Profile</Card.Title>
                <Card.Subtitle className="card-subtitle-update">Please fill in every field.</Card.Subtitle>
                <Card.Body>
                    <Form noValidate validated={validated} className="update-form" onSubmit={e => this.handleUpdate(e, this.username, this.password, this.email)}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label className="form-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="Change Username" defaultValue={username} onChange={e => this.setUsername(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="form-label">
                        Password <span className="required">*</span>
                        </Form.Label>
                        <Form.Control type="password" placeholder="Current or New Password" defaultValue="" onChange={e => this.setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid password with at least 8 characters.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="email" placeholder="Change Email" defaultValue={email} onChange={e => this.setEmail(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                    </Form.Group>
                    <Button className="update-profile-button" type="submit" variant="info">
                        Update
                    </Button>
                    </Form>
                </Card.Body>
                </Card>
              </Tab>

              <Tab className="tab-item" eventKey="delete" title="Delete Profile">
                <Card className="update-card">
                <Card.Title className="profile-title">Delete Profile</Card.Title>
                <Card.Subtitle className="text-muted">Sorry to see you leave. You will have to create a new account and start over is you wish to come back.</Card.Subtitle>
                <Card.Body>
                    <Button className="button" variant="danger" onClick={(e) => this.handleDelete(e)}>
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
    FavoriteMovies: propTypes.arrayOf(
    propTypes.shape({
        _id: propTypes.string.isRequired,
    })
    ),
    username: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    password: propTypes.string,
})
};

export default ProfileView;