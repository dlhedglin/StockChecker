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
      prices: {
        labels: [],
        datasets: [
          {
            label: "# of Votes",
            data: [],
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
    };

    this.getItems = this.getItems.bind(this);
  }
  componentDidMount () {
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
        for(var i = 0; i < res.data.length; i++){
          res.data[i]["url"].length > 50 ? res.data[i]["url"] = res.data[i]["url"].substr(0, 49) + "..."  : res.data[i]["url"] = res.data[i]["url"]
        }
        console.log(res.data)
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
        <Tables
          items={this.state.items}
          prices={this.state.prices}
          getItems={this.getItems}
          getPrices={this.getPrices}
        />
      </div>
    );
  }
}

export default App;
