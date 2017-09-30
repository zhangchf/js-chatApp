import $ from "jquery";
import {blegh} from "shared/test";
import "./application.scss";

blegh();

$("body").html("Hello World asfsdf");

// webpack-hot-middleware config: hot reloading code module
if (module.hot) {
    module.hot.accept();
}
