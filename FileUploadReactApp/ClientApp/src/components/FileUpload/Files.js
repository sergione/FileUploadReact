import * as React from 'react';
import File from './File'
import {Button} from "react-bootstrap";

const Files = ({files, progress, uploadOnDrop, uploadInProgress, onUpload}) => {
  return <div>
    <div>
      {files.map((file, i) => <File key={file.name} file={file} progress={progress[i]} />)}
    </div>
    {files.length > 0 && !uploadOnDrop && <Button disabled={uploadInProgress} onClick={onUpload}>Upload</Button>}
  </div>  
};

export default Files;