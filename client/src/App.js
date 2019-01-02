import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = openSocket('http://localhost:5000');
    this.socket.on('chat message', msg => {
      const messages = this.state.messages;
      messages.push(msg);

      this.setState({
        messages,
        msg: ''
      });
    });

    this.state = {
      msg: '',
      messages: []
    }
  }

  onMsgInputChange = e => {
    this.setState({
      msg: e.target.value
    });
  }

  enterBind = e => {
    const code = e.keyCode || e.which;
    
    if(code === 13) {
      this.sendMsg();
    }
  }

  sendMsg = () => {
    this.socket.emit('chat message', this.state.msg);
  }

  renderMessages() {
    return this.state.messages.map((message, index) => {
      return (
        <li key={index}>
          {message}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
        <input
          value={this.state.msg}
          onChange={this.onMsgInputChange}
          onKeyPress={this.enterBind} />
        <button onClick={this.sendMsg}>
          Enter
        </button>
      </div>
    );
  }
}

export default App;
