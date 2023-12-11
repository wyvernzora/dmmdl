# dmmdl
Script for downloading books from DMM as image files. Because I want to read manga on my Kindle.

## Usage
1. Clone and build
```
$ git clone git@github.com:wyvernzora/dmmdl.git
$ cd dmmdl
$ npm run build
```

2. Using browser of your choice, go to DMM book you want to download and open it in online reader.
3. Open dev tools and turn on responsive mode. Set page dimensions to `960x1363`.
4. Paste the contents of `dist/dmmdl.js` into browser JS console and run it.
5. In the JS console run the following:
```
dmmdl.downloadAllPages();
```
6. Wait for the images to download.

## Notes
1. You may need to grant permission for DMM to download multiple files.
2. Don't just trust scripts from the internet and paste them into browser JS console. Inspect them before you run them.
3. Maybe I'll make it a tampermonkey script.. maybe.
4. If you so incline, shouldn't be too hard to run it on something like Puppeteer.


## License
WTFPL
