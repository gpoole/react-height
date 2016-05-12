/* eslint "react/no-did-mount-set-state":0 */
/* eslint "react/no-did-update-set-state":0 */


import React from 'react';
import {shouldComponentUpdate} from 'react/lib/ReactComponentWithPureRenderMixin';

const ReactHeight = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    onHeightReady: React.PropTypes.func,
    onWidthReady: React.PropTypes.func,
    onDimensionsReady: React.PropTypes.func,
    hidden: React.PropTypes.bool,
    dirty: React.PropTypes.bool
  },


  getDefaultProps() {
    return {hidden: false, dirty: true};
  },


  getInitialState() {
    return {
      height: 0, width: 0, dirty: this.props.dirty
    };
  },

  componentDidMount() {
    const height = this.wrapper.clientHeight;
    const width = this.wrapper.clientWidth;
    const dirty = false;

    this.setState({height, width, dirty}, this.emitDimensions());
  },


  componentWillReceiveProps({children, dirty}) {
    if (children !== this.props.children || dirty) {
      this.setState({dirty: true});
    }
  },


  shouldComponentUpdate,


  componentDidUpdate() {
    const height = this.wrapper.clientHeight;
    const width = this.wrapper.clientWidth;
    const dirty = false;

    if (height === this.state.height && width === this.state.width) {
      this.setState({dirty});
    } else {
      this.setState({height, width, dirty}, this.emitDimensions());
    }
  },

  emitDimensions() {
    const {width: oldWidth, height: oldHeight} = this.state;

    return () => {
      const {onHeightReady, onWidthReady, onDimensionsReady} = this.props;
      const {width, height} = this.state;

      if (typeof onHeightReady === 'function' && height !== oldHeight) {
        onHeightReady(height);
      }

      if (typeof onWidthReady === 'function' && width !== oldWidth) {
        onWidthReady(width);
      }

      if (typeof onDimensionsReady === 'function') {
        onDimensionsReady({width, height});
      }
    };
  },

  setWrapperRef(el) {
    this.wrapper = el;
  },


  render() {
    const {onHeightReady: _, hidden, children, ...props} = this.props;
    const {dirty} = this.state;

    if (hidden && !dirty) {
      return null;
    }

    if (hidden) {
      return (
        <div style={{height: 0, width: 0, overflow: 'hidden'}}>
          <div ref={this.setWrapperRef} {...props}>{children}</div>
        </div>
      );
    }

    return <div ref={this.setWrapperRef} {...props}>{children}</div>;
  }
});


export default ReactHeight;
