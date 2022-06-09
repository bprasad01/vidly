import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  // create a column property and define path and label property
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like", label : "Like",
      content : (movie) => (
        <Like
          liked={movie.liked}
          likedMovies={() => this.props.onLike(movie)}
        />
      ),
    },
    { key: "delete", label : "Action",
      content : (movie) => (
        <button onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm">DELETE
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table  data={movies} onSort={onSort} sortColumn={sortColumn} columns={this.columns}/>
    );
  }
}

export default MoviesTable;
