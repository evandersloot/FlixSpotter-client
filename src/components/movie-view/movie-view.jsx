import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        
        return (
            <Container className="movieView text-light mt-2">
                <div className="movie-view">
                    <div className="movie-poster">
                        <img src={movie.ImagePath} />
                    </div>
                    <div className="movie-title">
                        <span className="label">Title: </span>
                        <span className="value">{movie.Title}</span>
                    </div><br />
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </div><br />
                    <div className="movie-director">
                        <span className="label">Director: </span>
                        <span className="value">{movie.Director.Name}</span>
                    </div><br />
                    <div className="director-bio">
                        <span className="label">Director Bio: </span>
                        <span className="value">{movie.Director.Bio}</span>
                    </div><br />
                    <div className="movie-genre">
                        <span className="label">Genre: </span>
                        <span className="value">{movie.Genre.Name}</span>
                    </div><br />
                    <div className="genre-description">
                        <span className="label">Genre Description: </span>
                        <span className="value">{movie.Genre.Description}</span>
                    </div>            
                    <Button variant="primary" className="back-movies" onClick={() => { onBackClick(null); }}>Back to movies list</Button>
                </div>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }).isRequired,
        Featured: PropTypes.boolean
        }).isRequired
};
