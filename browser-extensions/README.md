# Browser Extensions for Linky

Make sure imagemagick is installed for converting the svg to png

```bash
brew install imagemagick
```

## Production

```bash
make clean && make
```

## Dev

```bash
npm run build
# or with watchexec installed
cd src/ && watchexec -- npm run build
```

Note: when debugging in

- Chrome open the `background page` located in the extensions page
- Firefox open [Tools > Web Developer > Browser Console][1] <kbd>shift + cmd + j</kbd>, also nav to `about:debugging#addons`


[1]: http://stackoverflow.com/a/24104946
