import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Permission } from "../../classes/permission";
import Wrapper from "../Wrapper";

export default class RoleCreate extends Component {
  state = {
    redirect: false,
    permissions: [],
  };

  selected: number[] = [];
  name = '';

  componentDidMount = async () => {
    const response = await axios.get("permissions");

    this.setState({
      permissions: response.data.data,
    });
  };

  check = async (id: number) => {
    if (this.selected.filter((s) => s === id).length > 0) {
      this.selected = this.selected.filter((s) => s !== id);
      return;
    }
    this.selected.push(id);
  };

  submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      await axios.post('roles', {
        name: this.name,
        permissions: this.selected
      });

      this.setState({
          redirect: true
      });
      
  }

  render() {
      if(this.state.redirect){
          return <Redirect to={'/roles'} />;
      }

    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={ e => this.name = e.target.value}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="permissions" className="col-sm-2 col-form-label">
              Permissions
            </label>
            <div className="col-sm-10">
              {this.state.permissions.map((p: Permission) => {
                return (
                  <div
                    className="form-check form-check-inline col-3"
                    key={p.id}
                  >
                    <input
                      type="checkbox"
                      name="permissions"
                      id="permissions"
                      className="form-check-input"
                      value={p.id}
                      onChange={(e) => this.check(p.id)}
                    />
                    <label className="form-check-label">{p.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}
