const uuidv4 = require('uuid/v4')

class Movie {
    constructor(id, originalTitle, germanTitle, publication, director, writers, actors, cover, description, imdbRating, metaScore, trailerUrls, storageLocations) {
        this._id = id || uuidv4()
        this._originalTitle = originalTitle
        this._germanTitle = germanTitle
        this._publication = publication
        this._director = director
        this._writers = writers || []
        this._actors = actors || []
        this._cover = cover
        this._description = description
        this._imdbRating = imdbRating
        this._metaScore = metaScore
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
            title: this._germanTitle,
            publication: this._publication,
            actors: this._actors,
            description: this._description
        }
    }

    set publication(year) {
        if (typeof year === 'number') {
            this._publication = year
        }
        else {
            throw new Error('Pleae provide a valid year.')
        }
    }

    set imdbRating(rating) {
        this._imdbRating = rating
    }

    set metaScore(score) {
        this._metaScore = score
    }

    set storageLocations(locations) { }
}