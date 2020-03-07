import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import axios from 'axios';
import { Container, Divider, List } from 'semantic-ui-react';

import Header from '../Header/Header';
import Gallery from '../Gallery/Gallery';
import Search from '../Search/Search';
import Detail from '../Detail/Detail';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        movies: []
    };
}

componentDidMount() {
    // Get top 500 popular movie datasets from TMDB
    const prefix = "https://api.themoviedb.org/3/discover/movie?api_key=1ef3fad2218a83fba0ab2e69a4718ff5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="
    const movies = [];
    let k = 1;
    for (var i = 1; i <= 25; i++) {
        axios.get(prefix + `${i}`).then(res => {
            res.data.results.map(result => {
                result.rank = k;
                result.img = "https://image.tmdb.org/t/p/w500" + result.poster_path
                k++;
                if(result.poster_path !== null)
                  movies.push(result);
            });
            this.setState({ movies: movies });       
        })    
    }
}

  render() {
    return(
      <Router>
        <div>
          <Header />
          <Container textAlign='center'>

            <ul>            
            <List horizontal>
              <List.Item><Link to="/">Gallery</Link></List.Item>
              <List.Item><Link to="/list">Search</Link></List.Item>
            </List>            
          </ul>

          <Divider hidden fitted/>
          </Container>
          

          <Switch>
            <Route exact path="/" render={(props) => 
              <Gallery movies={this.state.movies}/>
            }>
            </Route>

            <Route path="/list" render={(props) => 
              <Search movies={this.state.movies} />
              }>              
            </Route>

            <Route path="/movie/:id" render={(props) => 
              <Detail movies={this.state.movies} id={props.match.params.id} />
              }>
            </Route>

          </Switch>
        </div>

      </Router>
      
    )
  }    
}

export default App;
