import * as React from 'react';
import File from './File'

const Files = ({files, progress}) => {
  return <div>
    {files.map((file, i) => <File key={file.name} file={file} progress={progress[i]} />)}
  </div>  
};

export default Files;