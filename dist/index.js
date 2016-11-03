'use strict';

/* globals document console */

document.addEventListener('DOMContentLoaded', function () {

    var nav = function nav(selector) {
        var link = document.querySelector(selector);

        link.classList.add('active');

        return {
            next: function next() {
                if (link.nextSibling == null) {
                    return;
                }
                link.classList.remove('active');
                link = link.nextSibling;
                link.classList.add('active');
            },
            previous: function previous() {
                if (link.previousSibling == null) {
                    return;
                }
                link.classList.remove('active');
                link = link.previousSibling;
                link.classList.add('active');
            },
            current: link
        };
    };

    var key = {
        75: 'k',
        74: 'j',
        76: 'l',
        72: 'h',
        68: 'd',
        65: 'a',
        83: 's',
        70: 'f',
        78: 'n',
        79: 'o',
        80: 'p',
        191: '/'

    };

    var linksNav = nav('.link-container > li');

    document.addEventListener('keydown', function (event) {

        if (key[event.keyCode] === 'j' || event.ctrlKey && key[event.keyCode] === 'n') {
            linksNav.next();
        } else if (key[event.keyCode] === 'k' || event.ctrlKey && key[event.keyCode === 'p']) {
            linksNav.previous();
        } else if (key[event.keyCode] === 'd') {
            console.log('delete');
        } else if (key[event.keyCode] === 'a') {
            console.log('archive');
        } else if (key[event.keyCode] === '/' && event.shiftKey) {
            console.log('help');
        } else if (key[event.keyCode] === '/') {
            console.log('search');
        } else if (key[event.keyCode] === 'l') {
            //TODO
            console.log('switch to right column || wrap around to the left column');
        } else if (key[event.keyCode] === 'h') {
            //TODO
            console.log('switch to left coloumn || wrap around to the right column');
        }
        console.log(event.keyCode);
        console.log(event.ctrlKey);
    });
});
