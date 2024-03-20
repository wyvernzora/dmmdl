import { Downloader } from "./downloader";
export { Downloader };

const button = createDownloadButton();

button.addEventListener("click", function () {
  button.disabled = true;
  const downloader = new Downloader(document);
  downloader.setupViewport(1652, 2341);
  downloader.downloadAllPages().then(() => {
    alert("Download complete!");
    button.disabled = false;
  });
});

document.body.appendChild(button);

function createDownloadButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = "download";
  button.style.position = "fixed";
  button.style.top = "64px";
  button.style.left = "20px";
  button.style.zIndex = "65535";
  return button;
}
