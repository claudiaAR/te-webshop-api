import React, { CSSProperties } from 'react'
import Header from '../Header/Header';
import Home from '../home/Home';
import Footer from '../Footer/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProductPage from '../ProductPage/ProductPage';
import AdminLayout from '../admin/AdminLayout';
import CheckoutWrapper from '../checkout/CheckoutWrapper';

import { Container } from '@material-ui/core';
import useStyles from "./LayoutStyles"


//CONTEXTS
import { UserContext } from "../../contexts/UserContext"
import { ProductContext } from "../../contexts/ProductContext"
import { CartContext } from '../../contexts/CartContext';
import { OrderContext } from '../../contexts/OrderContext';

const Layout = () => {
    const classes = useStyles()

    return (
        <OrderContext.Consumer>
            {(orderContext) => (
                <CartContext.Consumer>
                    {(cartContext) => (
                        <ProductContext.Consumer>
                            {(productContext) => (
                                <UserContext.Consumer>
                                    {userContext => (
                                        <BrowserRouter>

                                            <Header />
                                            <Container className={classes.root}>


                                                <Switch>
                                                    <Route exact path="/">
                                                        <Home productContext={productContext} userContext={userContext} />
                                                    </Route>
                                                    <Route exact path="/admin">
                                                        <AdminLayout userContext={userContext} orderContext={orderContext} />
                                                    </Route>
                                                    <Route path="/checkout">
                                                        <CheckoutWrapper />
                                                    </Route>
                                                    <Route exact path="/product">
                                                        <div><h2>Select a product</h2></div>
                                                    </Route>
                                                    <Route path="/product/:id">
                                                        <ProductPage
                                                            productContext={productContext}
                                                            cartContext={cartContext}
                                                        />
                                                    </Route>
                                                </Switch>


                                            </Container>
                                            <Footer />
                                        </BrowserRouter>

                                    )}
                                </UserContext.Consumer>
                            )}
                        </ProductContext.Consumer>
                    )}
                </CartContext.Consumer>
            )}
        </OrderContext.Consumer>
    );
}

export default Layout;