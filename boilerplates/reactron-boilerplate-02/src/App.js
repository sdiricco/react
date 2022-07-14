import React from "react";
import { Button, Typography, Input } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import './App.less';
import ResizePanel from "react-resize-panel";
import { Hook, Console, Decode, Unhook } from "console-feed"; //https://openbase.com/js/console-feed

const { ipcRenderer } = window.require("electron");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      input: ""
    }
    this.props = props;
  }

  componentDidUpdate() {
    let objDiv = document.getElementById("logTerminal");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  componentDidMount() {
    Hook(window.console, (log) => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }
  
  componentWillUnmount(){
    Unhook(window.console)
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="upContainer">
          <Input placeholder="Type something and press a button to print a log/warning/error in Output" onChange={(evt) => { this.setState({ input: evt.target.value }) }} />
          <div className="buttonGroup">
            <Button className="buttons" onClick={() => {
              console.log(this.state.input)
            }}>Console.log()</Button>
            <Button  className="buttons" onClick={() => {
              console.warn(this.state.input)
            }}>Console.warn()</Button>
            <Button className="buttons" onClick={() => {
              console.error(this.state.input)
            }}>Console.error()</Button>
          </div>
        </div>
        <ResizePanel
          style={{ height: "200px" }}
          direction="n"
          handleClass="customHandle"
          borderClass="customResizeBorder"
        >
          <div className="downContainer">
            <div className="logContainer">
              <div className="logHeader">
                <Typography>Output</Typography>
                <Button type="link" size="large" onClick={() => {
                  this.setState({ logs: [] })
                }}><DeleteOutlined /></Button>
              </div>

              <div className="logTerminal" id="logTerminal">
                <Console
                  //https://github.com/samdenty/console-feed/blob/master/src/definitions/Styles.d.ts
                  //https://github.com/samdenty/console-feed/blob/master/src/Component/theme/default.ts
                  styles={{
                    PADDING: '0px 22px 0px 0px',
                    //console.warn()
                    LOG_WARN_BORDER: "",
                    //console.err()
                    LOG_ERROR_BORDER: ""
                  }}
                  logs={this.state.logs}
                  variant="dark"
                />
              </div>
            </div>
          </div>
        </ResizePanel>
      </div>
    );
  }
}

export default App;
