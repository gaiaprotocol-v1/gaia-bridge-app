import { BrowserInfo, msg } from "skydapp-browser";
import { SkyRouter } from "skydapp-common";
import superagent from "superagent";
import Layout from "./view/Layout";
import Mix from "./view/Mix";
import Pax from "./view/Pax";

(async () => {
    msg.language = BrowserInfo.language;
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);
    SkyRouter.route("mix", Mix);
    SkyRouter.route("pax", Pax);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();