import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Paging from './Paging';

function Movies({ watchlist,handleaddwatchlist,deleteWatchlist}) {
  const [movies,setmovies]=useState([]);
  const[pageno,setpageno]=useState(1);

     const setBackward= ()=>
     {
         if(pageno===1)
         {
          setpageno(1);
         }
         else{
         setpageno(pageno-1);
         }
     }

     const setForward=()=>
     {
       setpageno(pageno+1);
     }

  useEffect(()=>
  {
    
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5bd7d31b6e1466d5799253aa07b28a02&language=en-US&page=${pageno}`).then((response)=>
        {
          console.log("API Response Data:", response.data.results);
          setmovies(response.data.results);
        })
  } ,[pageno])
  return (
    <div className='p-5'>
      <div className='text-2xl font-bold text-center '>
        Trending Movies
      </div>
      <div className='flex row  flex-wrap justify-around  gap-10'>
        {movies.map((moviesobj)=>{
          //console.log(moviesobj)
          return <MovieCard key={moviesobj.id} moviesobj={moviesobj} handleaddwatchlist={handleaddwatchlist} poster_path={moviesobj.poster_path} title={moviesobj.original_title} deleteWatchlist={deleteWatchlist} watchlist={watchlist}/>})}
           
      </div>
     <Paging pageno={pageno} setBackward={setBackward} setForward={setForward}/>
    </div>
  )
}

export default Movies


//https://api.themoviedb.org/3/movie/popular?api_key=5bd7d31b6e1466d5799253aa07b28a02&language=en-US&page=2