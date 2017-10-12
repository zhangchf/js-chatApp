import $ from "jquery";
import {ElementComponent} from "../../lib/component";

class PlayerComponent extends ElementComponent {
    constructor() {
        super();
    }

    _onAttach() {
        const $title = this._$mount.find("h1");
        $title.text("Player!");

    }
}

// let component = new PlayerComponent();
// component.attach($("section.player"));

// Enable hot module replacement.
let component;
try {
    component = new PlayerComponent();
    component.attach($("section.player"));
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