import React, { Component } from "react";
import Navbar from "./navbar";
import axios from 'axios'


class App extends Component {
  state = {
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
            <h2>VM IP: {this.state.metadata.IP}</h2>
            { (this.state.metadata.length > 0) ? 
                this.state.metadata.Metas.map(meta =>
                  <h5>{meta.id} : {meta.value}</h5>
                ) : ('')
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
}
export default App;