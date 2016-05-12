'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint "react/no-did-mount-set-state":0 */
/* eslint "react/no-did-update-set-state":0 */

var ReactHeight = _react2.default.createClass({
  displayName: 'ReactHeight',

  propTypes: {
    children: _react2.default.PropTypes.node.isRequired,
    onHeightReady: _react2.default.PropTypes.func,
    onWidthReady: _react2.default.PropTypes.func,
    onDimensionsReady: _react2.default.PropTypes.func,
    hidden: _react2.default.PropTypes.bool,
    dirty: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return { hidden: false, dirty: true };
  },
  getInitialState: function getInitialState() {
    return {
      height: 0, width: 0, dirty: this.props.dirty
    };
  },
  componentDidMount: function componentDidMount() {
    var height = this.wrapper.clientHeight;
    var width = this.wrapper.clientWidth;
    var dirty = false;

    this.setState({ height: height, width: width, dirty: dirty }, this.emitDimensions());
  },
  componentWillReceiveProps: function componentWillReceiveProps(_ref) {
    var children = _ref.children;
    var dirty = _ref.dirty;

    if (children !== this.props.children || dirty) {
      this.setState({ dirty: true });
    }
  },


  shouldComponentUpdate: _ReactComponentWithPureRenderMixin.shouldComponentUpdate,

  componentDidUpdate: function componentDidUpdate() {
    var height = this.wrapper.clientHeight;
    var width = this.wrapper.clientWidth;
    var dirty = false;

    if (height === this.state.height && width === this.state.width) {
      this.setState({ dirty: dirty });
    } else {
      this.setState({ height: height, width: width, dirty: dirty }, this.emitDimensions());
    }
  },
  emitDimensions: function emitDimensions() {
    var _this = this;

    var _state = this.state;
    var oldWidth = _state.width;
    var oldHeight = _state.height;


    return function () {
      var _props = _this.props;
      var onHeightReady = _props.onHeightReady;
      var onWidthReady = _props.onWidthReady;
      var onDimensionsReady = _props.onDimensionsReady;
      var _state2 = _this.state;
      var width = _state2.width;
      var height = _state2.height;


      if (typeof onHeightReady === 'function' && height !== oldHeight) {
        onHeightReady(height);
      }

      if (typeof onWidthReady === 'function' && width !== oldWidth) {
        onWidthReady(width);
      }

      if (typeof onDimensionsReady === 'function') {
        onDimensionsReady({ width: width, height: height });
      }
    };
  },
  setWrapperRef: function setWrapperRef(el) {
    this.wrapper = el;
  },
  render: function render() {
    var _props2 = this.props;
    var _ = _props2.onHeightReady;
    var hidden = _props2.hidden;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['onHeightReady', 'hidden', 'children']);

    var dirty = this.state.dirty;


    if (hidden && !dirty) {
      return null;
    }

    if (hidden) {
      return _react2.default.createElement(
        'div',
        { style: { height: 0, width: 0, overflow: 'hidden' } },
        _react2.default.createElement(
          'div',
          _extends({ ref: this.setWrapperRef }, props),
          children
        )
      );
    }

    return _react2.default.createElement(
      'div',
      _extends({ ref: this.setWrapperRef }, props),
      children
    );
  }
});

exports.default = ReactHeight;
//# sourceMappingURL=ReactHeight.js.map