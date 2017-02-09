import React, { Component } from 'react';

import './App.css';

//import we-ui styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';

export default class App extends Component {
  render() {
      return (
          <div className="App">
              { this.props.children }
          </div>
      );
  }
}


