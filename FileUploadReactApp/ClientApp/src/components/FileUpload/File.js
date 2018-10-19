import * as React from 'react';
import {Glyphicon, ProgressBar} from "react-bootstrap";

const File = ({file, progress}) => {
  return <div>
    {file.name} ({file.size} bytes)&nbsp;{progress === 100 &&<Glyphicon glyph="ok-circle"/> }<br/>
    <ProgressBar now={progress} />
  </div>
};

export default File;