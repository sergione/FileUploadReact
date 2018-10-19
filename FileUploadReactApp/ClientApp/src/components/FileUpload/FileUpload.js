import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Files from './Files';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import toastr from 'toastr';

const StyledFileUpload = styled.div`
  width: 400px;
  height: 200px;
`;

const dropzoneStyle = {
  width: "400px",
  height: "200px", 
  display: "table-cell",
  verticalAlign: "middle",
  border: "2px dashed #CCC"};

const dropzoneMessageStyle = {
  textAlign: "center", 
  display: "inline-cell", 
  margin: "10px"  
};

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      progress: [] ,
      uploadComplete: false
    }
  }
  
  handleDrop = (files) => {
    if (this.props.maxFiles && this.props.maxFiles < files.length){
      toastr.error(`Please drop ${this.props.maxFiles} files or less. You dropped ${files.length} files!`)
      return;
    }
    
    let progress = Array(files.length).fill(0);
    this.setState({files, progress}, this.props.uploadOnDrop
      ? this.handleUpload
      : () => {}
    );
  };
  
  handleUpload = () => {
    for (let i = 0; i < this.state.files.length; i++) {
      let data = new FormData();
      data.append('file', this.state.files[i]);
      
      const config = {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          let progress = this.state.progress.slice();
          progress[i] = percentCompleted;
          if (percentCompleted === 100) {
            toastr.success(`${this.state.files[i].name} upload complete.`)
          }
          this.setState({progress}, this.isUploadComplete);
        }
      };
      
      axios.put(this.props.endpoint, data, config);
    }
  };
  
  isUploadComplete = () => {
    if (this.state.progress.every(x => x === 100)) {
      this.setState({uploadComplete: true});
      toastr.success("All files uploaded successfully!");
    }  
  };
  
  render() {
    return <StyledFileUpload>
      <Dropzone 
        style={dropzoneStyle} 
        className=""
        onDrop={this.handleDrop}
      >
        <div style={dropzoneMessageStyle}>Please drop files here or click to select files</div>
      </Dropzone>
      <br/>
      {this.props.showFiles && <div>
        <Files 
          files={this.state.files} 
          progress={this.state.progress} />
        {this.state.files.length > 0 && !this.props.uploadOnDrop &&<Button onClick={this.handleUpload}>Upload</Button>}
      </div>}  
    </StyledFileUpload>;
  }
}

FileUpload.propTypes = {
  maxFiles: PropTypes.number,
  uploadOnDrop: PropTypes.bool,
  showFiles: PropTypes.bool,
  endpoint: PropTypes.string.isRequired
};

FileUpload.defaultProps = {
  maxFiles: 15,
  uploadOnDrop: true,
  showFiles: true
};

export default FileUpload;