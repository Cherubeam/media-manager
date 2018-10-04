const request = require('supertest')

const app = require('./server').app

describe('Server', () => {
    describe('GET /movies', () => {
        it('should render movies overview page', (done) => {
            request(app)
                .get('/movies')
                .expect(200)
                .expect('Movies Overview Page')
                .end(done)
        })
    })

    describe('GET /series', () => {
        it('should render series overview page', (done) => {
            request(app)
                .get('/series')
                .expect(200)
                .expect('Series Overview Page')
                .end(done)
        })
    })
})
