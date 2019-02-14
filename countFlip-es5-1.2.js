"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

(function () {
    var countFlip = function () {
        function countFlip(obj) {
            _classCallCheck(this, countFlip);

            this.id = !obj.id ? "flip" : obj.id;
            this.data = !obj.data ? "00000" : obj.data.toString();
            this.digits = !obj.digits ? 5 : obj.digits;
            this.decimal = !obj.decimal ? 0 : Math.floor(obj.decimal);
            this.MicrometerLevel = !obj.MicrometerLevel ? false : true;
            this.cssStr = obj.cssStr;
            this.color = !obj.color ? "#93EEF5" : obj.color;
            this.baseFun();
            this.addNode();
            this.addStyle();
        }

        _createClass(countFlip, [{
            key: "addNode",
            value: function addNode() {
                var _this = this;

                var _loop = function _loop(i) {
                    document.querySelector('#' + _this.id).innerHTML += "<span id=\"" + _this.id + "_" + (i + 1) + "\" class=\"brand-style\">0</span>";
                    var time = setInterval(function () {
                        document.querySelector('#' + _this.id + '_' + (i + 1)).innerText = Math.floor(Math.random() * 10);
                    }, 200);

                    var _loop2 = function _loop2(j) {
                        var elem = _this.data[j];
                        setTimeout(function () {
                            clearInterval(time);
                            document.querySelector('#' + _this.id + '_' + (i + 1)).innerText = 0;
                            document.querySelector('#' + _this.id + '_' + (i + 1)).style.color = 'rgb(114, 130, 132)';
                            document.querySelector('#' + _this.id + '_' + (j + 1 + _this.baseVariable())).innerText = elem;
                            document.querySelector('#' + _this.id + '_' + (j + 1 + _this.baseVariable())).style.color = _this.color;
                        }, 3000);
                    };

                    for (var j = 0; j < _this.data.length; j++) {
                        _loop2(j);
                    }
                };

                for (var i = 0; i < this.digits; i++) {
                    _loop(i);
                }
            }
        }, {
            key: "addStyle",
            value: function addStyle() {
                var styleNode = document.createElement('style');
                styleNode.type = 'text/css';
                styleNode.innerHTML += "\n@font-face {\n    font-family: 'digiFaceWide';\n    src: url('./font/digifacewide.eot');/* IE9 Compat Modes */\n    src: url('./font/digifacewide.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */\n    url('./font/digifacewide.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./font/digifacewide.woff') format('woff'), /* Pretty Modern Browsers */\n    url('./font/digifacewide.ttf') format('truetype'), /* Safari, Android, iOS */\n    url('./font/digifacewide.svg#svgFontName') format('svg');/* Legacy iOS */\n}\n#" + this.id + ">.brand-style {\n    display: inline-block;\n    font-family: digiFaceWide;\n    text-align: center;\n    width: 60px;\n    height: 80px;\n    line-height: 80px;\n    font-size: 65px;\n    background: #1D2D40;\n    border-radius: 10px;\n    margin-right: 5px;\n    color: " + this.color + ";\n    " + this.cssStr + "\n}\n";
                document.getElementsByTagName('head')[0].appendChild(styleNode);
            }
        }, {
            key: "baseFun",
            value: function baseFun() {
                if (this.data.indexOf('.') !== -1) {
                    if (this.decimal === 0) this.data = Math.floor(Number(this.data)).toString();
                    else this.data = Number(this.data).toFixed(this.decimal).toString();
                } else if (this.decimal > 0) this.data = Number(this.data).toFixed(this.decimal).toString();
                if (this.MicrometerLevel === true) this.data = this.milliFormat(this.data);
            }
        }, {
            key: "baseVariable",
            value: function baseVariable() {
                var poor = Number(this.digits) - this.data.length;
                poor >= 0 ? poor : 0;
                return poor;
            }
        }, {
            key: "milliFormat",
            value: function milliFormat(s) {
                var decimalLen = 2; //小数点后位数
                var _regular = "";
                s = s + "";
                if (s.indexOf(".") >= 0)
                    //如果有小数位 更新decimalLen
                    decimalLen = s.length - s.indexOf(".") - 1;
                for (var i = 0; i < decimalLen; i++) {
                    _regular += "\\d";
                }
                var original = s;
                var op = "";
                if (s.indexOf("-") == 0) {
                    op = "-";
                    s = s.substring(1, s.length);
                }
                if (/[^0-9\.\-]/.test(s)) {
                    return "invalid value";
                }
                s = s.replace(/^(\d*)$/, "$1.");
                s = (s + "00").replace(eval("/(\\d*\\." + _regular + ")\\d*/"), "$1");
                s = s.replace(".", ",");
                var re = /(\d)(\d{3},)/;
                while (re.test(s)) {
                    s = s.replace(re, "$1,$2");
                }
                s = s.replace(eval("/,(" + _regular + ")$/"), ".$1");
                s = s.replace(/^\./, "0.");
                s = s.toString();
                if (s.length > decimalLen + 1) {
                    if (original.length > decimalLen + 1) {
                        if (s.substring(s.length - (decimalLen + 1), s.length) == original.substring(original.length - (decimalLen + 1), original.length)) {
                            return op + s;
                        }
                    }
                    if ("0" + s.substring(s.length - (decimalLen + 1), s.length) - 0 == 0) {
                        return op + s.substring(0, s.length - (decimalLen + 1));
                    }
                }
                return op + s;
            }
        }]);
        return countFlip;
    }();
    window.countFlip = countFlip;
})();