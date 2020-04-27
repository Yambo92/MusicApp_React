import React, {useState, useContext, useEffect, useCallback } from 'react'

import {
    SwipeableDrawer,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link as MaterialLink /*MaterialLink相当于a标签，一般都有href属性， 如果没有href属性则需指定属性component={button}  */
} from '@material-ui/core'

import {
    Feedback,
    Info,
    FreeBreakfast,
    People,
    Settings
} from '@material-ui/icons'

import { motion, AnimatePresence } from 'framer-motion'

import { Link } from 'react-router-dom'

import { GlobalContext } from './GlobalState'

import "./darkMode.css"

import moon from "../images/moon-solid.svg";
import sun from "../images/sun-solid.svg";

const SwipeMenu = () => {
    const [{ menuOpen, themeSelectValue }, dispatch] = useContext(GlobalContext)
    /* 
    UseCallback
This is a special case for memoizing functions. Since javascript compares equality by reference, 
the function you create the first time a component renders will be different than the one created in 
subsequent renders.

If you try passing a function as props or state,
 this means that it will be treated as a prop change every single time. 
 By wrapping it in useCallback, React will know that it's the same function. 
 You can still add a dependency array to trigger a recalculation if the dependencies change.
A strong use-case here to avoid child component re-renders
    */
    const setThemeSelectValue = useCallback(
        (data) => {
            dispatch({ type: "setThemeSelectValue", snippet: data})
        },
        [dispatch],//dispatch 是store的一个方法： store.dispatch
    )              //当store发生改变的时候 dispatch就会发生改变，可以作为依赖

    const setMenuOpen = data => {
        dispatch({ type: "setMenuOpen", snippet: data })
    };

    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        if(themeSelectValue === 'Dark') {
            setIsNight(true)
        } else {
            setIsNight(false)
        }
    }, [themeSelectValue]);

    const changeTheme = theme => {
        setThemeSelectValue(theme);
        localStorage.setItem("selectedTheme", theme)
    }

    const handleThemeToggle = () => {
        if(!isNight){
            changeTheme('Dark')
            setIsNight(false)
        } else {
            changeTheme("Default")
            setIsNight(true)
        }
    }
    return (
        <SwipeableDrawer
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onOpen={() => setMenuOpen(true)}
        >
            <div style={{ width: '300px'}}>
                <div
                    style={{
                        margin: '35px',
                        position: 'relative',
                        width: '30px',
                        height: '30px'
                    }}
                >
                    <AnimatePresence>
                        <motion.img
                            key={isNight ? sun : moon}
                            initial={{ scale: 0}}
                            animate={{scale:1.5, rotate: "360deg"}}
                            exit={{scale:0}}
                            src={isNight ? sun : moon}
                            onClick={() => handleThemeToggle()}
                            className="dayNightToggleBtn"
                            alt="sun moon icon"
                        />
                    </AnimatePresence>
                </div>
                <Divider/>
                <List
                    component="nav"
                    className={"pinkLists"}
                    onClick={() => setMenuOpen(false)}
                >
                    <ListItem button component={Link} to="/settings">
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="设置" />
                    </ListItem>
                    <ListItem button component={Link} to="/feedback">
                        <ListItemIcon>
                            <Feedback/>
                        </ListItemIcon>
                        <ListItemText primary="反馈"/>
                    </ListItem>
                    <ListItem button component={Link} to="/donate">
                        <ListItemIcon>
                            <FreeBreakfast/>
                        </ListItemIcon>
                        <ListItemText primary="捐赠&支持"/>
                    </ListItem>
                    <ListItem button component={Link} to="/contributors">
                        <ListItemIcon>
                            <People/>
                        </ListItemIcon>
                        <ListItemText primary="贡献者"/>
                    </ListItem>
                    <ListItem
                        button
                        componetnt={MaterialLink}
                        rel ="noopener"
                        target="_blank"
                        href="#"
                    >
                        <ListItemIcon>
                            <svg
                                width="24"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="github"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 496 512"
                                fill="#e91e63"
                            >
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary="Github"/>
                    </ListItem>
                    <ListItem button component={Link} to="/privacy">
                        <ListItemIcon>
                            <Info/>
                        </ListItemIcon>
                        <ListItemText primary="Privacy & Policy" />
                    </ListItem>
                </List>
            </div>
        </SwipeableDrawer>
    )
}

export default SwipeMenu;