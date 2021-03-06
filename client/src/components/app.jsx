import React, { Component } from "react";
import Navbar from "./navbar";
import axios from 'axios'


class App extends Component {
  state = {
    // seconds: 0,
    metadata : {
      IP : "0.0.0.0", 
      Metas :[{id:"hostName",value:"localhost"},{id:"host",value:"http://localhost:3000"}]
    },
  }
  render() {
    return (
      // the overlay and horizontal pattern
      <div className="crt d-flex h-100 text-center text-white">
        <div className="scanline"></div>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column overflow-hidden">
          <Navbar />
          <main className="terminal px-3 text-left">
            <h2>VM IP: {this.state.metadata.IP}</h2>
            { 
                this.state.metadata.Metas.map(meta =>
                  <h5 key={meta.id}>{meta.id} : {meta.value}</h5>
                )
            }
            <h5 className="term_end"></h5>
          </main>
          <footer className="mt-auto text-white-50">
            <p>
              {" "}
              Info Terminal for one{" "}
              <a href="https://aws.amazon.com/" className="text-white">
                AWS
              </a>{" "}
              EC2 Instance.
              , with ♡ by{" "}
              <a href="https://github.com/jibar026" className="text-white">
                @jibar026
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    );
  }
  
  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }
  
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    fetch('/ec2-meta')
      .then(res => res.json())
      .then(metadata => this.setState({ metadata }));
    this.forceUpdate();
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
export default App;