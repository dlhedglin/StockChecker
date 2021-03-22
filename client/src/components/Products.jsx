import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ProductList from "./ProductList"

class Products extends Component {
  state = {
    products: null,
  };
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/api/products",
    })
      .then((res) => {
        console.log(res);
        this.setState({
          products: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteProduct(id) {
    axios({
      method: "POST",
      withCredentials: true,
      url: "/api/delete",
      data: {
        id: id
      }
    })
      .then((res) => {
        this.fetchProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
          <ProductList/>
      </div>
    );
  }
}

export default Products;
