import React from 'react';

import Result from './Result';

import { Container, Divider } from 'semantic-ui-react';
import 'normalize.css';
import './style.scss';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            ascending: true,
            sortByTitle: false
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleAscend = this.handleAscend.bind(this);
        this.handleDescend = this.handleDescend.bind(this);
    }

    // Filter movies according to title keywords in search bar
    handleTitle(event) {
        const {value} = event.target;
        const filterTitle = this.props.movies.filter(movie => 
            movie.title.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ movies: filterTitle });
    }

    // Sort movies by title or by date
    handleSort(event) {        
        let sorted = [];

        // Sort by title
        if (event.target.value === "title") {
            sorted = this.state.movies.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            this.setState({ 
                movies: sorted, 
                ascending: true,
                sortByTitle: true
             });
        }

        // Sort by date
        else {sorted = this.state.movies.sort((a, b) => {
                return a.release_date.localeCompare(b.release_date);
            });
            this.setState({ 
                movies: sorted, 
                ascending: true,
                sortByTitle: false
             });
        }
    }

    // Sort movies by title or by date in ascending order
    handleAscend() {
        let sorted = [];

        // Sort by title
        if(this.state.sortByTitle) {
            sorted = this.state.movies.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        }

        // Sort by date
        else sorted = this.state.movies.sort((a, b) => {
            return a.release_date.localeCompare(b.release_date);  
        });
        this.setState({ movies: sorted, ascending: true })
    }

    // Sort movies by title or by date in descending order
    handleDescend() {
        let sorted = [];

        // Sort by title
        if(this.state.sortByTitle) {
            sorted = this.state.movies.sort((a, b) => {
                return b.title.localeCompare(a.title);
            });
        }

        // Sort by date
        else sorted = this.state.movies.sort((a, b) => {

            return b.release_date.localeCompare(a.release_date);  
        });
        this.setState({ movies: sorted, ascending: false })
    }

    render() {
        return (      
            <form className="search">
                <Container textAlign='center' className="search-form-container">
                    <Divider hidden />

                    <input type="text" 
                           placeholder="title" 
                           onChange={this.handleTitle}
                    ></input>
                    <select onChange={this.handleSort}>
                        <option>Select</option>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>                   
                    <br />

                    <label>
                        <input type="radio"
                            name="sorting"
                            value="asending"
                            checked={this.state.ascending}
                            onChange={this.handleAscend}
                        /> asending
                    </label>
                    <br />
                    <label>
                        <input type="radio"
                            name="sorting"
                            value="desending"
                            checked={!this.state.ascending}
                            onChange={this.handleDescend}
                        /> desending
                    </label>
                    <Divider hidden />
                </Container>
                <Result movies={this.state.movies} />
            </form>            
        )
    }
}

export default Search;