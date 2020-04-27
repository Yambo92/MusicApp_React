import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import {
    InputBase,
    IconButton,
    Popper,
    CircularProgress,
    Grid
} from '@material-ui/core'

import { ArrowBack } from '@material-ui/icons'

const SearchBox = ({ history, locaiton}) => {

    return (
        <>
            <IconButton
                onClick={() => {

                }}
                color="inherit"
                aria-label="菜单"
            >
                <ArrowBack/>
            </IconButton>
        </>
    )
}
