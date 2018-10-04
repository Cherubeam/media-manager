const request = require('supertest')

const getMovieDetails = require('./tmdb').getMovieDetails

describe('TMDB requests', () => {
    describe('GET Movie Details', () => {
        it('should get request body back', (done) => {
            request(getMovieDetails)
                .get('/')
                .expect(200)
                .end(done)
        })
    })
})