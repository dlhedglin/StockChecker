import React, { Component } from "react";
import { Line, randomColorGenerator } from "react-chartjs-2";
import axios from "axios";

class PriceChart extends Component {
  componentDidMount() {
    this.getItems();
  }

  state = {
    prices: [],
    items: [],
    data: {},
  };
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
        this.plotPrices();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getPrices = async (id) => {
    return axios({
      method: "GET",
      url: "/api/prices",
      params: {
        id: id,
      },
    }).then((res) => {
      return res.data;
    });
  };

  async plotPrices() {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let colors = [
      "#03045e",
      "#023e8a",
      "#0077b6",
      "#0096c7",
      "#00b4d8",
      "#48cae4",
      "#90e0ef",
      "#ade8f4",
      "#caf0f8",
    ];
    let data = {
      labels: [],
      datasets: [],
    };
    let timespan = -1;
    for (var i = 0; i < this.state.items.length; i++) {
      const prices = await this.getPrices(this.state.items[i]["id"]);
      timespan = Math.max(timespan, prices.length);
      for (var j = 0; j < prices.length; j++) {
        if (
          data.labels.indexOf(
            months[prices[j]["month"]] + " " + prices[j]["day"]
          ) === -1
        ) {
          data.labels.push(months[prices[j]["month"]] + " " + prices[j]["day"]);
        }
      }
    }
    for (var i = 0; i < this.state.items.length; i++) {
      const prices = await this.getPrices(this.state.items[i]["id"]);
      let dataSet = {
        label: this.state.items[i]["name"],
        data: [],
        fill: false,
        backgroundColor: colors[i % 9],
        borderColor: colors[i % 9],
        spanGaps: true,
      };
      for (var j = 0; j < timespan; j++) {
        dataSet.data.push(null);
      }
      for (var j = 0; j < prices.length; j++) {
        prices[j]["price"] === "0"
          ? (dataSet["data"][
              data.labels.indexOf(
                months[prices[j]["month"]] + " " + prices[j]["day"]
              )
            ] = null)
          : (dataSet["data"][
              data.labels.indexOf(
                months[prices[j]["month"]] + " " + prices[j]["day"]
              )
            ] = prices[j]["price"]);
      }
      console.log(dataSet["data"]);
      data["datasets"].push(dataSet);
    }
    this.setState({ data: data });
    console.log(this.state.data);
  }

  render() {
    return (
      <div>
        <Line data={this.state.data} />
      </div>
    );
  }
}

export default PriceChart;
