import axios from "axios";
import React, { useEffect } from "react";

function MovieCard({
  moviesobj,
  watchlist,
  handleaddwatchlist,
  deleteWatchlist,
  poster_path,
  title,
}) {
 
  function doseContain(movieobj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieobj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[50vh] w-[200px] bg-cover bg-center rounded-xl flex flex-col justify-between   hover:scale-110 duration-300 hover:curser-pointer"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path}})`,
      }}
    >
      {doseContain(moviesobj) ? (
        <div
          onClick={() => deleteWatchlist(moviesobj)}
          className="m-2  flex justify-center h-8 w-8 items-center bg-gray-900/60  rounded-lg"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleaddwatchlist(moviesobj)}
          className="m-2  flex justify-center h-8 w-8 items-center bg-gray-900/60  rounded-lg"
        >
          &#128525;
        </div>
      )}

      <div className="w-full mt-30 text-white text-xl text-center p-2 bg-gray-900/60 ">
        {title}
      </div>
    </div>
  );
}

export default MovieCard;
