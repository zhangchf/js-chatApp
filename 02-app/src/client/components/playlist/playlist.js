import $ from "jquery";
import {ComponentBase} from "../../lib/component";

import "./playlist.scss";

import {PlaylistToolbarComponent} from "./toolbar";
import {PlaylistContextMenuComponent} from "./context-menu";
import {PlaylistListComponent} from "./list";
import {PlaylistChromeComponent} from "./chrome";

class PlaylistComponent extends ComponentBase {
    constructor() {
        super();
    }

    _onAttach() {
        const $title = this._$mount.find("> h1");
        $title.text("Playlist");

        const toolbar = new PlaylistToolbarComponent();
        toolbar.attach(this._$mount);
        this.children.push(toolbar);

        const contextMenu = new PlaylistContextMenuComponent();
        contextMenu.attach(this._$mount);
        this.children.push(contextMenu);

        const list = new PlaylistListComponent();
        list.attach(this._$mount);
        this.children.push(list);

        const chrome = new PlaylistChromeComponent();
        chrome.attach(this._$mount);
        this.children.push(chrome);
    }
}

let component;
try {
    component = new PlaylistComponent();
    component.attach($("section.playlist"));
}
catch (e) {
    console.error(e);
    if (component) {
        component.detach();
    }
}
finally {
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => component && component.detach());
    }
}