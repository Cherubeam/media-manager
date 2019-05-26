import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import MovieDashboard from './components/MovieDashboard';
// import 'typeface-roboto';

console.log('React is running!')

const client = new ApolloClient({ uri: 'http://localhost:5000' })

const ApolloApp = App => (
    <ApolloProvider client={client}>
        <MovieDashboard />
    </ApolloProvider>
)

ReactDOM.render(ApolloApp(MovieDashboard), document.getElementById('root'))