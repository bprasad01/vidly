import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
    
    raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
      // check if sortColumn.path is equal to this path
      if (sortColumn.path === path)
        // first we check the existing order if order is asc then set it to desc
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      else {
        // if path is different then set the path and order is asc
        sortColumn.path = path;
        sortColumn.order = "asc";
      }
      this.props.onSort(sortColumn);
    };
    render() { 
        const { movies, onLike, onDelete } = this.props;

        return (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.raiseSort("title")}>Title</th>
                <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
                <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
                <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
                <th>Like</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like liked={movie.liked} likedMovies={() => onLike(movie)} />
                  </td>
                  <td>
                    <button
                      onClick={() => onDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
}


export default MoviesTable;
