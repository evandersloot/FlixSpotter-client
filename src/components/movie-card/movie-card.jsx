import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
                
    return (
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