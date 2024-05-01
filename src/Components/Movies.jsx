import React from "react";

const Movies = ({ movie }) => {
  const { imdbID, Poster, Title, Year } = movie;
  return (
    <li key={imdbID} className="flex gap-4 px-4 py-3 mt-2">
      <img src={Poster} alt={`${Title} poster`} className="h-20 mt-2" />
      <div className="flex flex-col justify-center px-2 pt-3">
        <h3 className="text-xl font-semibold text-white">{Title}</h3>
        <p className="flex gap-2 text-sm text-white">
          <span>📅</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movies;
