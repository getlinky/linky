/* globals document */

document.addEventListener('DOMContentLoaded', () => {
    // enable close button for close links in modals
    // find modals --> find children so we don't have to search upward for the
    // correct parent element
    [...document.querySelectorAll('.modal-container')].forEach(el => {
        // disable modal if someone clicks on the darkend background (.modal-container)
        el.addEventListener('click', l => {
            if (l.target.classList.contains('modal-container')) {
                el.classList.add('hidden');
            }
        });
        [...el.querySelectorAll('a.close')].forEach(l => {
            l.addEventListener('click', () => {
                el.classList.add('hidden');
            });
        });
    });

    // make add button toggle the add modal
    document.querySelector('div > a[href="#add"]').addEventListener('click', () => {
        const add = document.querySelector('#add');
        add.classList.remove('hidden');
        const input = add.querySelector('input');
        input.disabled = false;
        input.focus();
    });

    document.querySelector('div > a[href="#settings"]').addEventListener('click', () => {
        document.querySelector('#settings').classList.toggle('hidden');
    });
});

