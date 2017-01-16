all: build images

.PHONY: build
build:
	npm run build

images:
	mkdir -p dist/assets/
	convert src/assets/icon.svg -resize 16x16 dist/assets/icon16.png
	convert src/assets/icon.svg -resize 48x48 dist/assets/icon48.png
	convert src/assets/icon.svg -resize 128x128 dist/assets/icon128.png
	convert src/assets/icon.svg -resize 256x256 dist/assets/icon256.png

clean:
	rm -rf dist/
	mkdir -p dist/assets
	mkdir -p dist/css
	mkdir -p dist/js
