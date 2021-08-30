import React from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

    render () {
    const { director, onBackClick } = this.props;
    
    return (
        <div className="director-view text-light">
            <div className="director-name">
                <h1>
                   <span className="value">{director.Name}</span>
                </h1>  
            </div>
            <div className="director-bio">
                <span className="value">{director.Bio}</span>
            </div>
            <div>
                <span className="value">{director.Birth}</span>
            </div>   
            <div>
                <span className="value">{director.Death}</span>
            </div>
            <Button variant="primary" onClick={() => {onBackClick(null);}}>Go Back</Button>
        </div>
    );
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
        Name: propTypes.string.isRequired,
        Bio: propTypes.string.isRequired,
        Birth: propTypes.string,
        Death: propTypes.string,
    }).isRequired
}

export default DirectorView;