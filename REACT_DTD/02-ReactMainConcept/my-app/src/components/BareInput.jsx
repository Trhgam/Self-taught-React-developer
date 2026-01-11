import React, { Component } from "react";

export default class BareInput extends Component {
  render() {
    return <input {...this.props} />;
  }
}

// function BareInput(props) {
//   const { type, ...rest } = props
//   return <input {...rest} />
// }
// export default BareInput;