import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar, SnackbarContent, Slide, IconButton } from '@material-ui/core'
import { Warning, Close } from '@material-ui/icons'
// import amber from '@material-ui/core/colors/amber'

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.status.danger,
		width: 600
	},
	icon: {
		fontSize: 20,
		marginRight: theme.spacing(1)
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	}
}))

const SlideTransition = props => <Slide {...props} direction="up" />

const WarningSnackbar = ({ snackbarOpen, handleCloseSnackbar }) => {
	const classes = useStyles()

	return (
		<Snackbar
			open={snackbarOpen}
			autoHideDuration={6000}
			onClose={handleCloseSnackbar}
			TransitionComponent={SlideTransition}
			ContentProps={{
				'aria-describedby': 'warning-snackbar'
			}}
		>
			<SnackbarContent
				className={classes.root}
				message={
					<span id="warning-snackbar" className={classes.message}>
						<Warning className={classes.icon} />
						Already in library!
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={handleCloseSnackbar}
					>
						<Close className={classes.icon} />
					</IconButton>
				]}
			/>
		</Snackbar>
	)
}

WarningSnackbar.propTypes = {
	snackbarOpen: PropTypes.bool.isRequired,
	handleCloseSnackbar: PropTypes.func.isRequired
}

export default WarningSnackbar
