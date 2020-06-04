import React, { useEffect } from "react";

// STYLES
import useStyles from "./homeStyles";

// COMPONENTS
import ProductCard from "./ProductCard";
import TextMobileStepper from "./TextMobileStepper";

// INTERFACES
import { Product } from "../../interfaces/interfaces";

// MATERIAL UI
import { Grid, Container, Button, Typography } from "@material-ui/core/";
import { Redirect } from "react-router-dom";

interface Props {
  productContext: any;
  userContext: any;
}

export default function Home(props: Props) {
  const classes = useStyles();

  const [products, setProducts] = React.useState<[]>([]);

  const [filter, setFilter] = React.useState<String>("");

  const handleSetFilter = (x: String) => {
    setFilter(x);
  };

  const getProducts = async () => {
    setProducts(await props.productContext.fetchProducts(filter));
  };

  useEffect(() => {
    getProducts()
    console.log(filter)
  }, [filter]);

  return (
    <>
      <TextMobileStepper />
      {/* <Typography>Kategorier</Typography> */}
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.categoriesBar}
      >
        {/* <Typography>Kategorier</Typography> */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleSetFilter("")}
        >
          Alla Kategorier
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleSetFilter("svart")}
        >
          Svart te
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleSetFilter("grönt")}
        >
          Grönt te
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleSetFilter("vitt")}
        >
          Vitt te
        </Button>
        <Button variant="outlined" color="secondary">
          Koffeinfritt te
        </Button>
      </Grid>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.productContainer}
        >
          {products.length > 0 ? (
            products.map((product: Product, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <ProductCard
                  product={product}
                  productContext={props.productContext}
                />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography>Loading products</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
