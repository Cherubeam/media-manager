import uuidv4 from 'uuid/v4'
import moment from 'moment'

class Movie {
    /**
     * Creates an instance of Movie.
     * @param {*} movieID
     * @param {*} tmdbID
     * @param {*} imdbID
     * @param {*} originalTitle
     * @param {*} germanTitle
     * @param {*} releaseDate
     * @param {*} director
     * @param {*} writers
     * @param {*} actors
     * @param {*} description
     * @param {*} runtime
     * @param {*} tmdbVoteAverage
     * @param {*} tmdbVoteCount
     * @param {*} imdbRating
     * @param {*} poster
     * @param {*} videos
     * @param {*} genres
     * @param {*} keywords
     * @param {*} storageLocations
     * @memberof Movie
     */
    constructor(movieID, tmdbID, imdbID, originalTitle, germanTitle, releaseDate, director, writers, actors, description, runtime, tmdbVoteAverage, tmdbVoteCount, imdbRating, poster, videos, genres, keywords, storageLocations) {
        const timestamp = moment().format()
        this._createdAt = timestamp
        this._updatedAt = timestamp 
        this._movieID = movieID || uuidv4()
        this._tmdbID = tmdbID
        this._imdbID = imdbID
        this._originalTitle = originalTitle
        this._germanTitle = germanTitle
        this._releaseDate = moment(releaseDate, 'YYYY-MM-DD').format('YYYY')
        this._director = director
        this._writers = writers || []
        this._actors = actors || []
        this._description = description
        this._runtime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`
        this._tmdbVoteAverage = tmdbVoteAverage
        this._tmdbVoteCount = tmdbVoteCount
        this._imdbRating = imdbRating
        this._poster = poster
        this._videos = videos || []
        this._genres = genres || []
        this._keywords = keywords || []
        this._storageLocations = [storageLocations] || []
        this._watched = false
    }

    get id() {
        return this._movieID
    }

    get tmdbID() {
        return this._tmdbID
    }

    get germanTitle() {
        return this._germanTitle
    }

    get releaseDate() {
        return this._releaseDate
    }

    get director() {
        return this._director
    }

    get writers() {
        return this._writers
    }

    get description() {
        return this._description
    }

    get poster() {
        return this._poster
    }

    get videos() {
        return this._videos
    }

    get genres() {
        return this._genres
    }

    get keywords() {
        return this._keywords
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
            releaseDate: this._releaseDate,
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

    set storageLocations(locations) {
        this.storageLocations.push(locations)
    }

    set watched(boolean) {
        this._watched = boolean
    }
}

export default Movie