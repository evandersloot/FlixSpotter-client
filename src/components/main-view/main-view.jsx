import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'End of Watch', Description: 'Shot documentary-style, this film follows the daily grind of two young police officers in LA who are partners and friends, and what happens when they meet criminal forces greater than themselves.', ImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJmjQDcu4_4g8i7T0fL6Kyabv53SBOvIiT1AO9J8Hi0pCgDUkwqx1sK8q92bQjvj3E_Y&usqp=CAU'},
                { _id: 2, Title: 'Lone Survivor', Description: 'Marcus Luttrell and his team set out on a mission to capture or kill notorious Taliban leader Ahmad Shah, in late June 2005. Marcus and his team are left to fight for their lives in one of the most valiant efforts of modern warfare.', ImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfM5vlU5I39MDz6NCs2t_TD5jWypQAU8H6vw&usqp=CAU'},
                { _id: 3, Title: 'The Martian', Description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.', ImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0a5j1DUOULwYndOmyApt52sczLayITlkTae4I04arMhfNURY0W_TiBlQ_pVTeY7RZ-Yc&usqp=CAU'}
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
      
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
    }
}