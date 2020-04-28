import React, {
    useContext,
    useState,
    useEffect,
    useCallback,
    Suspense,
    lazy
} from "react"

import {
    BrowserRouter as Router,
    withRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import {
    Tabs,
    Tab,
    withStyles,
    Grid,
    CircularProgress
} from '@material-ui/core'

import {
    Home,
    Favorite,
    History,
    GetApp
} from '@material-ui/icons'

import {GlobalContext} from './GlobalState'

//pages
const LoginPage = lazy(() => import("./LoginPage"))
const SearchResult = lazy(() => import("./SearchResult"))
const HomePage = lazy(() => import("./sections/HomePage"))

//custom styling the tab menus

const CustomTabs = withStyles({
    root: {
        background: "#e91e63",
        position: "fixed",
        bottom: "0",
        padding: 0,
        width: "100%",
        zIndex: 1300
    },
    indicator: {
        display: 'none'
    },
    labelIcon: {
        margin: 0
    }
})(Tabs);

const CustomTab = withStyles({
    root: {
        color: "#FFB2C1",
        fontSize: ".75rem",
        margin: 0,

        "&:hover": {
            color: "#ffffed",
            opacity: 1
        },
        "&$selected": {
            color: "#fff"
        },
        "&:focus": {
            color: "#fff"
        }
    },
    selected:{}
})(Tab);

let deferredPrompt = undefined;
let previousLocation;

window.addEventListener("beforeinstallprompt", e => {
  // Stash the event so it can be triggered later.
    deferredPrompt = e;
});

const CurrentSection = ({ history, location }) => {
    const [{currentVideoSnippet, searchResult}] = useContext(GlobalContext)
    console.log(currentVideoSnippet);
    
    const [songsHistoryState, setSongsHistory] = useState([]);
    const [songsLikedState, setSongsLiked] = useState([]);
    const [songsDownloadedState, setSongsDownloaded] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const [redirectState, setRedirectState] = useState(null);

    const circularLoader = (
        <Grid
            style={{height: "100vh"}}
            container
            justify="center"
            alignItems="center"
        >
            <CircularProgress/>
        </Grid>
    )
    
    const checkPrevLocation = () => {
        if(location.pathname === "/play") {
            return previousLocation;
        } else {
            return location;
        }
    }
    const continueToHome = () => {
        localStorage.setItem("isThisNew", "no");
        history.replace("/home")

        if(deferredPrompt){
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if(choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS');
                } else {
                    console.log("User dismissed the A2HS prompt");
                    
                }
                deferredPrompt = null;
            })
        }
    }
    return (
        <div>
            <Suspense fallback={circularLoader}>
                <Switch location={checkPrevLocation()}>
                    <Route
                        exact
                        path="/"
                        render={props => {
                            return <LoginPage continueToHome={continueToHome} />
                        }}
                    />
                    <Route 
                        path="/search"
                        render={props=> <SearchResult videos={searchResult} />}
                    />
                    <Route
                        path="/home"
                        render={props => {
                            // setTabValue(0);
                            return <HomePage/>
                        }}
                    />
                </Switch>
            </Suspense>
        </div>
    )

}

export default withRouter(CurrentSection)