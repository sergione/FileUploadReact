import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Files from './Files';
import axios from 'axios';
import toastr from 'toastr';
import SafeDropzone from "./SafeDropzone";

const StyledFileUpload = styled.div`
  width: 400px;
  height: 200px;`;

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      progress: [] ,
      uploadComplete: false,
      uploadInProgress: false
    }
  }
  
  handleDrop = (files) => {
    if (this.props.maxFiles && this.props.maxFiles < files.length){
      toastr.error(`Please drop ${this.props.maxFiles} files or less. You dropped ${files.length} files!`);
      return;
    }
    const maxFileSize = this.props.maxSize * 1024 * 1024;            
    let acceptedFiles = files.filter(f => f.size <= maxFileSize);
        
    if (this.props.accept) {
      const acceptedFileTypes = this.props.accept.split(',');
      const isAccepted = (name) => {
        const acceptedTypes = acceptedFileTypes.filter(f => name.endsWith(f));
        return acceptedTypes.length > 0;
      };
      acceptedFiles = acceptedFiles.filter(f => isAccepted(f.name));
    }
    
    if (acceptedFiles.length === 0) return;
    
    let progress = Array(acceptedFiles.length).fill(0);
    this.setState({files: acceptedFiles, progress: progress}, this.props.uploadOnDrop
      ? this.handleUpload
      : () => {}
    );
  };
  
  handleUpload = () => {
    this.setState({uploadInProgress: true});
    for (let i = 0; i < this.state.files.length; i++) {
      let data = new FormData();
      data.append('file', this.state.files[i]);
      
      const config = {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          let progress = this.state.progress.slice();
          progress[i] = percentCompleted;
          this.setState({progress}, () => {
            if (progress[i] === 100) {
              if (this.props.onComplete) {
                this.props.onComplete(this.state.files[i]);
              }
            }
            this.checkUploadComplete();
          });
        }
      };
      
      axios.put(this.props.endpoint, data, config);
    }
  };
  
  checkUploadComplete = () => {
    if (this.state.progress.every(x => x === 100)) {
      this.setState({uploadComplete: true, uploadInProgress: false});
      if (this.props.onCompleteAll) {
        this.props.onCompleteAll();
      }
    }  
  };
  
  render() {
    return <StyledFileUpload>
      <SafeDropzone 
        onDrop={this.handleDrop} 
        disabled={this.state.uploadInProgress} 
        children={this.props.children}/>
      <br/>
      {this.props.showFiles && <Files
          files={this.state.files}
          progress={this.state.progress}
          uploadOnDrop={this.props.uploadOnDrop}
          uploadInProgress={this.state.uploadInProgress}
          onUpload={this.handleUpload}
        />}
    </StyledFileUpload>;
  }
}

FileUpload.propTypes = {
  maxFiles: PropTypes.number,
  uploadOnDrop: PropTypes.bool,
  showFiles: PropTypes.bool,
  endpoint: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
  onCompleteAll: PropTypes.func,
  maxSize: PropTypes.number,
  accept: PropTypes.string
};

FileUpload.defaultProps = {
  maxFiles: 15,
  uploadOnDrop: true,
  showFiles: true,
  maxSize: 100 // 100MB
};

export default FileUpload;