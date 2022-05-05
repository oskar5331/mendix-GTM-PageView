import { useEffect } from "react";
import TagManager from 'react-gtm-module'

const InitializeGTM = ( props ) => {

  useEffect(() => {

    if (!mx.ga4Connected) { // we need the flag because onNavigation is called several times for things like after widget load, after show page, etc. If we remove the flag, then we send more than one page hit per page viewing
      const origOnNavigation = mx.ui.getContentForm().onNavigation; // cache what the original function did
      mx.ui.getContentForm().onNavigation = () => {
        // Complete custom actions
        debugger;
        if (props.sendCustomProps === false) {
          // onNavigation, flag goes in mx.<something>
          const tagManagerArgsInitialize = {
            gtmId: props.measurementID
          }

          TagManager.initialize(tagManagerArgsInitialize)
        }
        
        else {
          //

          let dataLayerStructure = function(props) {
            var dataLayer = '{"event":"' + props.pageViewEventName + '",';

            if (props.sendPageTitle) {
              dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
            }

            if (props.sendModuleLocation) {
              var modulePath = mx.ui.getContentForm().path;
              var moduleLocation = (function(modulePath) {
                var pageExtension = ".page.xml";
                var path = modulePath.substr(0, modulePath.length - pageExtension.length);
                return path;
              }(modulePath));
              dataLayer += '"Module Location":"' + moduleLocation + '",';
            }

            if (props.sendPageURL) {
              if (mx.ui.getContentForm().url !== null) {
                var pageURL = window.location.origin + mx.ui.getContentForm().url;
              }
              
              else {
                var pageURL = window.location.origin;
              }

              var trimmedURL = (function(fullURL) {
                var lastCharIndex = fullURL.lastIndexOf("/");
                var endString = fullURL.substring(lastCharIndex + 1,fullURL.length);
                if (isNaN(endString)) {
                  return fullURL; // the end of the string isn't a number, return the whole thing
                }
                else {
                  return fullPath.substr(0,lastCharIndex); // the end of the string is a number, trim it
                }
              }(pageURL));
              dataLayer += '"Page URL":"' + trimmedURL + '",';
            }

            if (props.sendSessionID) {
              dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
            }

            if (props.sendAdditionalProps) {
              for (const [propName, propValue] of Object.entries(props.additionalProps)) {
              dataLayer += '"' + propValue.propName + '":"' + propValue.propValue.value + '",';
              }
            }
            
            dataLayer = dataLayer.replace(/,\s*$/, ""); // remove the last comma
            dataLayer += "}"
            return JSON.parse(dataLayer);
          }

          let dataLayer = dataLayerStructure(props);

          const tagManagerArgs = {
            gtmId: props.measurementID,
            dataLayer
          }
          TagManager.initialize(tagManagerArgs)
        }

        //mx.previousLayout = mx.ui.getContentForm()._currentLayouts[0]; // set the previous layout after the page has loaded for the next comparison
        mx.ga4Connected = true;

        // Complete original actions
        origOnNavigation();

        return () => {
          null;
        } 
      }
    }
  }, []);

  return null;

}

export default InitializeGTM