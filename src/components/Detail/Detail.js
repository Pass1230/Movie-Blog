import React from 'react';
import { Link } from 'react-router-dom';

import propTypes from 'prop-types';

import { Button, Icon, Item, Container } from 'semantic-ui-react';
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
                <Container textAlign='right'>
                {/* Use prev and next button to cycle through the list objects */}
                {
                    this.props.id - this.state.changeUrl <= 0? 
                        (
                            <Link to={"/movie/500" }>
                                <Button 
                                    className="item-button"
                                    onClick={this.handlePrev} 
                                    color="blue" icon><Icon 
                                    name='chevron left' /></Button>
                            </Link>
                        ) :
                        (
                            <Link to={"/movie/" + (Number(this.props.id) - this.state.changeUrl)}>
                                <Button 
                                    className="item-button"
                                    onClick={this.handlePrev} 
                                    color="blue" icon><Icon 
                                    name='chevron left' /></Button>
                            </Link>
                        )                    
                }
                
                {
                    this.props.id + this.state.changeUrl > 500? 
                        (
                            <Link to={"/movie/1"}>
                                <Button 
                                    className="item-button"
                                    onClick={this.handleNext} 
                                    color="white" icon><Icon 
                                    name='chevron right' /></Button>
                            </Link>
                        ) :
                        (
                            <Link to={"/movie/" + (Number(this.props.id) + this.state.changeUrl)}>
                                <Button 
                                    className="item-button"
                                    onClick={this.handleNext} 
                                    color="white" icon><Icon 
                                    name='chevron right' /></Button>
                            </Link>
                        )                    
                }
                </Container>
                {this.props.movies.map(movie => {
                    if (movie.rank === Number(this.props.id)) {
                        
                        return (
                            <Item.Group key={movie.rank} className="detail-group">
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
