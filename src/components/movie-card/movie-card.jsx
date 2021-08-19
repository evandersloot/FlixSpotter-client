import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
                
        return (
            <div className="movie-container">
                <div className="movie-card" 
                    onClick={() => {onMovieClick(movie)
                    }}>
                    <div className="card">
                        <div className="card-title">
                            {movie.Title}
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        }).isRequired,
    onMovieClick: PropTypes.func.isRequired 
};