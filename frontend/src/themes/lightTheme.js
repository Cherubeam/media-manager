import { createMuiTheme } from '@material-ui/core/styles'

export default () => {
	return createMuiTheme({
		palette: {
			primary: {
				light: '#6573c3',
				main: '#3f51b5',
				dark: '#2c387e',
				contrastText: '#fff'
			},
			secondary: {
				light: '#f73378',
				main: '#f50057',
				dark: '#ab003c',
				contrastText: '#fff'
			}
		},
		status: {
			danger: 'orange'
		}
	})
}
