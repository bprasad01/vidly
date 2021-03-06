import React from "react";
import  Joi  from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from "../services/genreService";


class MovieForm extends Form {
  state = {
    data : {
        title : "",
        genreId : "",
        numberInStock : "",
        dailyRentalRate : "",
    }, 
    genres : [],
    errors : {}
  };

  // schema for validation using JOI
  schema = {
      _id : Joi.string(),
      title : Joi.string().required().label("Title"),
      genreId : Joi.string().required().label("Genre"),
      numberInStock : Joi.number().required().min(0).max(100).label("Number In Stock"),
      dailyRentalRate : Joi.number().required().min(0).max(100).label("Daily Rental Rate")
  }

  async populatedGenre(){
    const { data : genres} = await getGenres();
    this.setState({ genres });
  }

  async populatedMovie(){    
    try{
      // Read id parameter through the route and store it on a variable
      const movieId = this.props.match.params.id;
      // if movieId is equal to new that return a form
      if(movieId === "new") return ;
      // if the id is not equal to new thet return the movie with Id
      const { data : movie} = await getMovie(movieId);
      // updating the state & setting up the data opbject
      this.setState({ data : this.mapToViewModel(movie) });
    } catch(ex){
      // if movie does not exits then redirect noy found page
      if(ex.response && ex.response.status === 404) 
        this.props.history.replace("/not-found");
    }

  }

  async componentDidMount() {
    await this.populatedGenre();
    await this.populatedMovie();  
  }

  mapToViewModel(movie) {
      return {
          _id : movie._id,
          title : movie.title,
          genreId : movie.genre._id,
          numberInStock : movie.numberInStock,
          dailyRentalRate : movie.dailyRentalRate
      };
  }

   doSubmit = async () => {
       await saveMovie(this.state.data);
       this.props.history.push("/movies");
   }   


  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
            {this.renderInput("title","Title")}
            {this.renderSelect("genreId","Genre", this.state.genres)}
            {this.renderInput("numberInStock","Number In Stock", "number")}
            {this.renderInput("dailyRentalRate","Rate")}
            {this.renderButton("Save")} 
        </form>
      </div>
    );
  }
}

export default MovieForm;
