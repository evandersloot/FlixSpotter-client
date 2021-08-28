import React from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {
    render () {
        const { genre, onBackClick } = this.props;
        
        return (
            <div className="genre-view text-light">
                <div className="genre-name">
                    <h1>
                        <span className="value">{genre.Name}</span>
                    </h1>    
                </div>
                <div className="genre-bio">
                    <span className="value">{genre.Description}</span>
                </div><br />
                <Button variant="primary" onClick={() => {onBackClick(null);}}>Go Back</Button>
            </div>
        );
        }
}

GenreView.propTypes = {
    genre: propTypes.shape({
        Name: propTypes.string.isRequired,
        Description: propTypes.string.isRequired
    })
}

export default GenreView;