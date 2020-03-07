import React from 'react';
import { Link } from 'react-router-dom';

import propTypes from'prop-types';

import { Image, Divider } from 'semantic-ui-react';
import 'normalize.css';
import './style.scss';

class Result extends React.Component {

    render() {
        return(
            <div>
                <Image.Group size='small'>
                    {
                        this.props.movies.map(movie => {
                            if (movie.poster_path !== null) {
                                return (
                                    <Link key={movie.id} to={"/movie/" + movie.rank}>
                                        <Image className="gallery-img" src={movie.img} size='medium'/>
                                    </Link>
                                )
                            }
                        })
                    }
                    <Divider hidden />
                </Image.Group>
            </div>            
        )       
    }
}

export default Result;

Result.propTypes = {
       movies: propTypes.arrayOf(
           propTypes.shape({
               id: propTypes.number.isRequired,
               rank: propTypes.number.isRequired,
               img: propTypes.string.isRequired
           })
       ).isRequired
};

Result.defaultProps = {
    movie: []
};