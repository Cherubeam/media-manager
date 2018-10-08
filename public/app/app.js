const tmdb = require('./tmdb/tmdb')

console.log('Das ist app.js')

// TEST AREA

tmdb.getMovieDetails((errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(results)
    }
})

// tmdb.getMovieDetails((errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage)
//     } else {
//         console.log(`Der Titel lautet: ${results.title}`)
//         // const titleElement = document.getElementById('title')
//         // titleElement.textContent = r.title
//     }
// })

// tmdb.getMovieCredits((errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage)
//     } else {
//         console.log(results)
//     }
// })

// const movie = new Movie(undefined, 'Batman Begins', 'Batman Begins', 2005, 'Christopher Nolan', ['Bob Kane', 'David S. Goyer', 'Christopher Nolan'], ['Christian Bale', 'Michael Caine', 'Liam Neeson', 'Katie Holmes', 'Gary Oldman'], undefined, 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.', 8.3, 70, 'https://www.youtube.com/watch?v=55AUfim4H8E', ['Blu-ray', 'Collectors Edition'])
// console.log(movie)

// const titleElement = document.getElementById('title')
// titleElement.textContent = movie._germanTitle

// const publicationElement = document.getElementById('publication')
// publicationElement.textContent = movie._publication

// const descriptionElement = document.getElementById('description')
// descriptionElement.textContent = movie._description