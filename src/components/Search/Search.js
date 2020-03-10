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
            sortByTitle: false,
            newState: true
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
        this.setState({ movies: filterTitle, newState: false });
    }

    // Sort movies by title or by date
    handleSort(event) {     
        let sorted = [];
        console.log(this.props.movies)
        // Sort by title
        if (event.target.value === "title") {
            if(!this.state.newState) {
                sorted = this.state.movies.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
                this.setState({ 
                    movies: sorted, 
                    ascending: true,
                    sortByTitle: true,
                    newState: false
                 });
            }
            else {
                sorted = this.props.movies.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
                this.setState({ 
                    movies: sorted, 
                    ascending: true,
                    sortByTitle: true,
                    newState: false
                 });
            }
        }

        // Sort by date
        else {
            if (!this.state.newState) {
                sorted = this.state.movies.sort((a, b) => {
                    return a.release_date.localeCompare(b.release_date);
                });
                this.setState({ 
                    movies: sorted, 
                    ascending: true,
                    sortByTitle: false,
                    newState: false
                 });
            }
            else {
                sorted = this.props.movies.sort((a, b) => {
                    return a.release_date.localeCompare(b.release_date);
                });
                this.setState({ 
                    movies: sorted, 
                    ascending: true,
                    sortByTitle: false,
                    newState: false
                 });
            }
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
        this.setState({ movies: sorted, ascending: true, newState: false })
    }

    // Sort movies by title or by date in descending order
    handleDescend() {
        if (!this.state.newState) {
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
        this.setState({ movies: sorted, ascending: false, newState: false })
        }
    }

    render() {
        return (      
            <form className="search">
                <Container textAlign='center' className="search-form-container">
                    <Divider hidden />
                    <input type="text" 
                           placeholder="Enter Keyword" 
                           onChange={this.handleTitle}
                           className="input"
                    ></input>
                    <br />
                    <Divider hidden fitted />
                    {/* <label className="label" textAlign='justify'>Order by</label> */}
                    <Divider hidden fitted />
                    <select onChange={this.handleSort} className="select">
                        <option>Order by</option>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>                   
                    <Divider hidden fitted />

                    <label>
                        <input type="radio"
                            name="sorting"
                            value="asending"
                            checked={this.state.ascending}
                            onChange={this.handleAscend}
                            className="radio"
                        /> asending
                    </label>
                    <label>
                        <input type="radio"
                            name="sorting"
                            value="desending"
                            checked={!this.state.ascending}
                            onChange={this.handleDescend}
                            className="radio"
                        /> desending
                    </label>
                    <Divider hidden />
                </Container>
                {this.state.newState ? <Result movies={this.props.movies} /> : <Result movies={this.state.movies} />}
                
            </form>            
        )
    }
}

export default Search;
