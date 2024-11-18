import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { jsx } from "react/jsx-runtime";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleaddwatchlist = (movieobj) => {
    const newWatchlist = [...watchlist, movieobj];
   localStorage.setItem('Movie',JSON.stringify(newWatchlist))
    setWatchlist(newWatchlist);
    console.log(newWatchlist);
  };

  const deleteWatchlist = (movieobj) => {
    const filterwatchlist = watchlist.filter(
      (movie) => movie.id !== movieobj.id
    );
  setWatchlist(filterwatchlist);
    localStorage.setItem('Movie',JSON.stringify(filterwatchlist))
  };
  useEffect(()=>
  {
    let moviesfromlocalstoarge=localStorage.getItem('Movie');
    if(!moviesfromlocalstoarge)
    {
      return 
    }
    setWatchlist(JSON.parse(moviesfromlocalstoarge));
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Banner />{" "}
                <Movies
                  watchlist={watchlist}
                  handleaddwatchlist={handleaddwatchlist}
                  deleteWatchlist={deleteWatchlist}
                />{" "}
              </>
            }
          />

          <Route
            path="/watchlist"
            element={<WatchList watchList={watchlist} setWatchlist={setWatchlist}  deleteWatchlist={deleteWatchlist} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
