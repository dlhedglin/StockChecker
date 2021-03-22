import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import ProductList from "./components/ProductList";
import Tables from "./components/Tables";
import ItemTable from "./components/ItemTable";
// import Nav from "./components/Nav";
import { Container } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import {
  Form,
  Button,
  Spinner,
  Col,
  Row,
  Navbar,
  Nav,
  Card,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar, ClearSearchButton } = Search;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.getItems = this.getItems.bind(this);
  }
  componentDidMount() {
    this.getItems();
    this.setState();
  }

  getItems() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/api/products",
    })
      .then((res) => {
        this.setState({
          items: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Tables items={this.state.items} getItems={this.getItems} />
      </div>
    );
  }
}

export default App;