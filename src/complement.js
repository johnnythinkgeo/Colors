var Utils = require('./utils');
var hex2rgb = require('./hex2rgb');

var subFrom255 = function(int) {
    return 255 - int;
};

var getColorSubset = function(color, idx) {
    return Utils.paddedHex(
        subFrom255(
            hex2rgb(color.substr(idx, 2))
        )
    );
};

var stringHandler = function(color) {
    var returnString = '#';
    var hex = Utils.parseHexColor(color);
    returnString += getColorSubset(hex, 0);
    returnString += getColorSubset(hex, 2);
    returnString += getColorSubset(hex, 4);
    return returnString;
};

var getFormattedArr = function(a0, a1, a2) {
    return [
        subFrom255(a0),
        subFrom255(a1),
        subFrom255(a2)
    ];
};

var complement = function(color, g, b) {
    if (typeof color === 'string' && Utils.hexRegexMatch(color)) {
        return stringHandler(color);
    }

    if (typeof color === 'object') {
        return getFormattedArr(color[0], color[1], color[2]);
    }

    if (color && g && b) {
        return getFormattedArr(color, g, b);
    }

    Utils.err('Method complement called with invalid arguments');
};

module.exports = complement;
