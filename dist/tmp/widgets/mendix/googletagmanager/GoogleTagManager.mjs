import { useEffect, createElement } from 'react';

var warn$1 = {};

Object.defineProperty(warn$1, "__esModule", {
  value: true
});
var warn = function warn(s) {
  console.warn('[react-gtm]', s);
};
warn$1.default = warn;

var _warn = warn$1;
var _warn2 = _interopRequireDefault$2(_warn);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

// https://developers.google.com/tag-manager/quickstart

var Snippets = {
  tags: function tags(_ref) {
    var id = _ref.id,
      events = _ref.events,
      dataLayer = _ref.dataLayer,
      dataLayerName = _ref.dataLayerName,
      preview = _ref.preview,
      auth = _ref.auth;
    var gtm_auth = '&gtm_auth=' + auth;
    var gtm_preview = '&gtm_preview=' + preview;
    if (!id) (0, _warn2.default)('GTM Id is required');
    var iframe = '\n      <iframe src="https://www.googletagmanager.com/ns.html?id=' + id + gtm_auth + gtm_preview + '&gtm_cookies_win=x"\n        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>';
    var script = '\n      (function(w,d,s,l,i){w[l]=w[l]||[];\n        w[l].push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\', ' + JSON.stringify(events).slice(1, -1) + '});\n        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';\n        j.async=true;j.src=\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl+\'' + gtm_auth + gtm_preview + '&gtm_cookies_win=x\';\n        f.parentNode.insertBefore(j,f);\n      })(window,document,\'script\',\'' + dataLayerName + '\',\'' + id + '\');';
    var dataLayerVar = this.dataLayer(dataLayer, dataLayerName);
    return {
      iframe: iframe,
      script: script,
      dataLayerVar: dataLayerVar
    };
  },
  dataLayer: function dataLayer(_dataLayer, dataLayerName) {
    return '\n      window.' + dataLayerName + ' = window.' + dataLayerName + ' || [];\n      window.' + dataLayerName + '.push(' + JSON.stringify(_dataLayer) + ')';
  }
};
var Snippets_1 = Snippets;

var _Snippets = Snippets_1;
var _Snippets2 = _interopRequireDefault$1(_Snippets);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var TagManager = {
  dataScript: function dataScript(dataLayer) {
    var script = document.createElement('script');
    script.innerHTML = dataLayer;
    return script;
  },
  gtm: function gtm(args) {
    var snippets = _Snippets2.default.tags(args);
    var noScript = function noScript() {
      var noscript = document.createElement('noscript');
      noscript.innerHTML = snippets.iframe;
      return noscript;
    };
    var script = function script() {
      var script = document.createElement('script');
      script.innerHTML = snippets.script;
      return script;
    };
    var dataScript = this.dataScript(snippets.dataLayerVar);
    return {
      noScript: noScript,
      script: script,
      dataScript: dataScript
    };
  },
  initialize: function initialize(_ref) {
    var gtmId = _ref.gtmId,
      _ref$events = _ref.events,
      events = _ref$events === undefined ? {} : _ref$events,
      dataLayer = _ref.dataLayer,
      _ref$dataLayerName = _ref.dataLayerName,
      dataLayerName = _ref$dataLayerName === undefined ? 'dataLayer' : _ref$dataLayerName,
      _ref$auth = _ref.auth,
      auth = _ref$auth === undefined ? '' : _ref$auth,
      _ref$preview = _ref.preview,
      preview = _ref$preview === undefined ? '' : _ref$preview;
    var gtm = this.gtm({
      id: gtmId,
      events: events,
      dataLayer: dataLayer || undefined,
      dataLayerName: dataLayerName,
      auth: auth,
      preview: preview
    });
    if (dataLayer) document.head.appendChild(gtm.dataScript);
    document.head.insertBefore(gtm.script(), document.head.childNodes[0]);
    document.body.insertBefore(gtm.noScript(), document.body.childNodes[0]);
  },
  dataLayer: function dataLayer(_ref2) {
    var _dataLayer = _ref2.dataLayer,
      _ref2$dataLayerName = _ref2.dataLayerName,
      dataLayerName = _ref2$dataLayerName === undefined ? 'dataLayer' : _ref2$dataLayerName;
    if (window[dataLayerName]) return window[dataLayerName].push(_dataLayer);
    var snippets = _Snippets2.default.dataLayer(_dataLayer, dataLayerName);
    var dataScript = this.dataScript(snippets);
    document.head.insertBefore(dataScript, document.head.childNodes[0]);
  }
};
var TagManager_1 = TagManager;

var _TagManager = TagManager_1;
var _TagManager2 = _interopRequireDefault(_TagManager);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var dist = _TagManager2.default;

const InitializeGTM = props => {
  useEffect(() => {
    const isDataUnavailable = () => {
      let dataUnavailable = false;
      console.info('additionalProps: ', props.additionalProps);
      for (const object of props.additionalProps) {
        console.info('status set: ', object.propDataSource);
        if (object.propDataSource.status !== "available" || !object.propDataSource.items.length && props.sendAdditionalProps) {
          dataUnavailable = true;
          console.info('dataUnavailable');
        }
      }
      return dataUnavailable;
    };
    const dataLayerStructure = () => {
      var dataLayer = '{"event":"' + props.pageViewEventName + '",'; // initialize the dataLayer variable

      if (props.sendPageTitle) {
        console.info('step 3.1');
        // send page title
        dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
      }
      if (props.sendModuleLocation) {
        console.info('step 3.2');
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
        console.info('step 3.3');
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
        console.info('step 3.4');
        // send session ID
        dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
      }
      if (props.sendAdditionalProps) {
        console.info('step 3.5');
        // send additional properties
        let expressionResult = "";
        console.info('additionalProps', props.additionalProps);
        for (const line of props.additionalProps) {
          console.info('line', line.propName, line);
          for (const object of line.propDataSource.items) {
            // object is an item in the list that is returned from the data source
            expressionResult += line.propValue.get(object).value + ", ";
          }
          console.info('expressionResult', expressionResult);
          expressionResult = expressionResult.replace(/,\s*$/, "");
          dataLayer += '"' + line.propName + '":"' + expressionResult + '",';
          expressionResult = "";
        }
      }
      console.info('step 3.6 finish');
      dataLayer = dataLayer.replace(/,\s*$/, ""); // remove the last comma from the dataLayer variable
      dataLayer += "}";
      console.info(dataLayer);
      return JSON.parse(dataLayer);
    };
    console.info('step 1', props.pageViewEventName);
    isDataUnavailable();
    if (!mx.ga4Connected && !mx.ga4Pending) {
      console.info('step 2', props.pageViewEventName);

      // flag to prevent onNavigation from sending multiple page views after things like after widget load, after show page, etc.

      // dataUnavailable check here because the render function will take care of calling it multiple times
      if (!mx.ga4Pending) {
        console.info('step 3', props.pageViewEventName);
        if (!isDataUnavailable()) {
          console.info('step 3 setting up navigation', props.pageViewEventName);
          const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did

          mx.ga4Pending = true; // We have set the page initialization, now toggle the switch off to avoid setting up duplicate insances
          mx.ga4Push = false;
          mx.ui.getContentForm().onNavigation = () => {
            // Custom Actions
            if (props.sendCustomProps === false) {
              const tagManagerArgsInitialize = {
                gtmId: props.measurementID
              };
              console.info('step 3 initialize start', props.pageViewEventName);
              dist.initialize(tagManagerArgsInitialize);
              console.info('step 3 initialize end', props.pageViewEventName);
            } else {
              const dataLayer = dataLayerStructure();
              const tagManagerArgs = {
                gtmId: props.measurementID,
                dataLayer
              };
              dist.initialize(tagManagerArgs);
            }
            console.info('step 3 updating flags', props.pageViewEventName);
            mx.ga4Connected = true; // We have sent the page hit, now toggle the switch off to avoid sending duplicates
            mx.ga4Pending = false;

            // Original Actions
            origOnNavigation();
            return null;
          };
        }
      }
    } else if (mx.ga4Pending && mx.ga4Push) {
      // if other pushes are needed to be done but the initialization is not yed done

      console.info('step 3.20 onNavigation follow-up push');
      if (!isDataUnavailable()) {
        const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did
        mx.ga4Push = false;
        mx.ui.getContentForm().onNavigation = () => {
          console.info('step 3.21 onNavigation follow-up push');
          origOnNavigation();
          const dataLayer = dataLayerStructure();
          window.dataLayer.push(dataLayer);
          return null;
        };
      }
    } else if (mx.ga4Push) {
      console.info('step 3.30 simple push');
      if (!isDataUnavailable()) {
        const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did

        console.info('step 3.31 simple push');
        mx.ga4Push = false;
        const dataLayer = dataLayerStructure();
        mx.ui.getContentForm().onNavigation = () => {
          console.info('step 3.31 onNavigation follow-up push');
          origOnNavigation();
          return null;
        };
        window.dataLayer.push(dataLayer);
      }
    } else {
      console.info('skipping');
    }
  }); // no dependency array -> trigger on every load

  return null;
};

function GoogleTagManager({
  measurementID,
  sendCustomProps,
  pageViewEventName,
  sendPageTitle,
  sendModuleLocation,
  sendPageURL,
  sendSessionID,
  sendAdditionalProps,
  additionalProps
}) {
  return createElement(InitializeGTM, {
    measurementID: measurementID,
    sendCustomProps: sendCustomProps,
    pageViewEventName: pageViewEventName,
    sendPageTitle: sendPageTitle,
    sendModuleLocation: sendModuleLocation,
    sendPageURL: sendPageURL,
    sendSessionID: sendSessionID,
    sendAdditionalProps: sendAdditionalProps,
    additionalProps: additionalProps
  });
}

export { GoogleTagManager };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZ2xlVGFnTWFuYWdlci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvdXRpbHMvd2Fybi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvU25pcHBldHMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZ3RtLW1vZHVsZS9kaXN0L1RhZ01hbmFnZXIuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZ3RtLW1vZHVsZS9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvSW5pdGlhbGl6ZUdUTS5qc3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvR29vZ2xlVGFnTWFuYWdlci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIHdhcm4gPSBmdW5jdGlvbiB3YXJuKHMpIHtcbiAgY29uc29sZS53YXJuKCdbcmVhY3QtZ3RtXScsIHMpO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gd2FybjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfd2FybiA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybicpO1xuXG52YXIgX3dhcm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2Fybik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3RhZy1tYW5hZ2VyL3F1aWNrc3RhcnRcblxudmFyIFNuaXBwZXRzID0ge1xuICB0YWdzOiBmdW5jdGlvbiB0YWdzKF9yZWYpIHtcbiAgICB2YXIgaWQgPSBfcmVmLmlkLFxuICAgICAgICBldmVudHMgPSBfcmVmLmV2ZW50cyxcbiAgICAgICAgZGF0YUxheWVyID0gX3JlZi5kYXRhTGF5ZXIsXG4gICAgICAgIGRhdGFMYXllck5hbWUgPSBfcmVmLmRhdGFMYXllck5hbWUsXG4gICAgICAgIHByZXZpZXcgPSBfcmVmLnByZXZpZXcsXG4gICAgICAgIGF1dGggPSBfcmVmLmF1dGg7XG5cbiAgICB2YXIgZ3RtX2F1dGggPSAnJmd0bV9hdXRoPScgKyBhdXRoO1xuICAgIHZhciBndG1fcHJldmlldyA9ICcmZ3RtX3ByZXZpZXc9JyArIHByZXZpZXc7XG5cbiAgICBpZiAoIWlkKSAoMCwgX3dhcm4yLmRlZmF1bHQpKCdHVE0gSWQgaXMgcmVxdWlyZWQnKTtcblxuICAgIHZhciBpZnJhbWUgPSAnXFxuICAgICAgPGlmcmFtZSBzcmM9XCJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ucy5odG1sP2lkPScgKyBpZCArIGd0bV9hdXRoICsgZ3RtX3ByZXZpZXcgKyAnJmd0bV9jb29raWVzX3dpbj14XCJcXG4gICAgICAgIGhlaWdodD1cIjBcIiB3aWR0aD1cIjBcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTt2aXNpYmlsaXR5OmhpZGRlblwiIGlkPVwidGFnLW1hbmFnZXJcIj48L2lmcmFtZT4nO1xuXG4gICAgdmFyIHNjcmlwdCA9ICdcXG4gICAgICAoZnVuY3Rpb24odyxkLHMsbCxpKXt3W2xdPXdbbF18fFtdO1xcbiAgICAgICAgd1tsXS5wdXNoKHtcXCdndG0uc3RhcnRcXCc6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLGV2ZW50OlxcJ2d0bS5qc1xcJywgJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50cykuc2xpY2UoMSwgLTEpICsgJ30pO1xcbiAgICAgICAgdmFyIGY9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXSxqPWQuY3JlYXRlRWxlbWVudChzKSxkbD1sIT1cXCdkYXRhTGF5ZXJcXCc/XFwnJmw9XFwnK2w6XFwnXFwnO1xcbiAgICAgICAgai5hc3luYz10cnVlO2ouc3JjPVxcJ2h0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0bS5qcz9pZD1cXCcraStkbCtcXCcnICsgZ3RtX2F1dGggKyBndG1fcHJldmlldyArICcmZ3RtX2Nvb2tpZXNfd2luPXhcXCc7XFxuICAgICAgICBmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGosZik7XFxuICAgICAgfSkod2luZG93LGRvY3VtZW50LFxcJ3NjcmlwdFxcJyxcXCcnICsgZGF0YUxheWVyTmFtZSArICdcXCcsXFwnJyArIGlkICsgJ1xcJyk7JztcblxuICAgIHZhciBkYXRhTGF5ZXJWYXIgPSB0aGlzLmRhdGFMYXllcihkYXRhTGF5ZXIsIGRhdGFMYXllck5hbWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlmcmFtZTogaWZyYW1lLFxuICAgICAgc2NyaXB0OiBzY3JpcHQsXG4gICAgICBkYXRhTGF5ZXJWYXI6IGRhdGFMYXllclZhclxuICAgIH07XG4gIH0sXG4gIGRhdGFMYXllcjogZnVuY3Rpb24gZGF0YUxheWVyKF9kYXRhTGF5ZXIsIGRhdGFMYXllck5hbWUpIHtcbiAgICByZXR1cm4gJ1xcbiAgICAgIHdpbmRvdy4nICsgZGF0YUxheWVyTmFtZSArICcgPSB3aW5kb3cuJyArIGRhdGFMYXllck5hbWUgKyAnIHx8IFtdO1xcbiAgICAgIHdpbmRvdy4nICsgZGF0YUxheWVyTmFtZSArICcucHVzaCgnICsgSlNPTi5zdHJpbmdpZnkoX2RhdGFMYXllcikgKyAnKSc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU25pcHBldHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX1NuaXBwZXRzID0gcmVxdWlyZSgnLi9TbmlwcGV0cycpO1xuXG52YXIgX1NuaXBwZXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NuaXBwZXRzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFRhZ01hbmFnZXIgPSB7XG4gIGRhdGFTY3JpcHQ6IGZ1bmN0aW9uIGRhdGFTY3JpcHQoZGF0YUxheWVyKSB7XG4gICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5pbm5lckhUTUwgPSBkYXRhTGF5ZXI7XG4gICAgcmV0dXJuIHNjcmlwdDtcbiAgfSxcbiAgZ3RtOiBmdW5jdGlvbiBndG0oYXJncykge1xuICAgIHZhciBzbmlwcGV0cyA9IF9TbmlwcGV0czIuZGVmYXVsdC50YWdzKGFyZ3MpO1xuXG4gICAgdmFyIG5vU2NyaXB0ID0gZnVuY3Rpb24gbm9TY3JpcHQoKSB7XG4gICAgICB2YXIgbm9zY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdub3NjcmlwdCcpO1xuICAgICAgbm9zY3JpcHQuaW5uZXJIVE1MID0gc25pcHBldHMuaWZyYW1lO1xuICAgICAgcmV0dXJuIG5vc2NyaXB0O1xuICAgIH07XG5cbiAgICB2YXIgc2NyaXB0ID0gZnVuY3Rpb24gc2NyaXB0KCkge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0LmlubmVySFRNTCA9IHNuaXBwZXRzLnNjcmlwdDtcbiAgICAgIHJldHVybiBzY3JpcHQ7XG4gICAgfTtcblxuICAgIHZhciBkYXRhU2NyaXB0ID0gdGhpcy5kYXRhU2NyaXB0KHNuaXBwZXRzLmRhdGFMYXllclZhcik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbm9TY3JpcHQ6IG5vU2NyaXB0LFxuICAgICAgc2NyaXB0OiBzY3JpcHQsXG4gICAgICBkYXRhU2NyaXB0OiBkYXRhU2NyaXB0XG4gICAgfTtcbiAgfSxcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShfcmVmKSB7XG4gICAgdmFyIGd0bUlkID0gX3JlZi5ndG1JZCxcbiAgICAgICAgX3JlZiRldmVudHMgPSBfcmVmLmV2ZW50cyxcbiAgICAgICAgZXZlbnRzID0gX3JlZiRldmVudHMgPT09IHVuZGVmaW5lZCA/IHt9IDogX3JlZiRldmVudHMsXG4gICAgICAgIGRhdGFMYXllciA9IF9yZWYuZGF0YUxheWVyLFxuICAgICAgICBfcmVmJGRhdGFMYXllck5hbWUgPSBfcmVmLmRhdGFMYXllck5hbWUsXG4gICAgICAgIGRhdGFMYXllck5hbWUgPSBfcmVmJGRhdGFMYXllck5hbWUgPT09IHVuZGVmaW5lZCA/ICdkYXRhTGF5ZXInIDogX3JlZiRkYXRhTGF5ZXJOYW1lLFxuICAgICAgICBfcmVmJGF1dGggPSBfcmVmLmF1dGgsXG4gICAgICAgIGF1dGggPSBfcmVmJGF1dGggPT09IHVuZGVmaW5lZCA/ICcnIDogX3JlZiRhdXRoLFxuICAgICAgICBfcmVmJHByZXZpZXcgPSBfcmVmLnByZXZpZXcsXG4gICAgICAgIHByZXZpZXcgPSBfcmVmJHByZXZpZXcgPT09IHVuZGVmaW5lZCA/ICcnIDogX3JlZiRwcmV2aWV3O1xuXG4gICAgdmFyIGd0bSA9IHRoaXMuZ3RtKHtcbiAgICAgIGlkOiBndG1JZCxcbiAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgZGF0YUxheWVyOiBkYXRhTGF5ZXIgfHwgdW5kZWZpbmVkLFxuICAgICAgZGF0YUxheWVyTmFtZTogZGF0YUxheWVyTmFtZSxcbiAgICAgIGF1dGg6IGF1dGgsXG4gICAgICBwcmV2aWV3OiBwcmV2aWV3XG4gICAgfSk7XG4gICAgaWYgKGRhdGFMYXllcikgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChndG0uZGF0YVNjcmlwdCk7XG4gICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoZ3RtLnNjcmlwdCgpLCBkb2N1bWVudC5oZWFkLmNoaWxkTm9kZXNbMF0pO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGd0bS5ub1NjcmlwdCgpLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xuICB9LFxuICBkYXRhTGF5ZXI6IGZ1bmN0aW9uIGRhdGFMYXllcihfcmVmMikge1xuICAgIHZhciBfZGF0YUxheWVyID0gX3JlZjIuZGF0YUxheWVyLFxuICAgICAgICBfcmVmMiRkYXRhTGF5ZXJOYW1lID0gX3JlZjIuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYyJGRhdGFMYXllck5hbWUgPT09IHVuZGVmaW5lZCA/ICdkYXRhTGF5ZXInIDogX3JlZjIkZGF0YUxheWVyTmFtZTtcblxuICAgIGlmICh3aW5kb3dbZGF0YUxheWVyTmFtZV0pIHJldHVybiB3aW5kb3dbZGF0YUxheWVyTmFtZV0ucHVzaChfZGF0YUxheWVyKTtcbiAgICB2YXIgc25pcHBldHMgPSBfU25pcHBldHMyLmRlZmF1bHQuZGF0YUxheWVyKF9kYXRhTGF5ZXIsIGRhdGFMYXllck5hbWUpO1xuICAgIHZhciBkYXRhU2NyaXB0ID0gdGhpcy5kYXRhU2NyaXB0KHNuaXBwZXRzKTtcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShkYXRhU2NyaXB0LCBkb2N1bWVudC5oZWFkLmNoaWxkTm9kZXNbMF0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhZ01hbmFnZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX1RhZ01hbmFnZXIgPSByZXF1aXJlKCcuL1RhZ01hbmFnZXInKTtcblxudmFyIF9UYWdNYW5hZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RhZ01hbmFnZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9UYWdNYW5hZ2VyMi5kZWZhdWx0OyIsImltcG9ydCBUYWdNYW5hZ2VyIGZyb20gXCJyZWFjdC1ndG0tbW9kdWxlXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgSW5pdGlhbGl6ZUdUTSA9IHByb3BzID0+IHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBpc0RhdGFVbmF2YWlsYWJsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhVW5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnYWRkaXRpb25hbFByb3BzOiAnLCBwcm9wcy5hZGRpdGlvbmFsUHJvcHMpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBwcm9wcy5hZGRpdGlvbmFsUHJvcHMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0YXR1cyBzZXQ6ICcsIG9iamVjdC5wcm9wRGF0YVNvdXJjZSlcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LnByb3BEYXRhU291cmNlLnN0YXR1cyAhPT0gXCJhdmFpbGFibGVcIiB8fCAoIW9iamVjdC5wcm9wRGF0YVNvdXJjZS5pdGVtcy5sZW5ndGggJiYgcHJvcHMuc2VuZEFkZGl0aW9uYWxQcm9wcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVuYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdkYXRhVW5hdmFpbGFibGUnKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGFVbmF2YWlsYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZGF0YUxheWVyU3RydWN0dXJlID0gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGRhdGFMYXllciA9ICd7XCJldmVudFwiOlwiJyArIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lICsgJ1wiLCc7IC8vIGluaXRpYWxpemUgdGhlIGRhdGFMYXllciB2YXJpYWJsZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocHJvcHMuc2VuZFBhZ2VUaXRsZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzLjEnKVxuICAgICAgICAgICAgICAgIC8vIHNlbmQgcGFnZSB0aXRsZVxuICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCJQYWdlIE5hbWVcIjpcIicgKyBteC51aS5nZXRDb250ZW50Rm9ybSgpLnRpdGxlICsgJ1wiLCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kTW9kdWxlTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy4yJylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIG1vZHVsZSBsb2NhdGlvblxuICAgICAgICAgICAgICAgIHZhciBtb2R1bGVQYXRoID0gbXgudWkuZ2V0Q29udGVudEZvcm0oKS5wYXRoO1xuICAgICAgICAgICAgICAgIHZhciBtb2R1bGVMb2NhdGlvbiA9IGZ1bmN0aW9uIChtb2RQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYWdlRXh0ZW5zaW9uID0gXCIucGFnZS54bWxcIjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBtb2RQYXRoLnN1YnN0cigwLCBtb2RQYXRoLmxlbmd0aCAtIHBhZ2VFeHRlbnNpb24ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiTW9kdWxlIExvY2F0aW9uXCI6XCInICsgbW9kdWxlTG9jYXRpb24obW9kdWxlUGF0aCkgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRQYWdlVVJMKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuMycpXG4gICAgICAgICAgICAgICAgLy8gc2VuZCBwYWdlIFVSTFxuICAgICAgICAgICAgICAgIHZhciBwYWdlVVJMO1xuICAgICAgICAgICAgICAgIGlmIChteC51aS5nZXRDb250ZW50Rm9ybSgpLnVybCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlVVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIG14LnVpLmdldENvbnRlbnRGb3JtKCkudXJsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0cmltbWVkVVJMID0gZnVuY3Rpb24gKGZ1bGxVUkwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RDaGFySW5kZXggPSBmdWxsVVJMLmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZFN0cmluZyA9IGZ1bGxVUkwuc3Vic3RyaW5nKGxhc3RDaGFySW5kZXggKyAxLCBmdWxsVVJMLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihlbmRTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVsbFVSTDsgLy8gdGhlIGVuZCBvZiB0aGUgc3RyaW5nIGlzbid0IGEgbnVtYmVyLCByZXR1cm4gdGhlIHdob2xlIHRoaW5nXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVsbFVSTC5zdWJzdHIoMCwgbGFzdENoYXJJbmRleCk7IC8vIHRoZSBlbmQgb2YgdGhlIHN0cmluZyBpcyBhIG51bWJlciwgdHJpbSBpdFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiUGFnZSBVUkxcIjpcIicgKyB0cmltbWVkVVJMKHBhZ2VVUkwpICsgJ1wiLCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kU2Vzc2lvbklEKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuNCcpXG4gICAgICAgICAgICAgICAgLy8gc2VuZCBzZXNzaW9uIElEXG4gICAgICAgICAgICAgICAgZGF0YUxheWVyICs9ICdcIlNlc3Npb24gSURcIjpcIicgKyBteC5zZXNzaW9uLmdldFNlc3Npb25PYmplY3RJZCgpICsgJ1wiLCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kQWRkaXRpb25hbFByb3BzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuNScpXG4gICAgICAgICAgICAgICAgLy8gc2VuZCBhZGRpdGlvbmFsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBsZXQgZXhwcmVzc2lvblJlc3VsdCA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2FkZGl0aW9uYWxQcm9wcycsIHByb3BzLmFkZGl0aW9uYWxQcm9wcylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcHJvcHMuYWRkaXRpb25hbFByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnbGluZScsIGxpbmUucHJvcE5hbWUsIGxpbmUpXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIGxpbmUucHJvcERhdGFTb3VyY2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdCBpcyBhbiBpdGVtIGluIHRoZSBsaXN0IHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGUgZGF0YSBzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25SZXN1bHQgKz0gbGluZS5wcm9wVmFsdWUuZ2V0KG9iamVjdCkudmFsdWUgKyBcIiwgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2V4cHJlc3Npb25SZXN1bHQnICwgZXhwcmVzc2lvblJlc3VsdClcblxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uUmVzdWx0ID0gZXhwcmVzc2lvblJlc3VsdC5yZXBsYWNlKC8sXFxzKiQvLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUxheWVyICs9ICdcIicgKyBsaW5lLnByb3BOYW1lICsgJ1wiOlwiJyArIGV4cHJlc3Npb25SZXN1bHQgKyAnXCIsJztcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvblJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuNiBmaW5pc2gnKVxuXG4gICAgICAgICAgICBkYXRhTGF5ZXIgPSBkYXRhTGF5ZXIucmVwbGFjZSgvLFxccyokLywgXCJcIik7IC8vIHJlbW92ZSB0aGUgbGFzdCBjb21tYSBmcm9tIHRoZSBkYXRhTGF5ZXIgdmFyaWFibGVcbiAgICAgICAgICAgIGRhdGFMYXllciArPSBcIn1cIjtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhkYXRhTGF5ZXIpXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhTGF5ZXIpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDEnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgaXNEYXRhVW5hdmFpbGFibGUocHJvcHMpXG4gICAgICAgIGlmICghbXguZ2E0Q29ubmVjdGVkICYmICFteC5nYTRQZW5kaW5nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMicsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuXG4gICAgICAgICAgICAvLyBmbGFnIHRvIHByZXZlbnQgb25OYXZpZ2F0aW9uIGZyb20gc2VuZGluZyBtdWx0aXBsZSBwYWdlIHZpZXdzIGFmdGVyIHRoaW5ncyBsaWtlIGFmdGVyIHdpZGdldCBsb2FkLCBhZnRlciBzaG93IHBhZ2UsIGV0Yy5cblxuICAgICAgICAgICAgLy8gZGF0YVVuYXZhaWxhYmxlIGNoZWNrIGhlcmUgYmVjYXVzZSB0aGUgcmVuZGVyIGZ1bmN0aW9uIHdpbGwgdGFrZSBjYXJlIG9mIGNhbGxpbmcgaXQgbXVsdGlwbGUgdGltZXNcbiAgICAgICAgICAgIGlmICghbXguZ2E0UGVuZGluZykge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICBpZiAoIWlzRGF0YVVuYXZhaWxhYmxlKHByb3BzKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMyBzZXR0aW5nIHVwIG5hdmlnYXRpb24nLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ09uTmF2aWdhdGlvbiA9IG14LnVpLmdldENvbnRlbnRGb3JtKCkub25OYXZpZ2F0aW9uOyAvLyBzYXZlIHdoYXQgdGhlIG9yaWdpbmFsIG9uTmF2aWdhdGlvbiBmdW5jdGlvbiBkaWRcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIG14LmdhNFBlbmRpbmcgPSB0cnVlOyAvLyBXZSBoYXZlIHNldCB0aGUgcGFnZSBpbml0aWFsaXphdGlvbiwgbm93IHRvZ2dsZSB0aGUgc3dpdGNoIG9mZiB0byBhdm9pZCBzZXR0aW5nIHVwIGR1cGxpY2F0ZSBpbnNhbmNlc1xuICAgICAgICAgICAgICAgICAgICBteC5nYTRQdXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDdXN0b20gQWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRDdXN0b21Qcm9wcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdNYW5hZ2VyQXJnc0luaXRpYWxpemUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd0bUlkOiBwcm9wcy5tZWFzdXJlbWVudElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMyBpbml0aWFsaXplIHN0YXJ0JywgcHJvcHMucGFnZVZpZXdFdmVudE5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGFnTWFuYWdlci5pbml0aWFsaXplKHRhZ01hbmFnZXJBcmdzSW5pdGlhbGl6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMgaW5pdGlhbGl6ZSBlbmQnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YUxheWVyID0gZGF0YUxheWVyU3RydWN0dXJlKHByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdNYW5hZ2VyQXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3RtSWQ6IHByb3BzLm1lYXN1cmVtZW50SUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFMYXllclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGFnTWFuYWdlci5pbml0aWFsaXplKHRhZ01hbmFnZXJBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzIHVwZGF0aW5nIGZsYWdzJywgcHJvcHMucGFnZVZpZXdFdmVudE5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG14LmdhNENvbm5lY3RlZCA9IHRydWU7IC8vIFdlIGhhdmUgc2VudCB0aGUgcGFnZSBoaXQsIG5vdyB0b2dnbGUgdGhlIHN3aXRjaCBvZmYgdG8gYXZvaWQgc2VuZGluZyBkdXBsaWNhdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBteC5nYTRQZW5kaW5nID0gZmFsc2U7IFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPcmlnaW5hbCBBY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnT25OYXZpZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChteC5nYTRQZW5kaW5nICYmIG14LmdhNFB1c2gpIHsgLy8gaWYgb3RoZXIgcHVzaGVzIGFyZSBuZWVkZWQgdG8gYmUgZG9uZSBidXQgdGhlIGluaXRpYWxpemF0aW9uIGlzIG5vdCB5ZWQgZG9uZVxuXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy4yMCBvbk5hdmlnYXRpb24gZm9sbG93LXVwIHB1c2gnKVxuICAgICAgICAgICAgaWYgKCFpc0RhdGFVbmF2YWlsYWJsZShwcm9wcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnT25OYXZpZ2F0aW9uID0gbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb247IC8vIHNhdmUgd2hhdCB0aGUgb3JpZ2luYWwgb25OYXZpZ2F0aW9uIGZ1bmN0aW9uIGRpZFxuICAgICAgICAgICAgICAgIG14LmdhNFB1c2ggPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIG14LnVpLmdldENvbnRlbnRGb3JtKCkub25OYXZpZ2F0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy4yMSBvbk5hdmlnYXRpb24gZm9sbG93LXVwIHB1c2gnKVxuICAgICAgICAgICAgICAgICAgICBvcmlnT25OYXZpZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YUxheWVyID0gZGF0YUxheWVyU3RydWN0dXJlKHByb3BzKTtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goZGF0YUxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG14LmdhNFB1c2gpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzLjMwIHNpbXBsZSBwdXNoJylcblxuICAgICAgICAgICAgaWYgKCFpc0RhdGFVbmF2YWlsYWJsZShwcm9wcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnT25OYXZpZ2F0aW9uID0gbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb247IC8vIHNhdmUgd2hhdCB0aGUgb3JpZ2luYWwgb25OYXZpZ2F0aW9uIGZ1bmN0aW9uIGRpZFxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuMzEgc2ltcGxlIHB1c2gnKVxuICAgICAgICAgICAgICAgIG14LmdhNFB1c2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhTGF5ZXIgPSBkYXRhTGF5ZXJTdHJ1Y3R1cmUocHJvcHMpO1xuICAgICAgICAgICAgICAgIG14LnVpLmdldENvbnRlbnRGb3JtKCkub25OYXZpZ2F0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy4zMSBvbk5hdmlnYXRpb24gZm9sbG93LXVwIHB1c2gnKVxuICAgICAgICAgICAgICAgICAgICBvcmlnT25OYXZpZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaChkYXRhTGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdza2lwcGluZycpXG4gICAgICAgIH1cbiAgICB9KTsgLy8gbm8gZGVwZW5kZW5jeSBhcnJheSAtPiB0cmlnZ2VyIG9uIGV2ZXJ5IGxvYWRcblxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5pdGlhbGl6ZUdUTTtcbiIsImltcG9ydCBJbml0aWFsaXplR1RNIGZyb20gXCIuL2NvbXBvbmVudHMvSW5pdGlhbGl6ZUdUTVwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gR29vZ2xlVGFnTWFuYWdlcih7XG4gICAgbWVhc3VyZW1lbnRJRCxcbiAgICBzZW5kQ3VzdG9tUHJvcHMsXG4gICAgcGFnZVZpZXdFdmVudE5hbWUsXG4gICAgc2VuZFBhZ2VUaXRsZSxcbiAgICBzZW5kTW9kdWxlTG9jYXRpb24sXG4gICAgc2VuZFBhZ2VVUkwsXG4gICAgc2VuZFNlc3Npb25JRCxcbiAgICBzZW5kQWRkaXRpb25hbFByb3BzLFxuICAgIGFkZGl0aW9uYWxQcm9wc1xufSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxJbml0aWFsaXplR1RNXG4gICAgICAgICAgICBtZWFzdXJlbWVudElEPXttZWFzdXJlbWVudElEfVxuICAgICAgICAgICAgc2VuZEN1c3RvbVByb3BzPXtzZW5kQ3VzdG9tUHJvcHN9XG4gICAgICAgICAgICBwYWdlVmlld0V2ZW50TmFtZT17cGFnZVZpZXdFdmVudE5hbWV9XG4gICAgICAgICAgICBzZW5kUGFnZVRpdGxlPXtzZW5kUGFnZVRpdGxlfVxuICAgICAgICAgICAgc2VuZE1vZHVsZUxvY2F0aW9uPXtzZW5kTW9kdWxlTG9jYXRpb259XG4gICAgICAgICAgICBzZW5kUGFnZVVSTD17c2VuZFBhZ2VVUkx9XG4gICAgICAgICAgICBzZW5kU2Vzc2lvbklEPXtzZW5kU2Vzc2lvbklEfVxuICAgICAgICAgICAgc2VuZEFkZGl0aW9uYWxQcm9wcz17c2VuZEFkZGl0aW9uYWxQcm9wc31cbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wcz17YWRkaXRpb25hbFByb3BzfVxuICAgICAgICAvPlxuICAgICk7XG59XG4iXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ3YXJuIiwicyIsImNvbnNvbGUiLCJfd2FybiIsInJlcXVpcmUiLCJfd2FybjIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJTbmlwcGV0cyIsInRhZ3MiLCJfcmVmIiwiaWQiLCJldmVudHMiLCJkYXRhTGF5ZXIiLCJkYXRhTGF5ZXJOYW1lIiwicHJldmlldyIsImF1dGgiLCJndG1fYXV0aCIsImd0bV9wcmV2aWV3IiwiaWZyYW1lIiwic2NyaXB0IiwiSlNPTiIsInN0cmluZ2lmeSIsInNsaWNlIiwiZGF0YUxheWVyVmFyIiwiX2RhdGFMYXllciIsIm1vZHVsZSIsIl9TbmlwcGV0cyIsIl9TbmlwcGV0czIiLCJUYWdNYW5hZ2VyIiwiZGF0YVNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImd0bSIsImFyZ3MiLCJzbmlwcGV0cyIsIm5vU2NyaXB0Iiwibm9zY3JpcHQiLCJpbml0aWFsaXplIiwiZ3RtSWQiLCJfcmVmJGV2ZW50cyIsInVuZGVmaW5lZCIsIl9yZWYkZGF0YUxheWVyTmFtZSIsIl9yZWYkYXV0aCIsIl9yZWYkcHJldmlldyIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJib2R5IiwiX3JlZjIiLCJfcmVmMiRkYXRhTGF5ZXJOYW1lIiwid2luZG93IiwicHVzaCIsIl9UYWdNYW5hZ2VyIiwiX1RhZ01hbmFnZXIyIiwiSW5pdGlhbGl6ZUdUTSIsInByb3BzIiwidXNlRWZmZWN0IiwiaXNEYXRhVW5hdmFpbGFibGUiLCJkYXRhVW5hdmFpbGFibGUiLCJpbmZvIiwiYWRkaXRpb25hbFByb3BzIiwib2JqZWN0IiwicHJvcERhdGFTb3VyY2UiLCJzdGF0dXMiLCJpdGVtcyIsImxlbmd0aCIsInNlbmRBZGRpdGlvbmFsUHJvcHMiLCJkYXRhTGF5ZXJTdHJ1Y3R1cmUiLCJwYWdlVmlld0V2ZW50TmFtZSIsInNlbmRQYWdlVGl0bGUiLCJteCIsInVpIiwiZ2V0Q29udGVudEZvcm0iLCJ0aXRsZSIsInNlbmRNb2R1bGVMb2NhdGlvbiIsIm1vZHVsZVBhdGgiLCJwYXRoIiwibW9kdWxlTG9jYXRpb24iLCJtb2RQYXRoIiwicGFnZUV4dGVuc2lvbiIsInN1YnN0ciIsInNlbmRQYWdlVVJMIiwicGFnZVVSTCIsInVybCIsImxvY2F0aW9uIiwib3JpZ2luIiwidHJpbW1lZFVSTCIsImZ1bGxVUkwiLCJsYXN0Q2hhckluZGV4IiwibGFzdEluZGV4T2YiLCJlbmRTdHJpbmciLCJzdWJzdHJpbmciLCJpc05hTiIsInNlbmRTZXNzaW9uSUQiLCJzZXNzaW9uIiwiZ2V0U2Vzc2lvbk9iamVjdElkIiwiZXhwcmVzc2lvblJlc3VsdCIsImxpbmUiLCJwcm9wTmFtZSIsInByb3BWYWx1ZSIsImdldCIsInJlcGxhY2UiLCJwYXJzZSIsImdhNENvbm5lY3RlZCIsImdhNFBlbmRpbmciLCJvcmlnT25OYXZpZ2F0aW9uIiwib25OYXZpZ2F0aW9uIiwiZ2E0UHVzaCIsInNlbmRDdXN0b21Qcm9wcyIsInRhZ01hbmFnZXJBcmdzSW5pdGlhbGl6ZSIsIm1lYXN1cmVtZW50SUQiLCJ0YWdNYW5hZ2VyQXJncyIsIkdvb2dsZVRhZ01hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFFQUEsTUFBTSxDQUFDQyxjQUFjLENBQUNDLE1BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0NDLEVBQUFBLEtBQUssRUFBRSxJQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUE7QUFDRixJQUFJQyxJQUFJLEdBQUcsU0FBU0EsSUFBSUEsQ0FBQ0MsQ0FBQyxFQUFFO0FBQzFCQyxFQUFBQSxPQUFPLENBQUNGLElBQUksQ0FBQyxhQUFhLEVBQUVDLENBQUMsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQTtBQUVESCxNQUFBQSxDQUFBQSxPQUFlLEdBQUdFOztBQ1BsQixJQUFJRyxLQUFLLEdBQUdDLE1BQXVCLENBQUE7QUFFbkMsSUFBSUMsTUFBTSxHQUFHQyx3QkFBc0IsQ0FBQ0gsS0FBSyxDQUFDLENBQUE7QUFFMUMsU0FBU0csd0JBQXNCQSxDQUFDQyxHQUFHLEVBQUU7QUFBRSxFQUFBLE9BQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFVLEdBQUdELEdBQUcsR0FBRztBQUFFRSxJQUFBQSxPQUFPLEVBQUVGLEdBQUFBO0dBQUssQ0FBQTtBQUFFLENBQUE7O0FBRTlGOztBQUVBLElBQUlHLFFBQVEsR0FBRztBQUNiQyxFQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQ0MsSUFBSSxFQUFFO0FBQ3hCLElBQUEsSUFBSUMsRUFB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
