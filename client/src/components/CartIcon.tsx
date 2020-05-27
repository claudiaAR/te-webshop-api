import React, { useState, CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// MATERIAL UI
import { IconButton, Button, Typography, makeStyles, Theme } from '@material-ui/core'


// ICONS
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

// COMPONENTS
import ShoppingCart from './ShoppingCart'
import LoginModal from "./LoginModal/LoginModal"


import { CartContext } from '../contexts/cartContext'

import { UserContext } from "../contexts/UserContext"


import { CartItem } from '../typings'

import useMediaQuery from '@material-ui/core/useMediaQuery'


interface Props {
    cartState: any
}


const useStyles = makeStyles((theme: Theme) => ({
    cart: {
        position: "absolute",
        right: "100%",
        top: "100%",

        padding: ".5rem",

        background: "#eaeaea",
        borderRadius: ".2rem",
        [theme.breakpoints.down(510)]: {
        }
    },
    cartIcon: {
    },
    relativeContainer: {
        width: "100%",

        position: 'relative',

        [theme.breakpoints.down(510)]: {
        }

    }
}))

export function CartIcon(props: Props) {

    const classes = useStyles()

    const [loggedIn, setLoggedIn] = useState(false)

    // const [isCartShown, setToggled] = useState(false)
    // const handleOnClick = () => setToggled(!isCartShown)

    function TotalProductCount(cartList: Array<CartItem>) {
        let totalCount = 0
        for (const item of cartList) {
            totalCount += item.nrItems
        }
        return totalCount
    }

    let screenSize = useMediaQuery('(min-width:430px)')
    let divSize = { width: '18.5rem' }
    if (screenSize === true) {
        divSize = { width: '25rem' }
    }

    const cart = <UserContext.Consumer>
        {(user: any) => (

            <div className={classes.cart}>

                {props.cartState.cartList.length === 0 ?
                    <Typography variant="h6" color="primary" style={{ margin: '1rem' }}>Kundvagnen&nbsp;är&nbsp;tom</Typography> : <>
                        <ShoppingCart />
                        {loggedIn ?
                            <Button
                                component={RouterLink} to='/checkout'
                                variant="contained"
                                color="primary"
                            >
                                gå till kassan
                        </Button>
                            :
                            <LoginModal userContext={user} cancelTimeout={props.cartState.setCartVisibility} />
                        }
                    </>}
            </div>
        )}
    </UserContext.Consumer>

    return (
        <div className={classes.relativeContainer}>
            <IconButton
                className={classes.cartIcon}
                color="secondary"
                style={{ border: 'solid #9cba98 0.1em' }}
                onClick={() => props.cartState.toggleCartVisibility()}>

                {props.cartState.cartList.length === 0 ?
                    <LocalCafeIcon fontSize="small" color="secondary" /> :
                    <EmojiFoodBeverageIcon fontSize="small" color="secondary" />
                }
            </IconButton>
            {props.cartState.showCart ? cart : null}
        </div >
    )
}

const numberOfOrders: CSSProperties = {
    border: '0.1em solid #9cba98',
    height: '1.5em',
    width: '1.5em',
    borderRadius: '2em',
    textAlign: 'center',
    color: '#9cba98',
    position: 'relative',
    backgroundColor: '#346933',
    top: '-1.5em',
}


const shoppingCartContainer: CSSProperties = {
    position: 'absolute',
    right: 0,
    top: "4rem",
    zIndex: 1000,

    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const clickAwayDiv: CSSProperties = {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 0,

    width: '100vw',
    height: '100vh',
}