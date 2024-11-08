import TagManager from "react-gtm-module";
import { useEffect } from "react";

const InitializeGTM = props => {
    useEffect(() => {
        const isDataUnavailable = () => {
            let dataUnavailable = false;
            // console.info('additionalProps: ', props.additionalProps)
            for (const object of props.additionalProps) {
                // console.info('status set: ', object.propDataSource)
                if (object.propDataSource.status !== "available" || (!object.propDataSource.items.length && props.sendAdditionalProps)) {
                    dataUnavailable = true;
                    // console.info('dataUnavailable')

                }
            }
            return dataUnavailable;
        }
        
        const dataLayerStructure = () => {
            var dataLayer = '{"event":"' + props.pageViewEventName + '",'; // initialize the dataLayer variable
            
            if (props.sendPageTitle) {
                // console.info('step 3.1')
                // send page title
                dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
            }
            
            if (props.sendModuleLocation) {
                // console.info('step 3.2')
                // send module location
                var modulePath = mx.ui.getContentForm().path;
                var moduleLocation = function (modPath) {
                    var pageExtension = ".page.xml";
                    var path = modPath.substr(0, modPath.length - pageExtension.length);
                    return path;
                };
                dataLayer += '"Module Location":"' + moduleLocation(modulePath) + '",';
            }
            
            if (props.sendPageURL) {
                // console.info('step 3.3')
                // send page URL
                var pageURL;
                if (mx.ui.getContentForm().url !== null) {
                    pageURL = window.location.origin + mx.ui.getContentForm().url;
                } else {
                    pageURL = window.location.origin;
                }

                var trimmedURL = function (fullURL) {
                    var lastCharIndex = fullURL.lastIndexOf("/");
                    var endString = fullURL.substring(lastCharIndex + 1, fullURL.length);
                    if (isNaN(endString)) {
                        return fullURL; // the end of the string isn't a number, return the whole thing
                    } else {
                        return fullURL.substr(0, lastCharIndex); // the end of the string is a number, trim it
                    }
                };
                dataLayer += '"Page URL":"' + trimmedURL(pageURL) + '",';
            }
            
            if (props.sendSessionID) {
                // console.info('step 3.4')
                // send session ID
                dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
            }
            
            if (props.sendAdditionalProps) {
                // console.info('step 3.5')
                // send additional properties
                let expressionResult = "";

                // console.info('additionalProps', props.additionalProps)
                for (const line of props.additionalProps) {
                    // console.info('line', line.propName, line)
                    for (const object of line.propDataSource.items) {
                        // object is an item in the list that is returned from the data source
                        expressionResult += line.propValue.get(object).value + ", ";
                        
                    }
                    // console.info('expressionResult' , expressionResult)

                    expressionResult = expressionResult.replace(/,\s*$/, "");
                    dataLayer += '"' + line.propName + '":"' + expressionResult + '",';
                    expressionResult = "";
                }
            }
            // console.info('step 3.6 finish')

            dataLayer = dataLayer.replace(/,\s*$/, ""); // remove the last comma from the dataLayer variable
            dataLayer += "}";
            // console.info(JSON.parse(dataLayer))
            return JSON.parse(dataLayer);
        };


        // console.info('step 1', props.pageViewEventName)
        isDataUnavailable(props)
        if (!mx.ga4Connected && !mx.ga4Pending) {
            // console.info('step 2', props.pageViewEventName)

            // flag to prevent onNavigation from sending multiple page views after things like after widget load, after show page, etc.

            // dataUnavailable check here because the render function will take care of calling it multiple times
            if (!mx.ga4Pending) {

                // console.info('step 3', props.pageViewEventName)
                if (!isDataUnavailable(props)) {

                    
                    // console.info('step 3 setting up navigation', props.pageViewEventName)
                    const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did
                    
                    mx.ga4Pending = true; // We have set the page initialization, now toggle the switch off to avoid setting up duplicate insances
                    mx.ga4Push = false;
                    
                    
                    mx.ui.getContentForm().onNavigation = () => {
                        // Custom Actions
                        if (props.sendCustomProps === false) {
                            const tagManagerArgsInitialize = {
                                gtmId: props.measurementID
                            };
                            // console.info('step 3 initialize start', props.pageViewEventName)
                            
                            TagManager.initialize(tagManagerArgsInitialize);
                            // console.info('step 3 initialize end', props.pageViewEventName)
                            
                        } else {
                            
                            const dataLayer = dataLayerStructure(props);
                            
                            const tagManagerArgs = {
                                gtmId: props.measurementID,
                                dataLayer
                            };
                            
                            TagManager.initialize(tagManagerArgs);
                        }
                        // console.info('step 3 updating flags', props.pageViewEventName)
                        
                        mx.ga4Connected = true; // We have sent the page hit, now toggle the switch off to avoid sending duplicates
                        mx.ga4Pending = false; 
                        
                        // Original Actions
                        origOnNavigation();
                        
                        return null;
                    };
                }
            }
        } else if (mx.ga4Pending && mx.ga4Push) { // if other pushes are needed to be done but the initialization is not yed done

            // console.info('step 3.20 onNavigation follow-up push')
            if (!isDataUnavailable(props)) {
                const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did
                mx.ga4Push = false;

                mx.ui.getContentForm().onNavigation = () => {
                    // console.info('step 3.21 onNavigation follow-up push')
                    origOnNavigation();

                    const dataLayer = dataLayerStructure(props);

                    window.dataLayer.push(dataLayer);
                            
                    return null;
                }
            }
        } else if (mx.ga4Push) {
            // console.info('step 3.30 simple push')

            if (!isDataUnavailable(props)) {
                const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did

                // console.info('step 3.31 simple push')
                mx.ga4Push = false;
                const dataLayer = dataLayerStructure(props);
                mx.ui.getContentForm().onNavigation = () => {
                    // console.info('step 3.31 onNavigation follow-up push')
                    origOnNavigation();
                            
                    return null;
                }

                window.dataLayer.push(dataLayer);
            }
        } else {
            // console.info('skipping')
        }
    }); // no dependency array -> trigger on every load

    return null;
};

export default InitializeGTM;
