import React from 'react';
import { Link } from 'react-router-dom';

import propTypes from 'prop-types';

import { Item, Divider } from 'semantic-ui-react';
import 'normalize.css';

class Result extends React.Component {
    render() {
        return (  
            <div className="search-result">
                {this.props.movies.map(movie => {
                    return (
                        <Item.Group className="result-items" key={movie.rank}>
                            <Item>
                            <Item.Image size='tiny' src={movie.img} />

                            <Item.Content>
                                <Link to={"/movie/" + movie.rank}>
                                    <Item.Header className="list-title">{movie.title}</Item.Header>
                                </Link>
                                <Item.Meta>
                                    <span >Rank: {movie.rank}</span>
                                </Item.Meta>
                                <Item.Meta>
                                    <span >Realeased on {movie.release_date}</span>
                                </Item.Meta>
                            </Item.Content>
                            </Item>
                            <Divider hidden fitted />
                        </Item.Group>                 
                    )
                })}
            </div>            
        )
    }
}

export default Result;

Result.propTypes = {
    movies: propTypes.arrayOf(
        propTypes.shape({
            title: propTypes.string.isRequired,
            rank: propTypes.number.isRequired,
            img: propTypes.string.isRequired,
            release_date: propTypes.string.isRequired
        })
    ).isRequired
};

Result.defaultProps = {
 movie: []
};
