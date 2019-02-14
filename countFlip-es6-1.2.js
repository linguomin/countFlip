"use strict";
(() => {
    class countFlip {
        constructor(obj) {
            this.id = !obj.id ? "flip" : obj.id;
            this.data = !obj.data ? "00000" : (obj.data).toString();
            this.digits = !obj.digits ? 5 : obj.digits;
            this.decimal = !obj.decimal ? 0 : Math.floor(obj.decimal);
            this.MicrometerLevel = !obj.MicrometerLevel ? false : true;
            this.cssStr = obj.cssStr;
            this.color = !obj.color ? "#93EEF5" : obj.color;
            this.baseFun();
            this.addNode();
            this.addStyle();
        }
        addNode() {
            for (let i = 0; i < this.digits; i++) {
                document.querySelector('#' + this.id).innerHTML +=
                    `<span id="${this.id}_${i + 1}" class="brand-style">0</span>`;
                let time = setInterval(() => {
                    document.querySelector('#' + this.id + '_' + (i + 1)).innerText = Math.floor(Math.random() * 10);
                }, 200);
                for (let j = 0; j < this.data.length; j++) {
                    const elem = this.data[j];
                    setTimeout(() => {
                        clearInterval(time);
                        document.querySelector('#' + this.id + '_' + (i + 1)).innerText = 0;
                        document.querySelector('#' + this.id + '_' + (i + 1)).style.color = 'rgb(114, 130, 132)';
                        document.querySelector('#' + this.id + '_' + (j + 1 + this.baseVariable())).innerText = elem;
                        document.querySelector('#' + this.id + '_' + (j + 1 + this.baseVariable())).style.color = this.color;
                    }, 3000);
                }
            }
        }
        addStyle() {
            let styleNode = document.createElement('style');
            styleNode.type = 'text/css';
            styleNode.innerHTML += `
                @font-face {
                    font-family: 'digiFaceWide';
                    src: url('./font/digifacewide.eot');/* IE9 Compat Modes */
                    src: url('./font/digifacewide.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
                    url('./font/digifacewide.woff2') format('woff2'), /* Super Modern Browsers */
                    url('./font/digifacewide.woff') format('woff'), /* Pretty Modern Browsers */
                    url('./font/digifacewide.ttf') format('truetype'), /* Safari, Android, iOS */
                    url('./font/digifacewide.svg#svgFontName') format('svg');/* Legacy iOS */
                }
                #${this.id}>.brand-style{
                    display:inline-block;
                    font-family:digiFaceWide;
                    text-align:center;
                    width:60px;
                    height:80px;
                    line-height:80px;
                    font-size:65px;
                    background:#1D2D40;
                    border-radius:10px;
                    margin-right:5px;
                    color:${this.color};
                    ${this.cssStr}
                }
            `;
            document.getElementsByTagName('head')[0].appendChild(styleNode);
        }
        baseFun() {
            if (this.data.indexOf('.') !== -1) {
                if (this.decimal === 0) this.data = (Math.floor(Number(this.data))).toString();
                else this.data = (Number(this.data).toFixed(this.decimal)).toString();
            } else
            if (this.decimal > 0) this.data = (Number(this.data).toFixed(this.decimal)).toString();
            if (this.MicrometerLevel === true)
                this.data = this.milliFormat(this.data);
        }
        baseVariable() {
            let poor = Number(this.digits) - this.data.length;
            poor >= 0 ? poor : 0;
            return poor;
        }
        milliFormat(s) {
            let decimalLen = 2; //小数点后位数
            let _regular = "";
            s = s + "";
            if (s.indexOf(".") >= 0)
                //如果有小数位 更新decimalLen
                decimalLen = s.length - s.indexOf(".") - 1;
            for (let i = 0; i < decimalLen; i++) {
                _regular += "\\d";
            }
            let original = s;
            let op = "";
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
            let re = /(\d)(\d{3},)/;
            while (re.test(s)) {
                s = s.replace(re, "$1,$2");
            }
            s = s.replace(eval("/,(" + _regular + ")$/"), ".$1");
            s = s.replace(/^\./, "0.");
            s = s.toString();
            if (s.length > (decimalLen + 1)) {
                if (original.length > (decimalLen + 1)) {
                    if (s.substring(s.length - (decimalLen + 1), s.length) ==
                        original.substring(original.length - (decimalLen + 1), original.length)) {
                        return op + s;
                    }
                }
                if (("0" + s.substring(s.length - (decimalLen + 1), s.length)) - 0 == 0) {
                    return op + s.substring(0, s.length - (decimalLen + 1));
                }
            }
            return op + s;
        }
    };
    window.countFlip = countFlip;
})();