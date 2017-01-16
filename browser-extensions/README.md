# Browser Extensions for Linky

Make sure imagemagick is installed for converting the svg to png

```bash
brew install imagemagick
```

## Production

```bash
make clean && make build
```

## Dev

```bash
# lint
npm run lint

cd src/ && watchexec -- npm run build
```
