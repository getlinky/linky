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
