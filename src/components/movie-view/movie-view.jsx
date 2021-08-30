import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      FavoriteMovies: [],
      favorite: null
    };
  }

  addFavorite = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.post(`https://flixspotter.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(this.props.movie.Title + ' has been added to your favorites list!')
        this.setState({
          favorite: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  

  render() {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies, favorite} = this.state;

    if (!movie) return null;

    return (
      <Container className="movieView text-light mt-2">
        <Row className="movie-view d-flex justify-content-center">
          <Col className="movie-poster h-100 w-100">
            <img src={movie.ImagePath} />
          </Col>
          <Col>
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
          <br /><br />
          
            {!favorite && <Button variant="success" onClick = {this.addFavorite}>Add to Favorites</Button>}
          
          </div>
          </Col>         
        </Row>
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
  }),
  user: propTypes.shape({
    FavoriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string
      })
    ),
    username: propTypes.string
  })
}

export default MovieView;