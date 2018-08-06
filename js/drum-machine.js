"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

var Presentational = function (_React$Component) {
  _inherits(Presentational, _React$Component);

  function Presentational(props) {
    _classCallCheck(this, Presentational);

    var _this = _possibleConstructorReturn(this, (Presentational.__proto__ || Object.getPrototypeOf(Presentational)).call(this, props));

    _this.state = {
      display: "Drum Machine"
    };
    _this.playKey = _this.playKey.bind(_this);
    _this.play = _this.play.bind(_this);
    _this.define = _this.define.bind(_this);
    return _this;
  }

  _createClass(Presentational, [{
    key: "playKey",
    value: function playKey(event) {
      var button = String.fromCharCode(event.charCode);
      var note = button.toUpperCase();
      var drumPad = document.getElementById(note).parentElement;
      this.play(drumPad);
    }
  }, {
    key: "define",
    value: function define(event) {
      var key = event.currentTarget;
      this.play(key);
    }
  }, {
    key: "play",
    value: function play(key) {
      if (keys.includes(key.innerText)) {
        var audio = document.getElementById(key.innerText);
        audio.currentTime = 0;
        audio.play();
        this.setState({
          display: key.id
        });
      }
    }

    // focus a button upon load, so that
    // keypress event listener is active.

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.firstBtn.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { onKeyPress: this.playKey },
        React.createElement(
          "div",
          { id: "drum-machine", className: "grid-container container" },
          React.createElement(
            "div",
            { className: "jumbotron animated flipInX", id: "display" },
            this.state.display
          ),
          React.createElement(
            "div",
            { className: "grid-container", id: "btn-grid" },
            React.createElement(
              "button",
              {
                className: "btn drum-pad",
                id: "ChordRhythm",
                onClick: this.define,
                ref: function ref(input) {
                  _this2.firstBtn = input;
                }
              },
              "Q",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Chord+rhythm.m4a",
                className: "clip",
                id: "Q"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Chord", onClick: this.define },
              "W",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Chord.m4a",
                className: "clip",
                id: "W"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Conga", onClick: this.define },
              "E",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Conga.m4a",
                className: "clip",
                id: "E"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Crash", onClick: this.define },
              "A",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Crash.m4a",
                className: "clip",
                id: "A"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Cymbal", onClick: this.define },
              "S",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Cymbal+Hit.m4a",
                className: "clip",
                id: "S"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Kick", onClick: this.define },
              "D",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Kick.m4a",
                className: "clip",
                id: "D"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Scratch", onClick: this.define },
              "Z",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Scratch.m4a",
                className: "clip",
                id: "Z"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Serve", onClick: this.define },
              "X",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Serve.m4a",
                className: "clip",
                id: "X"
              })
            ),
            React.createElement(
              "button",
              { className: "btn drum-pad", id: "Volley", onClick: this.define },
              "C",
              React.createElement("audio", {
                src: "https://s3.us-east-2.amazonaws.com/fcc-projects-jms/Drum+Machine/Volley.m4a",
                className: "clip",
                id: "C"
              })
            )
          ),
          React.createElement(
            "footer",
            null,
            React.createElement(
              "a",
              { id: "footer", href: "portfolio.html", alt: "Developer's Portfolio", target: "_blank" },
              " Yann Stoneman \xA9 2018"
            )
          )
        )
      );
    }
  }]);

  return Presentational;
}(React.Component);

ReactDOM.render(React.createElement(Presentational, null), document.getElementById("drum"));
