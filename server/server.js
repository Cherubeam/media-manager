// Require node modules
const path = require('path')
const fs = require('fs')

// Require third party modules
const express = require('express')
const hbs = require('hbs')

// Require own modules
const Movie = require('./movie')
const tmdb = require('../tmdb/tmdb')

// Setup express and publicPath
const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

// Views
hbs.registerPartials(publicPath + '/views/partials')
app.set('views', path.join(__dirname, '../public/views'))
app.set('view engine', 'hbs')

// Log access to pages
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', log + '\n', error => {
        if (error) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// Static page
app.use(express.static(publicPath))

// Test an API call | Promise
// getMovieDetails
let movie 

tmdb.getMovieDetails.then((result) => {
    return movie = new Movie(undefined, result.tmdbID, result.imdbID, result.originalTitle, result.germanTitle, result.releaseDate, undefined, undefined, undefined, result.description, result.runtime, result.tmdbVoteAverage, result.tmdbVoteCount, undefined, result.poster, result.videos, result.genres, result.keywords, 'Blu-ray',)
}).then(() => {
    //
    console.log(movie)
    //
    app.get(`/${movie._tmdbID}`, (req, res) => { // TODO: change to proper id insteadif tmdbID later
            res.render('index.hbs', {
                movieTitle: movie.germanTitle,
                moviePoster: `https://image.tmdb.org/t/p/w342${movie.poster}`,
                movieRelease: movie.releaseDate,
                movieDescription: movie.description
                //movieGenres: movie.genres,
                //movieKeywords: movie.keywords
            }, (error, html) => {
                if (error) {
                    res.status(404).sendFile(publicPath + '/404.html')
                    console.log(error)
                } else {
                    res.status(200).send(html)
                }
            })
    })
}).catch((error) => {
    console.log(error)
})

// Test an API call | Async Await
tmdb.getMovieCredits.then((result) => {
    let cast = []
    for (index = 0; index < 5; index++) {
        cast.push(result.cast[index])
    }

    let crew = result.crew[0]

    console.log(cast)
    console.log(crew)

}).catch((error) => {
    console.log(error)
})
// Test end

// Routes
app.get('/movies', (req, res) => {
    try {
        res.status(200).send('Movies Overview Page')
    } catch(error) {
        console.log(error)
    }
})

app.get('/series', (req, res) => {
    try {
        res.status(200).send('Series Overview Page')
    } catch(error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

module.exports.app = app