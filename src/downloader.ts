import { waitUntil } from "./wait";
import { getMetadata } from "./metadata";

export interface DownloadProgress {
  readonly complete: number;
  readonly total: number;
}

export type ProgressCallback = (p: DownloadProgress) => void;

export class Downloader {
  readonly title: string;
  readonly controller: Controller;
  readonly sliderModel: PageSliderModel;
  readonly rendererModel: RendererModel;

  constructor(document: Document) {
    this.title = document.title;
    this.rendererModel = NFBR.a6G.Initializer.views_.renderer.model;
    this.sliderModel = NFBR.a6G.Initializer.views_.pageSlider.model;
    this.controller = NFBR.a6G.Initializer.views_.pageSlider.a6l;
  }

  /**
   * Retrieves the index of the current page.
   * @returns 0-based index of the page displayed.
   */
  public get pageNumber(): number {
    return this.sliderModel.get("viewerPage");
  }

  /**
   * Looks for loading indicators and determines if current page is loading based on whether they are
   * visible or not.
   * @returns true if current page is being loaded.
   */
  public get isLoading(): boolean {
    const loadingIndicators = document.querySelectorAll(".loading");
    return Array.from(loadingIndicators.values())
      .map((element) => getComputedStyle(element))
      .map((styles) => styles.visibility)
      .some((visibility) => visibility !== "hidden");
  }

  /**
   * Determines whether current page is in the middle of a transition (e.g. animation)
   * @returns true if current page is in the middle of a transition
   */
  public get isTransitioning(): boolean {
    return this.rendererModel.get("viewerTransitionState") !== 0;
  }

  /**
   * Wait for loading and transitioning to be complete before downloading the page.
   * Otherwise can end up downloading duplicates or mangled pages.
   */
  public async waitForNextPage(): Promise<void> {
    return waitUntil(() => !this.isLoading && !this.isTransitioning);
  }

  public async downloadMetadata(): Promise<void> {
    const a = document.createElement("a");
    a.href = `data:application/json;charset=utf-8,${encodeURIComponent(await getMetadata())}`;
    a.download = `${document.title}.json`;
    a.click();
  }

  /**
   * Exports contents of a canvas into an image and initiates download of said image.
   */
  public downloadPage(): void {
    const canvas = document.querySelector<HTMLCanvasElement>(
      ".currentScreen canvas",
    );
    if (!canvas) {
      throw new Error("Could not find reader canvas element");
    }
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpg", 0.8);
    a.download = `dmm-${document.title}-${String(this.pageNumber).padStart(3, "0")}.jpg`;
    a.click();
  }

  /**
   * Moves to the first page of the book and sequentially downloads all pages.
   */
  public async downloadAllPages(
    progress: ProgressCallback = () => {},
  ): Promise<void> {
    if (this.pageNumber === 1) {
      // Use this to force a refresh if we're already on the first page
      this.controller.moveToNext();
      await this.waitForNextPage();
    }
    this.controller.moveToFirst();
    await this.waitForNextPage();

    const total = this.sliderModel.get("viewerMaxPage");
    let lastPage: number;
    do {
      lastPage = this.pageNumber;
      this.downloadPage();
      this.controller.moveToNext();
      progress({ total, complete: lastPage + 1 });
      await this.waitForNextPage();
    } while (this.pageNumber !== lastPage);
  }

  /**
   * Set up viewport size
   */
  public setupViewport(width: number, height: number): void {
    const renderer = document.getElementById("renderer");
    if (!renderer) {
      alert("Could not find renderer");
      return;
    }
    renderer.style.width = `${width}px`;
    renderer.style.height = `${height}px`;
    this.controller.updatePage();
  }
}
