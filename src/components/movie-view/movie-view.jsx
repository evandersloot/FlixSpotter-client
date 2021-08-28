import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  handleAdd() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.post(`https://flixspotter.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then( () => {
        alert(this.props.movie.Title + ' has been added to your favorites list!')
      })
      .catch(e => {
        console.log('an error has occurred');
      });
  }

  handleRemove() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.post(`https://flixspotter.herokuapp.com/users/${username}/movies/remove/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then( () => {
        alert(this.props.movie.Title + ' has been removed from your favorites!')
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
              <br /><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
            </span>             
          </div><br />
          
          <div className="movie-genre">
            <span className="label">Genre: 
              <br /><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            </span>
          </div><br />
          
          <div className="back-button">
            <Button variant="primary" onClick={() => {onBackClick(null);}}>Back to Movies</Button> 
          <span> </span>
          
            <Button variant="success" onClick={() => this.handleAdd(movie._id)}>Add to Favorites</Button>
          
          </div>
          <div><br />
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="danger" size="sm" onClick={() => this.handleRemove(movie)}>Remove from Favorites</Button> 
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
    }).isRequired
  })
}
