'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* globals document */

document.addEventListener('DOMContentLoaded', function () {
    // enable close button for close links in modals
    // find modals --> find children so we don't have to search upward for the
    // correct parent element
    [].concat(_toConsumableArray(document.querySelectorAll('.modal-container'))).forEach(function (el) {
        [].concat(_toConsumableArray(el.querySelectorAll('a.close'))).forEach(function (l) {
            l.addEventListener('click', function () {
                el.classList.add('hidden');
            });
        });
    });
});
