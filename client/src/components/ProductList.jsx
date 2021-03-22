import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar, ClearSearchButton } = Search;

class ProductList extends Component {
  render() {
    return (
      <div>
        <ToolkitProvider
          keyField="id"
          data={this.props.items}
          columns={this.props.columns}
          search
          bootstrap4
        >
          {(props) => (
            <div>
              <SearchBar {...props.searchProps} />
              <ClearSearchButton {...props.searchProps} />
              <BootstrapTable {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>URL</th>
              <th>Keyword</th>
              <th>In Stock?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.items ? (
              this.props.items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.url}</td>
                    <td>{item.keyword}</td>
                    <td>{item.in_stock.toString()}</td>
                    <td><Button variant="secondary" onClick={()=>{
                      this.props.deleteItem(item.id);
                    }}>X</Button></td>
                  </tr>
                );
              })
            ) : (
              <div>no data</div>
            )}
          </tbody>
        </Table> */}
      </div>
    );
  }
}

export default ProductList;
