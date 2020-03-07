import React from 'react';
import axios from 'axios';

import Gallery from '../Gallery/Gallery';
import Search from '../Search/Search';

class Movies extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: []
        };
    }

    componentDidMount() {

        // Get 500 movie datasets from TMDB
        const prefix = "https://api.themoviedb.org/3/discover/movie?api_key=1ef3fad2218a83fba0ab2e69a4718ff5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="
        const movies = [];
        var k = 1;
        for (var i = 1; i <= 25; i++) {
            axios.get(prefix + `${i}`).then(res => {
                res.data.results.map(result => {
                    result.rank = k;
                    k++;
                    movies.push(result);
                });
                this.setState({ movies: movies });       
            })    
        }
    }

    render() {
        return(
            <div>
                {                    
                    this.props.search === false? 
                        <Gallery movies={this.state.movies} /> : <Search movies={this.state.movies}/>
                }
            </div>
        ) ;
    }
}

export default Movies;