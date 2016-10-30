'use strict';

/* globals document */

document.addEventListener('DOMContentLoaded', function () {

    var to_binary = function to_binary(n) {
        return n.toString(2);
    };
    var to_decimal = function to_decimal(n) {
        return n.toString(10);
    };
    var to_hex = function to_hex(n) {
        return n.toString(16).toUpperCase();
    };
    var to_octal = function to_octal(n) {
        return n.toString(8);
    };

    var valid = function valid(z) {
        if (isNaN(z)) {
            return '';
        }
        return z;
    };

    var binary = document.getElementById('binary');
    var decimal = document.getElementById('decimal');
    var hex = document.getElementById('hex');
    var octal = document.getElementById('octal');

    hex.oninput = function (e) {
        var v = valid(parseInt(e.target.value, 16));
        binary.value = to_binary(v);
        decimal.value = to_decimal(v);
        octal.value = to_octal(v);
    };

    binary.oninput = function (e) {
        var v = valid(parseInt(e.target.value, 2));
        decimal.value = to_decimal(v);
        hex.value = to_hex(v);
        octal.value = to_octal(v);
    };

    octal.oninput = function (e) {
        var v = valid(parseInt(e.target.value, 8));
        binary.value = to_binary(v);
        decimal.value = to_decimal(v);
        hex.value = to_hex(v);
    };

    decimal.oninput = function (e) {
        var v = valid(parseFloat(e.target.value));
        binary.value = to_binary(v);
        hex.value = to_hex(v);
        octal.value = to_octal(v);
    };
});
