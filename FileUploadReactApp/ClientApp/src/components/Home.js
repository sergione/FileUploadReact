import React, { Component } from 'react';
import FileUpload from './FileUpload/FileUpload';
import toastr from "toastr";
import {Glyphicon} from "react-bootstrap";

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <div>
        <br/>
        <FileUpload 
          maxFiles={2} 
          uploadOnDrop={true}
          endpoint='/api/SampleData/upload'
          onComplete={file => toastr.success(file.name)}
          onCompleteAll={() => toastr.success("All uploads completed")}
          maxSize={100}
          accept="pdf">
          <div>
            <Glyphicon glyph="cloud-upload"/><br/>
            Please drop files here or click to select files.<br/>
            Max size: 100MB. Max files: 2. Accepted Files: pdf
          </div>
        </FileUpload>
      </div>
      
    );
  }
}
