import React from 'react';
import { Link } from 'react-router-dom';

import propTypes from 'prop-types';

import { Button, Icon, Item } from 'semantic-ui-react';
import './style.scss';

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: {},
            changeUrl: 1
        }
    }

    componentDidMount() {
        this.props.movies.map(movie => {
            if (movie.rank === this.props.id) {
                this.setState({ movie: movie })
            }
        });
    }

    render() {
        return (
            <div className="detail">
                <Link to={"/movie/" + (Number(this.props.id) - this.state.changeUrl)}>
                    <Button 
                        onClick={this.handlePrev} 
                        color="blue" basic><Icon 
                        name='chevron left' /></Button>
                </Link>

                <Link to={"/movie/" + (Number(this.props.id) + this.state.changeUrl)}>
                    <Button 
                        onClick={this.handleNext} 
                        color="blue" basic><Icon 
                        name='chevron right' /></Button>
                </Link>
                {this.props.movies.map(movie => {
                    if (movie.rank === Number(this.props.id)) {
                        
                        return (
                            <Item.Group key={movie.rank}>
                            <Item>
                                <Item.Image size='small' src={movie.img} />
                        
                                <Item.Content>
                                <h2>{movie.title}</h2>
                                <p><Icon color='blue' name='bookmark' />Rank {movie.rank}</p>                               
                                <Item.Description>{movie.overview}</Item.Description>
                                <Item.Extra>Released on {movie.release_date}</Item.Extra>
                                
                                </Item.Content>
                            </Item>
                            </Item.Group>
                        )
                    }
                })}
            </div>            
        )
    }
}

export default Detail;

Detail.propTypes = {
    id: propTypes.number.isRequired,
    movies: propTypes.arrayOf(
        propTypes.shape({
            title: propTypes.string.isRequired,
            rank: propTypes.number.isRequired,
            img: propTypes.string.isRequired,
            overview: propTypes.string.isRequired,
            release_date: propTypes.string.isRequired
        })
    ).isRequired
};