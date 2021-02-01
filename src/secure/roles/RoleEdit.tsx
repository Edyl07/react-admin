import axios from "axios";
import React, { Component, PropsWithRef, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Permission } from "../../classes/permission";
import { Role } from "../../classes/role";
import Wrapper from "../Wrapper";

export default class RoleEdit extends Component<{ match: PropsWithRef<any> }> {
  state = {
    redirect: false,
    permissions: [],
    name: "",
    selected: [],
  };

  selected: number[] = [];
  name = "";
  id = 0;

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const roleCall = await axios.get(`roles/${this.id}`);
    const permissionCall = await axios.get("permissions");

    const role: Role = roleCall.data.data;

    this.selected = role.permissions.map((p: Permission) => p.id);

    this.setState({
      name: role.name,
      selected: this.selected,
      permissions: permissionCall.data.data,
    });
  };

  check = async (id: number) => {
    if (this.isCheked(id)) {
      this.selected = this.selected.filter((s) => s !== id);
      return;
    }
    this.selected.push(id);
};



isCheked = (id: number) => {
  return this.state.selected.filter((s) => s === id).length > 0;
}

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`roles/${this.id}`, {
      name: this.name,
      permissions: this.selected,
    });

    this.setState({
      redirect: true,
    });
  };


  render() {
    if (this.state.redirect) {
      return <Redirect to={"/roles"} />;
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
                defaultValue={this.name = this.state.name}
                onChange={(e) => (this.name = e.target.value)}
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
                      defaultChecked={this.state.selected.filter((s) => s === p.id).length > 0}
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
