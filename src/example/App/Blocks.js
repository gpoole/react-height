import React from 'react';
import {shouldComponentUpdate} from 'react/lib/ReactComponentWithPureRenderMixin';
import ReactHeight from '../../ReactHeight';
import css from './App.css';

const Blocks = React.createClass({
  getInitialState() {
    return {blocks: 0};
  },


  shouldComponentUpdate,

  render() {
    const {height, width, blocks} = this.state;

    let blockElements = [];
    for (let i = 0; i < blocks; i++) {
      blockElements.push(<div className={css.block} key={i} />);
    }

    return (
      <div>
        <div className={css.config}>
          <label className={css.label}>
            Blocks:
            <input className={css.input}
              type="range"
              value={blocks} step={1} min={0} max={28}
              onChange={({target: {value}}) => this.setState({blocks: parseInt(value, 10)})} />
            {blocks}
          </label>
          <label className={css.label}>
            Dimensions:
            <b className={css.input}>{width}px</b> x
            <b className={css.input}>{height}px</b>
          </label>
        </div>

        <div className={css.content}>
          <ReactHeight
            onDimensionsReady={({ width, height }) => this.setState({ width, height })}
            className={css.container}>
            {blockElements}
          </ReactHeight>
        </div>
      </div>
    );
  }
});


export default Blocks;
