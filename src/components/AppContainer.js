import React, { useState, useContext, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { GlobalContext } from './GlobalState'
//components
import SimpleAppBar from './header/SimpleAppBar'
import SwipeMenu from './SwipeMenu'
//mui Stuff
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'


const body = document.querySelector('body')

const defaultTheme = {
    palette: {
        primary: pink,
        secondary: {
            main: '#fafafa'
        }
    },
    spreadThis: {

    }
}

const darkTheme = {
    palette: {
      type: "dark",
      primary: pink,
      secondary: {
        main: "#fafafa"
      }
    },
   spreadThis: {
        
    }
  };

  const muiDefaultTheme = createMuiTheme(defaultTheme)
  const muiDarkTheme = createMuiTheme(darkTheme)

  const AppContainer = () => {//因为globalState 是个数组
    const [{themeSelectValue}, dispatch] = useContext(GlobalContext)

    useEffect(() => {
        if(navigator.userAgent.match(/Android/i)) {
            body.style.overscrollBehavior = "none"
            // this is to disable pull refresh on android
        }
    }, [])

    return (
        <MuiThemeProvider
            theme={themeSelectValue === 'Dark' ? muiDarkTheme : muiDefaultTheme}
        >
            <Router>
                <SimpleAppBar/>
                <SwipeMenu />
            </Router>
        </MuiThemeProvider>
    )
  }

  export default AppContainer;