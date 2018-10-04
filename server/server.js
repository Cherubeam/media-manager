// Require node modules
const path = require('path')
const fs = require('fs')

// Require third party modules
const express = require('express')
const hbs = require('hbs')

// Require own modules
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

// Test an API call
tmdb.getMovieDetails((errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(results)
    }
})
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