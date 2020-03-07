import React from 'react';
import axios from 'axios';

import Result from './Result';
import propTypes from 'prop-types';

import { Button, Container, Divider } from 'semantic-ui-react'
import 'normalize.css';
import './style.scss';


class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            all: true,
            movies: [],
            genres: []
        };
        this.handleGenre = this.handleGenre.bind(this);
        this.handleAll = this.handleAll.bind(this);
    }

    componentDidMount() {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=1ef3fad2218a83fba0ab2e69a4718ff5&language=en-US")
        .then(res => {
            const genres = res.data.genres;
            this.setState({ 
                genres: genres
            });
      })       
    }

    // To show all the 500 movies
    handleAll(event) {
        this.setState({ 
            all: true,
            movies: this.props.movies 
        });
    }

    // To show movies that match the selected genre
    handleGenre(event) {
        const id = event.target.value;
        const filterGenre = this.props.movies.filter(movie => (
            movie.genre_ids.includes(Number(id))
        ));
        this.setState({ 
            all: false,
            movies: filterGenre 
        });
    }

    render() {
        return (   
            <div>
                <Container textAlign='center'>

                    {/* Grnres button */}
                    <Button key="0" value="All" onClick={this.handleAll} color="linkedin">All</Button>
                    {
                        this.state.genres.map(genre => {
                            if (genre.id < 80 && genre.id !== 12)
                                return <Button key={genre.id} value={genre.id} onClick={this.handleGenre} color="linkedin">{genre.name}</Button>;
                        })
                    }
                    <Divider hidden fitted/>
                    
                    {/* Movie images */}
                    {this.state.all === true? <Result movies={this.props.movies} />:<Result movies={this.state.movies} />}
                </Container>
                
            </div>       
        );
    }
}

export default Gallery;

Gallery.propTypes = {
    movies: propTypes.arrayOf.isRequired
};

Gallery.defaultProps = {
    genre: []
};