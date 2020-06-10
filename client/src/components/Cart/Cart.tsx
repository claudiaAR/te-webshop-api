import React, { useState, CSSProperties } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// MATERIAL UI
import { IconButton, Button, Typography, makeStyles, Theme } from '@material-ui/core'


// ICONS
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

// COMPONENTS
import ShoppingCart from '../ShoppingCart'
import LoginModal from "../LoginModal/LoginModal"



import { CartItem } from '../../interfaces/interfaces'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useStyles from "./CartStyles"


interface Props {
    cartState: any
    userContext: any
}



export function Cart(props: Props) {

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

    const cart = <div className={classes.cart}>

        {props.cartState.cartList.length === 0 ?
            <Typography variant="h6" color="primary" style={{ margin: '1rem' }}>Kundvagnen&nbsp;är&nbsp;tom</Typography> : <>
                <ShoppingCart cartContext={props.userContext} />

                {props.userContext.loggedIn ?
                    <Button
                        onClick={() => props.cartState.toggleCartVisibility()}
                        component={RouterLink} to={props.userContext.loggedIn ? '/checkout' : ""}
                        variant="contained"
                        color="primary" >
                        gå till kassan
                        </Button>
                    :
                    <LoginModal userContext={props.userContext} buttonHandle="logga in för att gå till kassan" />
                }
            </>}
    </div>

    return (
        <div className={classes.relativeContainer}>
            <IconButton
                className={classes.cartIcon}
                // color="secondary"
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