import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import Wrapper from "../Wrapper";

export default class ProductCreate extends Component {
  state = {
    image: "",
    redirect: false,
  };

  title = "";
  title_ar = "";
  description = "";
  description_ar = "";
  image = "";
  price = 0;

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("products", {
      title: this.title,
      title_ar: this.title_ar,
      description: this.description,
      description_ar: this.description_ar,
      price: this.price,
      image: this.image,
    });

    this.setState({
      redirect: true,
    });
  };

  imageChanged = async (image: string) => {
    
    this.image = image;
    this.setState({
      image: this.image,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/products"} />;
    }
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={(e) => (this.title = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title_ar">Title Arabe</label>
            <input
              type="text"
              name="title_ar"
              id="title_ar"
              className="form-control"
              onChange={(e) => (this.title_ar = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              onChange={(e) => (this.description = e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description_ar">Description Arable</label>
            <textarea
              name="description_ar"
              id="description_ar"
              className="form-control"
              onChange={(e) => (this.description_ar = e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description">Image</label>
            <ImageUpload
              value={(this.image = this.state.image)}
              imageChanged={this.imageChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={(e) => (this.price = parseFloat(e.target.value))}
              className="form-control"
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}
