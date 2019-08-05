import React, { Component } from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";
import "./Movie.css";

//import PropTypes from "prop-types";

class App extends Component {
  state = {
    isLoading : true,
    movies: []
  }
  
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");

    this.setState({ movies, isLoading: false })
    //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
  };
  
  componentDidMount(){
    this.getMovies();
  }


  render(){
    const { movies, isLoading } = this.state;
    return(
      <section className="container" > 
          
            {isLoading ? 
            <div className="loader">
              <span className="loader__text" >Loading...</span>
            </div>
            : (
            <div className="movies" >
              {movies.map(movie => (
                <Movie 
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres} 
                />
              ))}
              
            </div>
            )}

      </section>
    );
  }
};

export default App;