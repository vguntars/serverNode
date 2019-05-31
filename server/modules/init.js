const qa = (function () {
    // function _a() {
    //     alert([].slice.call(arguments));
    // }

    function _l() {
        console.log([].slice.call(arguments));
    }

    function _numS(val, dec) {
        try {
            val = parseFloat(val.toString().replace(/\s/g, '').replace(/,/g, '.')) || 0;
            if (typeof dec === 'number' && dec >= 0) {
                if (dec > 12) dec = 12;
                return +(val + 1E-13).toFixed(dec);
            } else {
                return val;
            }
        } catch (error) {
            return 0;
        }
    }

    function _strN(val, fixDEC, nulleON) {
        try {

            val = _numS(val, fixDEC);
            if (val == 0 && !nulleON) return '';
            val = val.toString().replace(/\s/g, '').replace(/,/g, '.');
            fixDEC = _numS(fixDEC, 0);
            if (fixDEC > 0) {
                const x = (_strDal(val, 2, '.') + '000000000000').substr(0, fixDEC);
                val = _strSet(val, x, 2, '.');
            }
            return val;
        } catch (error) {
            _l('Kļūda strN f-jā...');
        }
    }

    function _strSk(str, atdal) {
        try {
            if (typeof atdal !== 'string' || atdal === '') atdal = '|';
            return str.toString().split(atdal).length;
        } catch (error) {
            _l('Kļūda strSk f-jā...');
        }
    }

    function _strDal(str, num, atdal) {
        try {
            if (typeof atdal !== 'string' || atdal === '') atdal = '|';
            num = _numS(num, 0) - 1;
            const x = str.toString().split(atdal);
            if (num >= x.length) {
                return '';
            } else if (num < 0) {
                return x[x.length - 1];
            } else {
                return x[num];
            }
        } catch (error) {
            _l('Kļūda strDal f-jā...');
        }
    }

    function _strSet(str, strAdd, num, atdal) {
        try {
            if (typeof atdal !== 'string' || atdal === '') atdal = '|';
            num = _numS(num, 0) - 1;
            strAdd = strAdd.toString();
            let x = str.toString().split(atdal);
            if (num < 0) {
                x[x.length] = strAdd;
            } else {
                x[num] = strAdd;
            }
            return x.join(atdal);
        } catch (error) {
            _a('Kļūda strSet f-jā...');
        }
    }

    return {
        //a: _a,
        l: _l,
        numS: _numS,
        strN: _strN,
        strSk: _strSk,
        strDal: _strDal,
        strSet: _strSet,
    }
})();
//
//

// String.prototype.a = function () {
//     qa.a(this);
//     return this;
// }
String.prototype.l = function () {
    console.log(this.valueOf());
    return this;
}
String.prototype.numS = function (dec) {
    return qa.numS(this, dec);
}
String.prototype.strN = function (fixDEC, nulleON) {
    return qa.strN(this, fixDEC, nulleON);
}
String.prototype.strSk = function (atdal) {
    return qa.strSk(this, atdal);
}
String.prototype.strDal = function (num, atdal) {
    return qa.strDal(this, num, atdal);
}
String.prototype.strSet = function (strAdd, num, atdal) {
    return qa.strSet(this, strAdd, num, atdal);
}
//
// Number.prototype.a = function () {
//     qa.a(this);
//     return this;
// }
Number.prototype.l = function () {
    console.log(this.valueOf());
    return this;
}
Number.prototype.numS = function (dec) {
    return qa.numS(this, dec);
}
Number.prototype.strN = function (fixDEC, nulleON) {
    return qa.strN(this, fixDEC, nulleON);
}
//
// Object.prototype.a = function () {
//     qa.a(this);
//     return this;
// }
// Object.prototype.l = function () {
//     console.log(this.valueOf());
//     return this;
// }
