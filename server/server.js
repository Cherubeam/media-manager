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
hbs.registerPartials(__dirname + '../views/partials')
app.set('view engine', 'hbs')

// Log access to pages
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// Static page
app.use(express.static(publicPath))

// Test an API call | Promise
let batmanMovie 

tmdb.getMovieDetails.then((result) => {
    batmanMovie = new Movie(undefined, result.tmdbID, result.imdbID, result.originalTitle, result.germanTitle, result.releaseDate, undefined, undefined, undefined, result.poster, result.description, result.runtime, result.tmdbVoteAverage, result.tmdbVoteCount, undefined, undefined, 'Blu-ray')
}).catch((error) => {
    console.log(error)
})


setTimeout(() => {
    console.log('--- Data ---')
    console.log(batmanMovie)

    batmanMovie.createdAt = '2018'
}, 2000);

// Test end

// Routes
app.get('/', (req, res) => {
    res.render('index.hbs', {
        movieTitle: 'Batman'
    })
})

app.get('/movies', (req, res) => {
    res.status(200).send('Movies Overview Page')
})

app.get('/series', (req, res) => {
    res.status(200).send('Series Overview Page')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

module.exports.app = app