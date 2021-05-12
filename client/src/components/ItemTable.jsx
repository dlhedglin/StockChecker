import React, { Component } from "react";
import { Table, Button, Form, Spinner, Col, Row, Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import axios from "axios";
import PriceChart from "./PriceChart";

const { SearchBar, ClearSearchButton } = Search;

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.state = {
      autoRef: false,
      selected: [],
      name: "",
      url: "",
      keyword: "",
      refreshing: false,
      uploading: false,
      columns: [
        {
          dataField: "id",
          text: "Id",
          sort: true,
        },
        {
          dataField: "name",
          text: "Name",
          sort: true,
        },
        {
          dataField: "url",
          text: "Url",
          sort: true,
        },
        {
          dataField: "keyword",
          text: "Keyword",
        },
        {
          dataField: "in_stock",
          text: "In Stock?",
        },
      ],
    };
  }
  handleBtnClick = () => {
    this.deleteItem(this.state.selected);
  };

  handleOnSelect = (row, isSelect) => {
    console.log(row.id);
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.id],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.id),
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }));
    } else {
      this.setState(() => ({
        selected: [],
      }));
    }
  };

  addItem() {
    this.setState({
      uploading: true,
    });
    axios({
      method: "POST",
      url: "/api/create",
      data: {
        name: this.state.name,
        url: this.state.url,
        keyword: this.state.keyword,
      },
    }).then(() => {
      this.props.getItems();
      this.setState({
        name: "",
        url: "",
        keyword: "",
        uploading: false,
      });
    });
  }

  updateItems() {
    if (this.state.refreshing) {
      return;
    }
    this.setState({ refreshing: true, items: [] });
    axios({
      method: "GET",
      withCredentials: true,
      url: "/api/query",
    })
      .then((res) => {
        this.props.getItems();
        this.setState({ refreshing: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteItem(ids) {
    axios({
      method: "POST",
      withCredentials: true,
      url: "/api/delete",
      data: {
        id: this.state.selected,
      },
    })
      .then((res) => {
        this.setState({ selected: [] });
        this.props.getItems();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  startAutoRefresh = () => {
    this.intervalID = setInterval(() => {
      this.updateItems();
    }, 10000);
    this.setState({ autoRef: true });
  };

  stopAutoRefresh = () => {
    clearInterval(this.intervalID);
    this.setState({ autoRef: false });
  };

  changeAutoRefresh = () => {
    if (!this.state.autoRef) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  };

  render() {
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
    };
    return (
      <div>
        <ToolkitProvider
          keyField="id"
          data={this.props.items}
          columns={this.state.columns}
          search
          bootstrap4
        >
          {(props) => (
            <div>
              <Card body>
                <Form id="myForm">
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Url"
                        onChange={(e) => this.setState({ url: e.target.value })}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Keyword"
                        onChange={(e) =>
                          this.setState({ keyword: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      {this.state.uploading ? (
                        <Button>
                          <Spinner animation="border" />
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            this.addItem();
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Card>
              <Card body>
                <Row className="justify-content-md-center">
                  <Col>
                    <SearchBar {...props.searchProps} />
                  </Col>
                  <Col>
                    <ClearSearchButton
                      className="btn-primary"
                      {...props.searchProps}
                    />
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={this.handleBtnClick}>
                      Delete Selected
                    </Button>
                    {this.state.refreshing ? (
                      <Button>
                        <Spinner animation="border" />
                      </Button>
                    ) : (
                      <Button
                        className=""
                        variant="primary"
                        onClick={() => {
                          this.updateItems();
                        }}
                      >
                        Refresh
                      </Button>
                    )}

                    {!this.state.autoRef ? (
                      <Button
                        variant="success"
                        onClick={this.changeAutoRefresh}
                      >
                        Start Auto Refresh
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={this.changeAutoRefresh}>
                        Stop Auto Refresh
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card>

              <BootstrapTable {...props.baseProps} selectRow={selectRow} />
            </div>
          )}
        </ToolkitProvider>
        <PriceChart key={this.props.prices} prices={this.props.prices} getPrices={this.props.getPrices}/>
      </div>
    );
  }
}

export default ItemTable;
