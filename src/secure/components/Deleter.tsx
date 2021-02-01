import axios from "axios";
import React, { Component } from "react";

export default class Deleter extends Component<{id: number, endpoint: string, handleDelete: any}> {

    delete = async () => {
        if (window.confirm("Are you sure you want to delete this record??")) {
          await axios.delete(`${this.props.endpoint}/${this.props.id}`);
    
          this.props.handleDelete(this.props.id);
        }
      };

  render() {
    return (
      <div>
        <a
          onClick={() => this.delete()}
          className="btn btn-sm btn-outline-danger"
        >Delete</a>
      </div>
    );
  }
}
