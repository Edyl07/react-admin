import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Product } from "../../classes/product";
import { User } from "../../classes/user";
import Deleter from "../components/Deleter";
import Paginator from "../components/Paginator";
import Wrapper from "../Wrapper";

class Products extends Component<{user: User}> {
  state = {
    products: [],
  };

  page = 1;
  last_page = 0;

  componentDidMount = async () => {
    const response = await axios.get(`products?page=${this.page}`);
    this.setState({
      products: response.data.data,
    });

    this.last_page = response.data.meta.last_page;
  };

  handlePageChange = async (page: number) => {
    this.page = page;
    await this.componentDidMount();
  }

  handleDelete = async (id: number) => {
      this.setState({
        products: this.state.products.filter((r: Product) => r.id !== id),
      });
  };

  actions = (id: number) => {
    if (this.props.user.canEdit("products")) {
      return (
        <div className="btn-group mr-2">
          <Link
            to={`/products/${id}/edit`}
            className="btn btn-sm btn-outline-warning"
          >
            Edit
          </Link>
          <Deleter
            id={id}
            endpoint={"products"}
            handleDelete={this.handleDelete}
          />
        </div>
      );
    }
  };

  render() {
    let addButton = null;

    if (this.props.user.canEdit("products")) {
      addButton = (
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrpa align-items-center pt-3 pb-3 mb-3 border-bottom">
            <div className="btn-toolbar mb-2 mb-md-0">
              <Link
                to={"/products/create"}
                className="btn btn-sm btn-outline-secondary"
              >
                Add
              </Link>
            </div>
          </div>
      );
    }
    return (
      <Wrapper>
        {addButton}
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product: Product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img src={product.image} alt="" width={"50"} />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      {this.actions(product.id)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Paginator lastPage={this.last_page}  handlePageChange={this.handlePageChange} />
      </Wrapper>
    );
  }
}

// @ts-ignore
export default connect((state) => ({ user: state.user }))(Products);