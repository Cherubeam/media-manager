import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import MediaManager from './components/MediaManager'
// import 'typeface-roboto';

console.log('React is running!')

const client = new ApolloClient({ uri: 'http://localhost:5000' })

const ApolloApp = App => (
    <ApolloProvider client={client}>
        <MediaManager />
    </ApolloProvider>
)

ReactDOM.render(ApolloApp(MediaManager), document.getElementById('root'))