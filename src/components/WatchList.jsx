import React, { useEffect, useState } from "react";
import genres from "../utility/genres";

function WatchList({ watchList, setWatchlist,  deleteWatchlist}) {
  // console.log(watchList);
  const [search, setSearch] = useState("");
  const [getgenre, setGenre] = useState(["All Genre"]);
  const [curentgenre, setCurentGenre] = useState("All Genre");
  const handlingserach = (e) => {
    setSearch(e.target.value);
  };
  const increseingOrder = () => {
    const sortdata = watchList.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortdata]);
  };
  
  const decreseingOrder = () => {
    const sortdata = watchList.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortdata]);
  };

  useEffect(() => {
    let temp = watchList.map((movies) => {
      return genres[movies.genre_ids[0]];
    });

    temp = new Set(temp);
    setGenre(["All Genre", ...temp]);
  }, [watchList]);

  const handelCurentGenre = (gendata) => {
    setCurentGenre(gendata);
  };
  return (
    <>
      <div className="flex justify-center m-4 flex-wrap space-x-3 font-bold">
        {getgenre.map((gendata, id) => {
          return (
            <div
              onClick={() => handelCurentGenre(gendata)}
              key={id} // Adding a unique key
              className={
                gendata == curentgenre
                  ? "text-white rounded-lg flex justify-center items-center  bg-blue-400 h-[3rem] w-[9rem]"
                  : "text-white rounded-lg flex justify-center items-center  bg-gray-400 h-[3rem] w-[9rem]"
              }
            >
              {gendata}
            </div>
          );
        })}
      </div>
      <div
        onChange={handlingserach}
        value={search}
        className="flex justify-center my-4"
      >
        <input
          className="bg-gray-200 h-[3rem] w-[20rem] px-5 outline-none"
          type="text"
          placeholder="Search for Movies"
        />
      </div>
      <div className=" overflow-hidden rounded-lg  border border-gray m-8">
        <table className=" w-full text-gray-400  text-center ">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center m-5 space-x-1">
                <div onClick={increseingOrder}>
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div>Rating</div>
                <div onClick={decreseingOrder}>
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Populariy</th>
              <th>Ganre</th>
            </tr>
          </thead>
          <tbody>
            {watchList
               .filter((movieobj) => {
                if (curentgenre == "All Genre") {
                  return true;
                } else {
                  return genres[movieobj.genre_ids[0]] == curentgenre;
                }
              })
              .filter((movieobj) => {
                return (movieobj.title || "")
                  .toLowerCase()
                  .includes((search || "").toLowerCase());
              })
              .map((movieobj, index) => (
                <tr key={movieobj.id || index} className="border-b-2">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      className="h-[8rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/original${movieobj.poster_path}`}
                      alt={movieobj.title}
                    />
                    <div>{movieobj.title}</div>
                  </td>
                  <td>{movieobj.vote_average}</td>
                  <td>{movieobj.popularity}</td>
                  <td>{genres[movieobj.genre_ids[0]] || "Unknown"}</td>
                  <td>
                    <button  onClick={()=>deleteWatchlist(movieobj)}className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
