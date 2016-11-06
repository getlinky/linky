/* globals document console window */

document.addEventListener('DOMContentLoaded', () => {

    const in_view = el => {
        const top = el.getBoundingClientRect().top;
        const bottom = el.getBoundingClientRect().bottom;
        return top >= 0 && bottom <= window.innerHeight;
    };

    const scroll_into_view = el => {
        if (!in_view(el)) {
            el.scrollIntoView();
            window.scroll(0, window.scrollY);
        }
    };

    const disable_all_modals = () => {
        [...document.querySelectorAll('.modal-container')].forEach(l => {
            l.classList.add('hidden');
        });
    };

    const nav = selector => {
        let link = document.querySelector(selector);

        link.classList.add('active');

        return {
            next: () => {
                if (link.nextSibling == null) {
                    return;
                }
                link.classList.remove('active');
                link = link.nextSibling;
                scroll_into_view(link);
                link.classList.add('active');
            },
            previous: () => {
                if (link.previousSibling == null) {
                    window.scrollTo(0, 0);
                    return;
                }
                link.classList.remove('active');
                link = link.previousSibling;
                scroll_into_view(link);
                link.classList.add('active');
            },
            current: link
        };
    };

    const toggle_help_menu = () => {
        document.querySelector('#help').classList.toggle('hidden');
    };

    const toggle_settings_menu = () => {
        document.querySelector('#settings').classList.toggle('hidden');
    };

    const links_nav = nav('.link-container > li');

    document.addEventListener('keydown', event => {

        if (document.activeElement.tagName.toLowerCase() !== 'body') return;

        // takes in `event` from the current scope so it can be called more cleanly
        const is_key = k => {
            return k === {
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
                191: '/',
                13: 'enter',
                27: 'esc',
                219: ']',
                51: '3',
                188: ','
            }[event.keyCode];
        };

        if (is_key('j') || (event.ctrlKey && is_key('n'))) {
            links_nav.next();
        } else if (is_key('k') || (event.ctrlKey && is_key('p'))) {
            links_nav.previous();
        } else if (is_key('d')) {
            console.log('delete');
        } else if (is_key('a')) {
            console.log('archive');
        } else if (is_key('/') && event.shiftKey) {
            toggle_help_menu();
        } else if (is_key('/')) {
            console.log('search');
        } else if (is_key('l')) {
            console.log('switch to right column || wrap around to the left column');
        } else if (is_key('h')) {
            console.log('switch to left coloumn || wrap around to the right column');
        } else if (is_key('o')) {
            console.log('open in a new tab');
        } else if (is_key('enter')) {
            console.log('open in current tab');
        } else if (is_key('esc') || (is_key(']') && event.ctrlKey)) {
            disable_all_modals();
        } else if (is_key('3') && event.shiftKey) {
            console.log('delete current item');
        } else if (is_key(',')) {
            console.log('toggle settings menu');
            toggle_settings_menu();
        }
        console.log(event.keyCode);
        console.log(event.ctrlKey);

    });

});
