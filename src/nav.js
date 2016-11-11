/* globals document console window */

document.addEventListener('DOMContentLoaded', () => {

    const disable_all_modals = () => {
        [...document.querySelectorAll('.modal-container')].forEach(l => {
            l.classList.add('hidden');
            if (l.tagName === 'input') {
                l.disabled = true;

            }
        });
        document.querySelector('.link-container').focus();
    };

    const nav = () => {
        let link = document.activeElement;
        return {
            next: () => {
                console.log(document.activeElement);
                if (document.activeElement.nextSibling == null) {
                    return;
                }
                link = document.activeElement.nextSibling;
                link.focus();
            },
            previous: () => {
                console.log(document.activeElement);
                if (document.activeElement.previousSibling == null) {
                    return;
                }

                link = document.activeElement.previousSibling;
                link.focus();
            }
        };
    };

    const toggle_help_menu = () => {
        document.querySelector('#help').classList.toggle('hidden');
    };

    const toggle_settings_menu = () => {
        document.querySelector('#settings').classList.toggle('hidden');
    };

    const open_current_link_current_tab = () => {
        window.location.href = document.querySelector('.link-container > li.active > a.source').href;
    };

    const open_current_link_new_tab = () => {
        const url = document.querySelector('.link-container > li.active > a.source').href;
        window.open(url, '_blank');
    };


    const modal_in_use = () => {
        return document.querySelectorAll('.modal-container:not(.hidden)').length > 0;
    };

    const links_nav = nav();

    document.addEventListener('keydown', event => {

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


        if (is_key('j') || is_key('k')) {
            const ael = document.activeElement.tagName.toLowerCase();
            if (ael === 'input' || modal_in_use()) {
                // do nothing since the user is editing an input / using a modal
                return;
            } else if (ael === 'body') {
                // focus the first element if the activeElement is the body,
                // which means the user isn't using an input
                document.querySelector('.link-container > li').focus();
                return;
            }
        }

        if (is_key('esc') || (is_key(']') && event.ctrlKey)) {
            disable_all_modals();
        } else if (is_key('j') || (event.ctrlKey && is_key('n'))) {
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
            window.setTimeout(() =>
                    document.querySelector('input.search').focus(), 100);
        } else if (is_key('l')) {
            console.log('switch to right column || wrap around to the left column');
        } else if (is_key('h')) {
            console.log('switch to left coloumn || wrap around to the right column');
        } else if (is_key('o')) {
            open_current_link_new_tab();
        } else if (is_key('enter')) {
            open_current_link_current_tab();
        } else if (is_key('3') && event.shiftKey) {
            console.log('delete current item');
        } else if (is_key(',')) {
            toggle_settings_menu();
        }
        console.log(event.keyCode);
        console.log(event.ctrlKey);
    });
});
