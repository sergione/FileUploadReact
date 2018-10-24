import PropTypes from "prop-types";
import * as React from "react";
import Dropzone from "react-dropzone";


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

const SafeDropzone = (props) => {
  return <Dropzone
    style={dropzoneStyle}
    className=""
    onDrop={props.onDrop}
    disabled={props.disabled}
    disabledStyle={{color: "#C0C0C0", borderColor: "#C0C0C0"}}
  >
    <div style={dropzoneMessageStyle}>{props.children}</div>
  </Dropzone>;
};

SafeDropzone.propTypes = {
  onDrop: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any
};

export default SafeDropzone;