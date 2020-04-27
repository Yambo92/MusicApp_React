import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import { GlobalContext } from "../GlobalState";

//mui
import {withStyles} from '@material-ui/core/' 
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

//icons 
import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'

const styles = (theme) => ({
    ...theme.spreadThis,
    root: {
        flexGrow: 1
    },
    title: {
        textAlign: 'center',
        width: "calc(100% - 96px)"
    },
    input: {
        color: '#fff'
    }
});

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

function SimpleAppBar(props) {
    const { classes } = props;
    const [{searchState}, dispatch] = useContext(GlobalContext)
    const setMenuOpen = data => {
        dispatch({type: "setMenuOpen", snippet: data });
    };
    const setSearchState = React.useCallback(
        data => {
            dispatch({type: "setSearchState", snippet: data})
        },
        [dispatch]
    );
    React.useEffect(() => {
        const changeAppBar = () => {
            const path = props.history.location.pathname;
            if (path === "/search") {
                setSearchState('searching')
            } else {
                setSearchState('home')
            }
            console.log("history change detected in app bar");
            
        }
        changeAppBar();
    }, [setSearchState, props.history]);
    
    const toggleSearch = () => {
        if(searchState === 'home') {
            return (
                <>
                    <IconButton
                        color="inherit"
                        aria-label="菜单"
                        onClick={() => setMenuOpen(true)}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        音乐play
                    </Typography>
                    <IconButton
                        onClick={() => setSearchState('clicked')}
                        color="inherit"
                        aria-label="搜索"
                    >
                        <Search />
                    </IconButton>
                </>
            )
        } else {
            //return <SearchBox />
            return (
                <span>SearchBox</span>
            )
        }
    }
    return (
        <>
            <HideOnScroll {...props}>
                <AppBar id="navbar" position="sticky">
                    <Toolbar>{toggleSearch()}</Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    )
}

export default withStyles(styles)(withRouter(SimpleAppBar))