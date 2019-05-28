import React from 'react'
import MediaCard from './layout/MediaCard'

export default ({ movies, addMovie }) => {

    return movies.data.movieSearch.map((movie, index) => (
        <div>
            <p key={index}>{movie.originalTitle}</p>
            <MediaCard movie={movie}/>
        </div>
    ))
}

// return movies.map(data => (
//     <div key={data.movieDetails.tmdbID}> {/* TODO: use IMDB ID instead */} 
//         <h4>{data.movieDetails.originalTitle}</h4>
//         <img src={data.movieDetails.poster} />
//         <p>{data.movieDetails.description}</p>
//         <button onClick={() => addMovie(e)}>ADD TO DATABASE</button>
//     </div>
// ))

// return movie.map(data => (
//     <div key={data.tmdbID}> {/* TODO: use IMDB ID instead */} 
//         <h4>{data.originalTitle}</h4>
//         <img src={data.poster} />
//         <p>{data.description}</p>
//         <button onClick={() => addMovie(e)}>ADD TO DATABASE</button>
//     </div>
// ))