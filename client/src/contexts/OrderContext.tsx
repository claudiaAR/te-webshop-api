import React, { createContext, Component } from "react";


const apiURL = "http://localhost:9000/api/";
const orderURL = "http://localhost:9000/api/orders/";

interface Props { }
interface State {
    // loggedIn: Boolean,
    // admin: Boolean,

    // name: String,

    // textLogger: (text: String) => void
    // loginUser: (text: String, closeModal: () => void, errCb: (error: boolean, anchor: string) => void) => void
    // logOut: () => void
    getAllOrders: () => any
}

export const OrderContext = createContext<State>({
    // loggedIn: false,
    // admin: false,

    // name: "",

    // textLogger: () => { },
    // loginUser: () => { },
    // logOut: () => { },
    getAllOrders: () => { },


});

export class OrderContextProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        // not true state, this i template
        this.state = {
            // loggedIn: false,
            // admin: false,
            // name: "Halvdan",

            // textLogger: this.textLogger,
            // loginUser: this.loginUser,
            // logOut: this.logOut
            getAllOrders: this.getAllOrders
        }
    }

    // textLogger = (text: String): void => {
    //     console.log(text);
    // }


    // // getUser

    // loginUser = async (user: any, closeModal: () => void, errCb: (error: boolean, anchor: string) => void) => {
    //     console.log("logging in");

    //     // Create a session
    //     await fetch(orderURL + "/login", {
    //         method: "POST",
    //         credentials: 'include',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: user.name,
    //             password: user.password
    //         }),
    //     }).then((response) => {
    //         return response.json()
    //     }).then((data) => {
    //         if (!data.err) closeModal()
    //         else {
    //             errCb(true, "login")
    //         }
    //         this.setUserInState(data)
    //     })
    // }

    // logOut = async () => {
    //     await fetch(orderURL + "/logout", {
    //         method: "DELETE",
    //         credentials: 'include'
    //     }).then((response) => {
    //         return response.json()
    //     }).then((data) => {
    //         this.setUserInState({
    //             err: {
    //                 msg: ""
    //             }
    //         })
    //     })
    // }


    // async componentDidMount() {

    //     let user = await fetch(orderURL, {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //         .then((response) => {
    //             console.log(response);
    //             return response.json()
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             return data
    //         })

    //     console.log(user);
    //     this.setUserInState(user)
    // }

    // async setUserInState(user: any) {
    //     console.log(user);

    //     if (user.err) console.log(user.err);

    //     if (user && !user.err) {
    //         this.setState({
    //             loggedIn: true,
    //             admin: user.admin,
    //             name: user.name
    //         }, () => console.log("logged in", this.state)
    //         )
    //     } else {
    //         this.setState({
    //             loggedIn: false,
    //             admin: false,
    //             name: ""
    //         }, () => console.log("not logged in", this.state)
    //         )
    //     }
    // }
    async componentDidMount(){
        const data = await this.getAllOrders()
        console.log("from mount")
        console.log(data)
    }


    getAllOrders = async () => {
        const order = await fetch(orderURL, {
            method: "GET",
            credentials: "include"
        })
        const data = await order.json()
        console.log(data)
        return(data)
        // await fetch(orderURL, {
        //     method: "GET",
        //     credentials: 'include'
        // }).then((response) => {
        //     return response.json()
        // }).then((data)=> {
        //     // this.setUserInState({
        //     //     err: {
        //     //         msg: ""
        //     //     }
        //     // })
        //     console.log("from getAllOrders.")
        //     console.log(data)
        //     return data
        // })
    }


    render() {
        return (
            <OrderContext.Provider value={this.state}>
                {this.props.children}
            </OrderContext.Provider>
        );
    }
}

export default OrderContextProvider;