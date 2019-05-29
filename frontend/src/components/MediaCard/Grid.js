import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
})

function AutoGrid(props) {
    const { classes } = props

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
            <Grid item xs>
                <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>xs</Paper>
            </Grid>
            </Grid>
        </div>
    )
}

AutoGrid.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AutoGrid)