import React from "react";

export default function Watched({ movie }) {
  const { imdbID, Title, Year, Poster, runtime, imdbRating, userRating } =
    movie;
  return (
    <li className="flex gap-4 px-4 py-3 mt-2">
      <img src={Poster} alt={`${Title} poster`} className="h-20"></img>
      <div className="flex flex-col justify-center text-white">
        <h3 className="text-xl font-semibold">{Title}</h3>
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
        </div>
      </div>
    </li>
  );
}
