import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {IconButton} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
    />
));
const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    tabContainer: {
        marginLeft: 'auto',
        marginRight: '50px',
    },
    tab: {
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '1rem',
        marginLeft: '25px',
    },
    username: {
        color: 'white'
    }
}));

function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [val, setValue] = useState(0);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const changeNavigation = (e, value) => {
        setValue(value);
    };
    const logoutHandler = () => {
        let auth = localStorage.getItem('token')
        axios.post('logout',{}, {
            headers: {
                'Content-type': 'Application/json',
                'Authorization': 'Bearer ' + auth
            }
        })
            .then(response => {
                console.log(response)
            }).catch(e => {
            console.log(e)
        })

        localStorage.clear()
        document.location.href = '/'

    }

    const [userType, setType] = useState(false);
    const updateHeader = (v) => {
        setType(v)
    }
    useEffect(() => {
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('token')
        axios.get('user/' + username, {
            headers: {
                'Content-type': 'Application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.data.type === 'admin') {
                    updateHeader(true)
                }
            }).catch(e => {
            console.log(e.response)
            localStorage.clear()
            document.location.href = '/'
        })

        if (window.location.pathname === '/dashboard' && val !== 0) {
            setValue(0);
        } else if (window.location.pathname === '/accounts' && val !== 1) {
            setValue(1);
        }
        else if (window.location.pathname === '/password' && val !== 2) {
            setValue(2);
        }
    }, []);

    return (
        <>
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Hexacom
                        </Typography>
                        {
                            userType === true ?
                                <Tabs value={val} onChange={changeNavigation} className={classes.tabContainer}>
                                    <Tab className={classes.tab} label="Dashboard" component={Link}
                                         to="/dashboard"/>
                                    <Tab className={classes.tab} label="Accounts" component={Link} to="/accounts"/>
                                </Tabs>
                                :
                                <Tabs value={val} onChange={changeNavigation} className={classes.tabContainer}>
                                    <Tab className={classes.tab} label="Dashboard" component={Link}
                                         to="/dashboard"/>
                                </Tabs>

                        }


                        <IconButton onClick={handleClick} className={classes.username}>
                            {localStorage.getItem('username')}
                            <ArrowDropDownIcon/>
                        </IconButton>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Update Password"
                                              onClick={() => document.location.href = '/password'}/>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logout" onClick={logoutHandler}/>
                            </StyledMenuItem>
                        </StyledMenu>
                    </Toolbar>
                </AppBar>
                <div className={classes.toolbarMargin}/>
            </div>
        </>
    );
}

export default Header;
