import axios from "axios";
import React, { Component } from "react";

export default class ImageUpload extends Component<{value: string, imageChanged: any}> {

    image = '';

    upload = async (files: FileList | null) => {
        if (files === null) return;

        const data = new FormData();
        data.append('image', files[0]);

        const response = await axios.post('upload', data);
        this.image = response.data.url;

        this.props.imageChanged(this.image);
  }


  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          id="image"
          name="image"
          value={(this.image = this.props.value)}
          onChange={(e) => {
            this.image = e.target.value;
            this.props.imageChanged(this.image);
          }}
          className="form-control"
        />
        <div className="input-group-append">
          <label className="btn btn-primary">
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => this.upload(e.target.files)}
            />
          </label>
        </div>
      </div>
    );
  }
}
