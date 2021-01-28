import React, { Component } from "react";
import Navbar from "./navbar";
import axios from 'axios'


class App extends Component {
  state = {
    // server_ip: window.location.hostname,
    // remote_port: window.location.port,
    // server_protocol: window.location.protocol,
    // server_host: window.location.host,
    // user_agent: window.navigator.userAgent,
    // seconds: 0,
    metadata : [],
  }
  render() {
    return (
      // the overlay and horizontal pattern
      <div className="crt d-flex h-100 text-center text-white">
        <div className="scanline"></div>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <Navbar />
          <main className="terminal px-3 text-left">
            {this.state.metadata.map(meta =>
            <div key={meta.id}>{meta.value}</div>
            )}
          </main>
          <footer className="mt-auto text-white-50">
            <p>
              {" "}
              Info Terminal for one{" "}
              <a href="https://aws.amazon.com/" className="text-white">
                AWS
              </a>{" "}
              EC2 Instance.
              , by{" "}
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
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // getServerMetaData(){
  //     axios.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  //     .then(function (response) {
  //       console.log(response);
  //       this.setState(state => ({
  //         server_ip : response
  //       })); 
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // always executed
  //   });
  // }
}
export default App;