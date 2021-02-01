import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Product } from "../../classes/product";
import ImageUpload from "../components/ImageUpload";
import Wrapper from "../Wrapper";

export default class ProductEdit extends Component<{match: any}> {
  state = {
    title : "",
    title_ar : "",
    description : "",
    description_ar : "",
    image: "",
    price : 0,
    redirect: false,
  };

  id = 0;
  title = "";
  title_ar = "";
  description = "";
  description_ar = "";
  image = "";
  price = 0;

  componentDidMount = async () => {
      this.id = this.props.match.params.id;
      const response = await axios.get(`products/${this.id}`);
      const product: Product = response.data.data;

      this.setState({
          title: product.title,
          title_ar: product.title_ar,
          description: product.description,
          description_ar: product.description_ar,
          image: product.image,
          price: product.price,
      })
  }

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`products/${this.id}`, {
      title: this.state.title,
      title_ar: this.state.title_ar,
      description: this.state.description,
      description_ar: this.state.description_ar,
      price: this.state.price,
      image: this.state.image,
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
              defaultValue={this.state.title}
              onChange={(e) => (this.setState({
                  title: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title_ar">Title Arabe</label>
            <input
              type="text"
              name="title_ar"
              id="title_ar"
              className="form-control"
              defaultValue={this.state.title_ar}
              onChange={(e) => (this.setState({
                  title_ar: e.target.value
              }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              defaultValue={this.state.description}
              onChange={(e) => (this.setState({
                  description: e.target.value
              }))}
            >

            </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description_ar">Description Arabe</label>
            <textarea
              name="description_ar"
              id="description_ar"
              className="form-control"
              defaultValue={this.state.description_ar}
              onChange={(e) => (this.setState({
                  description_ar: e.target.value
              }))}
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
              value={this.state.price}
              onChange={(e) => {
                this.setState({
                    price: e.target.value
                });
              }}
              className="form-control"
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </Wrapper>
    );
  }
}
