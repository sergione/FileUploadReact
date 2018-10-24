import * as React from 'react';
import {Glyphicon, ProgressBar} from "react-bootstrap";

const File = ({file, progress}) => {
  const fileSize = file.size / 1048576; // file size in MB
  return <div>
    {file.name} ({fileSize.toFixed(2)} MB)&nbsp;{progress === 100 &&<Glyphicon glyph="ok-circle"/> }<br/>
    <ProgressBar now={progress} />
  </div>
};

export default File;