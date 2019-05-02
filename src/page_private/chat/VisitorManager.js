import React from 'react';

import VisitorArea from './VisitorArea';
import ChatArea from './ChatArea';

export default class VisitorManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: this.getHeight(window.screen.height)};
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    this.setState({ height: this.getHeight(window.screen.height)});

  }

  getHeight(h) {
    let d = +h - (+h * 0.15) - 20;
    console.log('d:', d, ' h:', h);
    return d;
  }

  render() {
    return (
      <div className="visitor-page" >
        <div className="visitor-main-area" style={{height: `${this.state.height}px`}}>

          <VisitorArea />

          <ChatArea />

        </div>
      </div>
    );
  }
}
