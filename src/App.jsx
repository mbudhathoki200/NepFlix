import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
export default function App() {
  const [query, setQuery] = useState();
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <>
      <nav className="grid grid-cols-[1fr_1fr_1fr] items-center h-16 px-16 bg-primary rounded-md m-5">
        <div className="flex space-x-2">
          <span className="text-xl">🍿</span>
          <h1 className="text-xl font-bold text-white">NepFlix</h1>
        </div>
        <input
          type="text"
          placeholder="Search movies.."
          className="h-10 px-3 text-white rounded bg-primaryLight placeholder:text-sm placeholder:text-stone-300 placeholder:px-2 placeholder:italic focus:outline-none focus:ring focus:ring-primaryLight focus:transition-all focus:duration-5"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="flex justify-end text-white">
          Found <strong> {movies.length} </strong> results
        </p>
      </nav>
      <main>
        <div>
          <button
            className="absolute z-50 h-10 font-bold text-white border-none rounded-full cursor-pointer top-2 right-2 aspect-square bg-slate-600"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "-" : "+"}
          </button>
        </div>
      </main>
    </>
  );
}
