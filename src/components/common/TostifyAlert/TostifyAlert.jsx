import React, { useState } from 'react' 
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const TostifyAlert = props => {

    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setMsg(null)
        setOpen(false)
    }

    return ( 
        <Snackbar open={!!props.isMsgDisplayed} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
                {props.isMsgDisplayed}
            </Alert>
        </Snackbar>
    ) 
}

export default TostifyAlert