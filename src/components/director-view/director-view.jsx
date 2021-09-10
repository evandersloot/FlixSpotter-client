import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

    render () {
    const { director, onBackClick } = this.props;
    
    return (
        <div className="director-view text-light">
            <Col className="movie-poster h-100 w-100">
            <img src={director.Image} />
          </Col>
            <div className="director-name">
                <h1>
                   <span className="value">{director.Name}</span>
                </h1>  
            </div>
            <div className="director-bio">
                <span className="value">{director.Bio}</span>
            </div>
            <div>
                <span className="value">Born: {director.Birth}</span>
            </div>   
            <div>
                <span className="value">Died: {director.Death}</span>
            </div>
            <Button variant="primary" onClick={() => {onBackClick(null);}}>Go Back</Button>
        </div>
    );
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
        Name: propTypes.string.isRequired,
        Image: propTypes.string.isRequired,
        Bio: propTypes.string.isRequired,
        Birth: propTypes.string,
        Death: propTypes.string,
    }).isRequired
}

export default DirectorView;