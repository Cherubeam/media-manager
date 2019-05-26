import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow: 1
    }
})

export default () => {
    const classes = useStyles()
  
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                    Media Manager
                    </Typography>
            </Toolbar>
            </AppBar>
        </div>
    )
}
