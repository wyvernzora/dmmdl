import { Downloader } from "./downloader";
export { Downloader };

const downloader = new Downloader(document);

export function downloadPage() {
    return downloader.downloadPage();
}

export async function downloadAllPages() {
    return downloader.downloadAllPages()
        .then(() => alert("Download complete!"));
}
