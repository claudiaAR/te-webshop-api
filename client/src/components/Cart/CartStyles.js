import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
        background: "#E0CBAB",
        transition: ".22s ease-in-out",
        '& path': {
            color: "#fff"
        },
        '&:hover': {
            background: "#E6B46A"
        }
    },
    relativeContainer: {
        width: "100%",

        position: 'relative',

        [theme.breakpoints.down(510)]: {
        }

    }
}));

export default useStyles;
