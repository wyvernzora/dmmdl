
declare interface PageSliderModel {
    get(name: "viewerPage"): number
}

declare interface RendererModel {
    get(name: "viewerTransitionState"): number
}

declare interface View<T> {
    get model(): T
}

declare interface Controller {
    moveToFirst(): void;
    moveToNext(): void;
}

declare namespace NFBR.a6G.Initializer.views_ {
    var pageSlider: View<PageSliderModel> & { a6l: Controller }
    var renderer: View<RendererModel>
}
