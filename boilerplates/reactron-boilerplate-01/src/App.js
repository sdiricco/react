import React from "react";
import { Button } from "antd";
import './App.less';

const { ipcRenderer } = window.require("electron");

class App extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      label: "Hello world from react, ant design and electron!"
    }
    this.showMessage = this.showMessage.bind(this)
  }

  async showMessage(){
    let options = {
      message: this.state.label
    };
    await ipcRenderer.invoke("message-box", options);
  }

  componentDidMount(){
    ipcRenderer.invoke("dom-loaded");
  }

  render() {
    return (
      <div className="mainContainer">
        <Button type="primary" onClick={this.showMessage}>Click me</Button>
      </div>
    );
  }
}

export default App;
