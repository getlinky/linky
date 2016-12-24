/* globals document console window */

document.addEventListener('DOMContentLoaded', () => {

    // enable close button for close links in modals
    // find modals --> find children so we don't have to search upward for the
    // correct parent element
    [...document.querySelectorAll('.modal-container')].forEach(el => {
        // disable modal if someone clicks on the darkend background (.modal-container)
        el.addEventListener('click', l => {
            if (l.target.classList.contains('modal-container')) {
                disable_all_modals();
            }
        });
        [...el.querySelectorAll('a.close')].forEach(l => {
            l.addEventListener('click', () => {
                console.log("put click");
                disable_all_modals();
            });
        });
    });

        // make add button toggle the add modal
    document.querySelector('div > a#add-icon').addEventListener('click', () => {
        toggle_add_menu();
    });

    document.querySelector('div > a#settings-icon').addEventListener('click', () => {
        toggle_settings_menu();
    });

    const disable_all_modals = () => {
        console.log('disable_all_modals');
        [...document.querySelectorAll('.modal-container')].forEach(l => {
            // hide all of the modals
            l.classList.add('hidden');
            // disable all of the inputs in the modals
            // but make sure to not disable the submit buttons
            [...document.querySelectorAll('input:not([type="submit"])')].forEach(el => {
                el.disabled = true;
            });
        });
        // enable search <input>
        document.querySelector('input.search').disabled = false;
        document.querySelector('.link-container > li').focus();
    };

    const nav = () => {
        let link = document.activeElement;
        return {
            next: () => {
                if (document.activeElement.nextElementSibling == null) {
                    return;
                }
                link = document.activeElement.nextElementSibling;
                link.focus();
            },
            previous: () => {
                if (document.activeElement.previousElementSibling == null) {
                    window.scroll(0, 0);
                    return;
                }
                link = document.activeElement.previousElementSibling;
                link.focus();
            }
        };
    };

    const toggle_help_menu = () => {
        toggle_search_input();
        document.querySelector('#help').classList.toggle('hidden');
    };

    const toggle_add_menu = () => {
        toggle_search_input();
        const el = document.querySelector('#add');
        el.classList.toggle('hidden');
        const url_input_selector = 'input[type=url]';
        el.querySelector(url_input_selector).disabled = false;
        if (!el.classList.contains('hidden')) {
            // need slight delay so that the keypresses don't insert into the <input>
            window.setTimeout(() => el.querySelector(url_input_selector).focus(), 100);
        }
    };

    const toggle_settings_menu = () => {
        const el = document.querySelector('#settings');
        [...el.querySelectorAll('input')].forEach(e => e.disabled = false);
        toggle_search_input();
        el.classList.toggle('hidden');
    };

    const open_current_link_current_tab = () => {
        window.location.href = document.querySelector('.link-container > li:focus').querySelector('a.source').href;
    };

    const open_current_link_new_tab = () => {
        const url = document.querySelector('.link-container > li:focus').querySelector('a.source').href;
        window.open(url, '_blank');
    };

    const toggle_search_input = () =>
        document.querySelector('input.search').disabled =
        !document.querySelector('input.search').disabled;

    const settings_modal_active = () =>
        !document.querySelector('#settings').classList.contains('hidden');

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
                188: ',',
                67: 'c'
            }[event.keyCode];
        };

        // always have esc available
        if (is_key('esc') || (is_key(']') && event.ctrlKey)) {
            disable_all_modals();
        }


        // disable keybinds if we are using an <input>
        if (document.activeElement.tagName.toLowerCase() === 'input') {
            return;
        }

        // allow for the `,` to work when settings modal is active so that you
        // can enable and disable the modal with the same button
        if (settings_modal_active() && is_key(',')) {
            toggle_settings_menu();
            return;
        }
        const help_modal_in_use =
            !document.querySelector('#help').classList.contains('hidden');
        console.log("shdlkfjsldkf ", help_modal_in_use);
        if (help_modal_in_use && is_key('/') && event.shiftKey) {
            toggle_help_menu();
            return;
        }

        const modal_in_use =
            document.querySelectorAll('.modal-container:not(.hidden)').length > 0;

        // don't use keybinds when user is using a modal
        if (modal_in_use) {
            return;
        }

        const search_input_in_use = () =>
            document.activeElement === document.querySelector('input.search');

        // don't need keybinds if we are editing the search input
        if (search_input_in_use()) {
            return;
        }

        if (is_key('j') || is_key('k')) {
            console.log('key is h or k');
            const ael = document.activeElement.tagName.toLowerCase();
            console.log(ael);
            console.log(ael.previousSibling);

            if (ael === 'input' || modal_in_use) {
                console.log('active elemtn is the input or modal is in use');
                // do nothing since the user is editing an input / using a modal
                return;
            } else if (ael === 'body') {
                console.log('active element is the body');
                // focus the first element if the activeElement is the body,
                // which means the user isn't using an input
                document.querySelector('.link-container > li').focus();
                return;
            }
        }

        if (is_key('j') || (event.ctrlKey && is_key('n'))) {
            links_nav.next();
        } else if (is_key('k') || (event.ctrlKey && is_key('p'))) {
            links_nav.previous();
        } else if (is_key('d')) {
            console.log('delete');
        } else if (is_key('a')) {
            console.log('archive');
        } else if (is_key('c')) {
            toggle_add_menu();
        } else if (is_key('/') && event.shiftKey) {
            toggle_help_menu();
        } else if (is_key('/')) {
            window.setTimeout(() =>
                    document.querySelector('input.search').focus(), 100);
        } else if (is_key('l')) {
            document.querySelector('.list-archive-option-section > a.inactive').click();
        } else if (is_key('h')) {
            document.querySelector('.list-archive-option-section > a.inactive').click();
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
