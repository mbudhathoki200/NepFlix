import { useEffect, useState } from "react";
import Movies from "./Components/Movies";
import Watched from "./Components/Watched";

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
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "fe9ffbb8";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("interstellar");
  const [selectedId, SetSelectedId] = useState(null);

  const tempQuery = "interstellar";

  // useEffect(() => {
  //   console.log("A");
  // }, []);

  // useEffect(() => {
  //   console.log("B");
  // });
  // console.log("C");
  function handleSelectMovie(id) {
    SetSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    SetSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Spmething went wrong ahile fetching movies");

          const data = await res.json();
          if (data.Response == "False") throw new Error("Movie not Found");
          setMovies(data.Search);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return (
    <p className="flex items-center justify-center font-bold text-white uppercase h-1/2">
      Loading...
    </p>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="flex items-center justify-center font-bold text-white uppercase h-[40%]">
      <span>⚠️</span>
      {message}
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="grid grid-cols-[1fr_1fr_1fr] items-center h-16 px-16 bg-primary rounded-md m-5">
      <Logo />
      {children}
    </nav>
  );
}
function NumResults({ movies }) {
  return (
    <p className="flex justify-end gap-1 text-white">
      Found <strong> {movies.length} </strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="flex space-x-2">
      <span className="text-xl">🍿</span>
      <h1 className="text-xl font-bold text-white ">NepFlix</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search movies.."
      className="h-10 px-3 text-white rounded bg-primaryLight placeholder:text-sm placeholder:text-stone-300 placeholder:px-2 placeholder:italic focus:outline-none focus:ring focus:ring-primaryLight focus:transition-all focus:duration-5"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Main({ children }) {
  return (
    <main className="flex justify-center gap-8 mt-7 h-[80vh] ">{children}</main>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-[25rem] max-w-[25rem] bg-slate-800 rounded-lg overflow-auto relative">
      <button
        className="absolute z-50 h-[1.5rem] font-bold text-white border-none rounded-full cursor-pointer top-[0.8rem] right-[0.8rem] aspect-square bg-slate-900 justify-center"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
/*
function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="w-[25rem] max-w-[25rem] bg-slate-800 rounded-lg overflow-auto relative">
      <button
        className="absolute z-50 h-[1.5rem] font-bold text-white border-none rounded-full cursor-pointer top-[0.8rem] right-[0.8rem] aspect-square bg-slate-900 justify-center"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}
*/
/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="w-[25rem] max-w-[25rem] bg-slate-800 border-md rounded-lg overflow-auto relative">
      <button
        className="absolute z-50 h-[1.5rem] font-bold text-white border-none rounded-full cursor-pointer top-[0.8rem] right-[0.8rem] aspect-square bg-slate-900"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "-" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummery watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}
*/
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="px-2 mt-2 divide-y divide-stone-400">
      {movies.map((movie) => (
        <Movies
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className="text-white">
      <button
        onClick={onCloseMovie}
        className="absolute z-50 m-3 text-xl font-extrabold text-black bg-white rounded-full w-7 aspect-square"
      >
        &larr;
      </button>
      {selectedId}
    </div>
  );
}
function WatchedMovieList({ watched }) {
  return (
    <ul className="px-2 divide-y divide-stone-400">
      {watched.map((movie) => (
        <Watched key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
function WatchedSummery({ watched }) {
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="flex flex-col gap-1 p-5 text-sm rounded-xl text-slate-200 bg-slate-700">
      <h2 className="font-semibold uppercase">Movies you watched</h2>
      <div className="flex gap-4 font-semibold">
        <p className="flex gap-2">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex gap-2">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="flex gap-2">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p className="flex gap-2">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
