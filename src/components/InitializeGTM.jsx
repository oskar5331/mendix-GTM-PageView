import { useEffect } from "react";
import TagManager from 'react-gtm-module'

const InitializeGTM = ( props ) => {

  useEffect(() => {

    if (!mx.ga4Connected) { // flag to prevent onNavigation from sending multiple page views after things like after widget load, after show page, etc.
      
      // dataUnavailable check here because the render function will take care of calling it multiple times
      let dataUnavailable = false;
      for (let object of props.additionalProps) {
        if (object.propDataSource.status !== 'available') {
          dataUnavailable = true;
        }
      }

      if (!dataUnavailable) {

        const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did
        mx.ui.getContentForm().onNavigation = () => {
          
          // Custom Actions
          if (props.sendCustomProps === false) {
            const tagManagerArgsInitialize = {
              gtmId: props.measurementID
            }

            TagManager.initialize(tagManagerArgsInitialize)
          }
          
          else {
            let dataLayerStructure = function(props) {
              var dataLayer = '{"event":"' + props.pageViewEventName + '",'; // initialize the dataLayer variable

              if (props.sendPageTitle) { // send page title
                dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
              }

              if (props.sendModuleLocation) { // send module location
                var modulePath = mx.ui.getContentForm().path;
                var moduleLocation = (function(modulePath) {
                  var pageExtension = ".page.xml";
                  var path = modulePath.substr(0, modulePath.length - pageExtension.length);
                  return path;
                }(modulePath));
                dataLayer += '"Module Location":"' + moduleLocation + '",';
              }

              if (props.sendPageURL) { // send page URL
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

              if (props.sendSessionID) { // send session ID
                dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
              }

              if (props.sendAdditionalProps) { // send additional properties
                let expressionResult= '';

                for (let line of props.additionalProps) {
                  for (let object of line.propDataSource.items) { // object is an item in the list that is returned from the data source
                    expressionResult += line.propValue.get(object).value + ', ';
                  }

                  expressionResult = expressionResult.replace(/,\s*$/, "");
                  dataLayer += '"' + line.propName + '":"' + expressionResult + '",';
                  expressionResult = '';
                }
              }
              
              dataLayer = dataLayer.replace(/,\s*$/, ""); // remove the last comma from the dataLayer variable
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

          mx.ga4Connected = true; // We have sent the page hit, now toggle the switch off to avoid sending duplicates

          // Original Actions
          origOnNavigation();
        

          return () => {
            null;
          } 
        }
      }
    }
  }); // no dependency array -> trigger on every load

  return null;
}

export default InitializeGTM