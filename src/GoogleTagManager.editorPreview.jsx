import { createElement } from "react";
import InitializeGTM from "./components/InitializeGTM";

export function GoogleTagManager({ measurementID, sendCustomProps, pageViewEventName, sendPageTitle, sendModuleLocation, sendPageURL, sendSessionID, sendAdditionalProps, additionalProps }) {
    return <InitializeGTM measurementID={measurementID} sendCustomProps={sendCustomProps} pageViewEventName={pageViewEventName} sendPageTitle={sendPageTitle} sendModuleLocation={sendModuleLocation} sendPageURL={sendPageURL} sendSessionID={sendSessionID} sendAdditionalProps={sendAdditionalProps} additionalProps={additionalProps} />;
}

export function getPreviewCss() {
    return require("./ui/GoogleTagManager.css");
}
