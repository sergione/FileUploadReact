import React, { Component } from 'react';
import FileUpload from './FileUpload/FileUpload';

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
        />
      </div>
      
    );
  }
}
