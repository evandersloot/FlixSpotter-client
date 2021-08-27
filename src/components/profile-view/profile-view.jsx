import React from 'react';
import PropTypes, { string } from 'prop-types';
import axios from 'axios';

import {Row, Col, Button, Container, Card } from 'react-bootstrap';
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
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }


    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get('https://flixspotter.herokuapp.com/users/${username)', {
            headers: { Authorization: 'Bearer ${token}' },
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
        .cath(function (error) {
            console.log(error);
        });
    }

    removeFavorite(movie) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete('https://flixspotter.herokuapp.com/users/${username}/movies/remove/${this.props.movie._id}', {}, {
        headers: { Authorization: 'Bearer ${token}' }
        })
        .then(response => {
            alert(this.props.movie.Title + 'has been removed from your favorites!')
        })
        .catch(e => {
            console.log('an error has occurred');
        });
    } 

    updateUser(e, newUsername, newPassword, newEmail) {
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
        axios.put('https://flixspotter.herokuapp.com/users/${username}', {
            headers: { Authorization: 'Bearer ${token}' },
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
            console.log('an error has occurred');
        });
    }

    deleteUser(e) {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete('https://flixspotter.herokuapp.com/users/${username}', {
            headers: { Authorization: 'Bearer ${token}' },
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

    


}