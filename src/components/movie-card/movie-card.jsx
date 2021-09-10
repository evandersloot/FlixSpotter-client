import React from 'react';
import propTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
                
    return (
      <Card className="movie-card" style={{ width: '16rem' }}>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="card-image" variant="top" src={movie.ImagePath} />
        </Link>
        <div className="featured-movie">
        {movie.Featured ? (
              <p className="card-title"><span className="featured">Featured!</span></p>
            ) : (
              <p className="card-title"></p>
            )}
        </div>
      </Card>                 
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
  })
}

export default MovieCard;