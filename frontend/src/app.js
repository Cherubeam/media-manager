import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from '@material-ui/styles'
import AppRouter from './routers/AppRouter'

console.log('React is running!')

const client = new ApolloClient({ uri: 'http://localhost:5000' })

const theme = {
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
}

// const ApolloApp = App => (
// 	<AppRouter>
// 		<ThemeProvider>
// 			<ApolloProvider client={client}>
// 				<MediaManager />
// 			</ApolloProvider>
// 		</ThemeProvider>
// 	</AppRouter>
// )

// ReactDOM.render(ApolloApp(MediaManager), document.getElementById('root'))
ReactDOM.render(<AppRouter />, document.getElementById('root'))
