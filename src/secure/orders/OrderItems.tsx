import axios from "axios";
import React, { Component } from "react";
import { Order } from "../../classes/orders";
import { OrderItem } from "../../classes/order_item";
import Wrapper from "../Wrapper";

export default class OrderItems extends Component<{ match: any }> {
  state = {
    order_items: [],
  };

  id = 0;

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const response = await axios.get(`orders/${this.id}`);

    const order: Order = response.data.data;

    this.setState({
      order_items: order.order_items,
    });
  };

  render() {
    return (
      <Wrapper>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.state.order_items.map((order_items: OrderItem) => {
                return (
                  <tr key={order_items.id}>
                    <td>{order_items.id}</td>
                    <td>
                      {order_items.product_title}
                    </td>
                    <td>{order_items.price}</td>
                    <td>{order_items.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}
