import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        height: '4%'
    },
    icon :{
        marginTop: '0.3rem'
    }
}));
function Footer() {

    const classes = useStyles()
    return (

        <>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Typography variant={"h6"} align="center">
                    <CopyrightIcon className={classes.icon} /> Hexacom  2020
                </Typography>
            </AppBar>
        </>
    )
}

export default Footer
