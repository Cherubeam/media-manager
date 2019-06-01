import path from 'path'
import dotenv from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers/index'

// Assign process.env the keys and values from config/apiKeys.env
dotenv.config({
    path: path.join(__dirname, '../config/apiKeys.env')
})

// Setup GraphQLServer
const server = new GraphQLServer({
    typeDefs: './src/server/schema.graphql',
    resolvers
})

// // Log access to pages
// app.use((req, res, next) => {
//     const now = new Date().toString()
//     const log = `${now}: ${req.method} ${req.url}`

//     fs.appendFile('server.log', log + '\n', error => {
//         if (error) {
//             console.log('Unable to append to server.log')
//         }
//     })
//     next()
// })

server.start({ port: 5000 }, () => {
    console.log(`GraphQL server is running on localhost:5000`)
})