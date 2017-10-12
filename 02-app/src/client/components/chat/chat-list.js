import {ElementComponent} from "../../lib/component";

export class ChatListComponent extends ElementComponent {
    constructor() {
        super("div");
        this.$element.addClass("chat-messages");
    }
}
