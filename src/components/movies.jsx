import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    // defined an empty array 
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path : 'title', order : 'asc' }
  };

  // initializing the movies and genre property of the state object
  componentDidMount() {
    // define new constant and set into new array and 
    // spread the array thet is reurn from the getGenres function
    const genres = [{ _id : "", name : "All Genres"}, ...getGenres()]
    this.setState({ movies: getMovies(), genres });
  }
  // function for delete movie
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  // function for like movie
  handleLike = (movie) => {
    // clone of the movie object and assign into a new variable named movies
    const movies = [...this.state.movies];
    // In this array find index of the object
    const index = movies.indexOf(movie);
    // clone of this new object it copies all of the property here
    movies[index] = { ...movies[index] };
    // Toggle the object so if it is true it becomes false otherwise it becomes true
    movies[index].liked = !movies[index].liked;
    // update the state object using setState method
    this.setState({ movies });
  };

  // function for set pagination
  handlePageChange = (page) => {
    // set the current page property to this page
    this.setState({ currentPage: page });
  };

  // function for select genre 
  handleGenreSelect = (genre) => {
    // store the genre in state
    this.setState({ selectedGenre: genre, currentPage : 1 });
  };

  // function for handling sorting 
  handleSort = sortColumn => {
    // update the state based on sortColumn
    this.setState( { sortColumn });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    // apply filter method to get tha data based on their respective genre
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
      : allMovies;

    // apply orderBy method to sort the data and it will take filtered array,
    // path and order as an argument and return a new array
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // calling the paginate function and pass the sorted function as an argument 
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount : filtered.length, data : movies}
  }

  render() {
    // find length of the movies object
    const { length: count } = this.state.movies;

    const { totalCount, data : movies} = this.getPagedData();

    const {
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>There Are No Movies Available</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p>Showing {totalCount} Movies Available.</p>

          <MoviesTable  
            movies={movies} 
            sortColumn={sortColumn}
            onLike={this.handleLike} 
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />

        </div>
      </div>
    );
  }
}

export default Movies;
