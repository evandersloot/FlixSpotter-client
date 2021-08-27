import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.post('https://flixspotter.herokuapp.com/users/${user}/movies/${this.props.movie._id}', {}, {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        alert(this.props.movie.Title + 'has been added to your favorites list!')
      })
      .catch(e => {
        console.log('an error has occurred');
      });
  }

  removeFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete('https://flixspotter.herokuapp.com/users/${user}/movies/remove/${this.props.movie._id}', {}, {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        alert(this.props.movie.Title + 'has been removed from your favorites!')
      })
      .catch(e => {
        console.log('an error has occurred');
      });
  } 

  render() {
    const { movie, onBackClick } = this.props;

    if (!movie) return null;

    return (
      <Container className="movieView text-light mt-2">
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} />
          </div>
          <div className="movie-title">
            <span className="value">{movie.Title}</span>
          </div><br />
          <div className="movie-description">
            <span className="value">{movie.Description}</span>
          </div><br />

          <div className="movie-director">
            <span className="label">Directed by:  
              <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
            </span>             
          </div><br />
          
          <div className="movie-genre">
            <span className="label">Genre: 
              <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            </span>
          </div><br />
          
          <div className="back-button">
            <Button variant="primary" onClick={() => {onBackClick(null);}}>Back to Movies</Button> 
          <span> </span>
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="success" onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
          </Link>  
          </div>
          <div><br />
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="danger" size="sm" onClick={() => this.removeFavorite(movie)}>Remove from Favorites</Button> 
          </Link> 
          </div>          
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired
    }).isRequired,
    Director: propTypes.shape({
      Name: propTypes.string.isRequired
    })
  })
}
