# dmmdl

Script for downloading books from DMM as image files. Because I want to read manga on my Kindle.

## Usage

1. Clone and build

```
$ git clone git@github.com:wyvernzora/dmmdl.git
$ cd dmmdl
$ npm run build
```

2. Install the `dist/dmmdl.user.js` as a tampermonkey script
3. Open any book in DMM online reader
4. Click on the "download" button that is added on the top left

## Notes

1. You may need to grant permission for DMM to download multiple files.
2. Don't just trust scripts from the internet and paste them into browser JS console. Inspect them before you run them.
3. If you so incline, shouldn't be too hard to adapt it to run on something like Puppeteer.

## License

WTFPL
