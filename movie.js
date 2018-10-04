const uuidv4 = require('uuid/v4')
const moment = require('moment')

class Movie {
    constructor(id, tmdbID, imdbID, originalTitle, germanTitle, releaseDate, director, writers, actors, cover, description, runtime, tmdbVoteAverage, tmdbVoteCount, imdbRating, trailerUrls, storageLocations) {
        const timestamp = moment().format()
        this._createdAt = timestamp
        this._updatedAt = timestamp 
        this._id = id || uuidv4()
        this._tmdbID = tmdbID
        this._imdbID = imdbID
        this._originalTitle = originalTitle
        this._germanTitle = germanTitle
        this._releaseDate = releaseDate
        this._director = director
        this._writers = writers || []
        this._actors = actors || []
        this._cover = cover
        this._description = description
        this._runtime = runtime
        this._tmdbVoteAverage = tmdbVoteAverage
        this._tmdbVoteCount = tmdbVoteCount
        this._imdbRating = imdbRating
        this._trailerUrls = trailerUrls || []
        this._storageLocations = storageLocations || []
    }

    get id() {
        return this._id
    }

    get germanTitle() {
        return this._germanTitle
    }

    get publication() {
        return this._publication
    }

    get director() {
        return this._director
    }

    get writers() {
        return this._writers
    }

    get allTitles() {
        return {
            originalTitle: this._originalTitle,
            germanTitle: this._germanTitle
        }
    }

    get mainInformation() {
        return {
            id: this._id,
            germanTitle: this._germanTitle,
            releaseDate: this._publication,
            actors: this._actors,
            description: this._description
        }
    }

    set createdAt(date) {
        throw new Error ('Unexpected behaviour: class property \'createdAt\' is unmutable!')
    }

    set updatedAt(date) {
        // Implement validation -> format of moment().format()
        this._updatedAt = date
    }

    set imdbRating(rating) {
        // Implement validation -> only float from 0.0 to max. of 10.0; only one digit after the point.
        this._imdbRating = rating
    }

    set storageLocations(locations) { }
}

module.exports = Movie