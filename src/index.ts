import { Downloader } from "./downloader";
export { Downloader };

async function download(button: HTMLButtonElement): Promise<void> {
  button.disabled = true;
  const downloader = new Downloader(document);
  downloader.setupViewport(1860, 2480);
  await downloader.downloadMetadata();
  await downloader.downloadAllPages((progress) => {
    button.textContent = `${progress.complete} / ${progress.total}`;
  });
  alert("Download complete!");
  button.textContent = "download";
  button.disabled = false;
}

function createDownloadButton() {
  const button = document.createElement("button");
  button.textContent = "download";
  button.style.position = "fixed";
  button.style.top = "64px";
  button.style.left = "20px";
  button.style.zIndex = "65535";
  button.addEventListener("click", () =>
    download(button).catch((err) => console.error(err)),
  );
  document.body.appendChild(button);
}

function createMetadataButton() {
  const button = document.createElement("button");
  button.textContent = "metadata";
  button.style.position = "fixed";
  button.style.top = "99px";
  button.style.left = "20px";
  button.style.zIndex = "65535";
  button.addEventListener("click", () => {
    const downloader = new Downloader(document);
    downloader.downloadMetadata().catch((err) => console.error(err));
  });
  document.body.appendChild(button);
}

createDownloadButton();
createMetadataButton();
