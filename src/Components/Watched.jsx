import React from "react";

export default function Watched({ movie, onDeleteMovie }) {
  const { imdbID, title, Year, poster, runtime, imdbRating, userRating } =
    movie;
  return (
    <li className="flex gap-4 px-4 py-3 mt-2">
      <img src={poster} alt={`${title} poster`} className="h-20 w-14"></img>
      <div className="flex flex-col justify-center gap-2 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex gap-5 text-sm">
          <p>
            <span>⭐️</span>
            <span>{imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{runtime} min</span>
          </p>
          <button
            onClick={() => onDeleteMovie(movie.imdbID)}
            className="absolute h-[1.3rem] bg-red-600 rounded-full right-9 text-black flex items-center justify-center font-semibold aspect-square hover:bg-red-500"
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
}
