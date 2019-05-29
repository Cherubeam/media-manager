import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import TabBar from '../Navigation/TabBar'

const useStyles = makeStyles({
    root: {
      flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
})

export default () => {
    const classes = useStyles()
  
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit">
                        Media Manager
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <TabBar />
            </AppBar>
        </div>
    )
}
