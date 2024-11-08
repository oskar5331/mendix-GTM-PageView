define(['exports', 'react'], (function (exports, react) { 'use strict';

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
    react.useEffect(() => {
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
    return react.createElement(InitializeGTM, {
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

  exports.GoogleTagManager = GoogleTagManager;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZ2xlVGFnTWFuYWdlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWd0bS1tb2R1bGUvZGlzdC91dGlscy93YXJuLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWd0bS1tb2R1bGUvZGlzdC9TbmlwcGV0cy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvVGFnTWFuYWdlci5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Jbml0aWFsaXplR1RNLmpzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9Hb29nbGVUYWdNYW5hZ2VyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgd2FybiA9IGZ1bmN0aW9uIHdhcm4ocykge1xuICBjb25zb2xlLndhcm4oJ1tyZWFjdC1ndG1dJywgcyk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB3YXJuOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF93YXJuID0gcmVxdWlyZSgnLi91dGlscy93YXJuJyk7XG5cbnZhciBfd2FybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vdGFnLW1hbmFnZXIvcXVpY2tzdGFydFxuXG52YXIgU25pcHBldHMgPSB7XG4gIHRhZ3M6IGZ1bmN0aW9uIHRhZ3MoX3JlZikge1xuICAgIHZhciBpZCA9IF9yZWYuaWQsXG4gICAgICAgIGV2ZW50cyA9IF9yZWYuZXZlbnRzLFxuICAgICAgICBkYXRhTGF5ZXIgPSBfcmVmLmRhdGFMYXllcixcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgcHJldmlldyA9IF9yZWYucHJldmlldyxcbiAgICAgICAgYXV0aCA9IF9yZWYuYXV0aDtcblxuICAgIHZhciBndG1fYXV0aCA9ICcmZ3RtX2F1dGg9JyArIGF1dGg7XG4gICAgdmFyIGd0bV9wcmV2aWV3ID0gJyZndG1fcHJldmlldz0nICsgcHJldmlldztcblxuICAgIGlmICghaWQpICgwLCBfd2FybjIuZGVmYXVsdCkoJ0dUTSBJZCBpcyByZXF1aXJlZCcpO1xuXG4gICAgdmFyIGlmcmFtZSA9ICdcXG4gICAgICA8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL25zLmh0bWw/aWQ9JyArIGlkICsgZ3RtX2F1dGggKyBndG1fcHJldmlldyArICcmZ3RtX2Nvb2tpZXNfd2luPXhcIlxcbiAgICAgICAgaGVpZ2h0PVwiMFwiIHdpZHRoPVwiMFwiIHN0eWxlPVwiZGlzcGxheTpub25lO3Zpc2liaWxpdHk6aGlkZGVuXCIgaWQ9XCJ0YWctbWFuYWdlclwiPjwvaWZyYW1lPic7XG5cbiAgICB2YXIgc2NyaXB0ID0gJ1xcbiAgICAgIChmdW5jdGlvbih3LGQscyxsLGkpe3dbbF09d1tsXXx8W107XFxuICAgICAgICB3W2xdLnB1c2goe1xcJ2d0bS5zdGFydFxcJzogbmV3IERhdGUoKS5nZXRUaW1lKCksZXZlbnQ6XFwnZ3RtLmpzXFwnLCAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKS5zbGljZSgxLCAtMSkgKyAnfSk7XFxuICAgICAgICB2YXIgZj1kLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdLGo9ZC5jcmVhdGVFbGVtZW50KHMpLGRsPWwhPVxcJ2RhdGFMYXllclxcJz9cXCcmbD1cXCcrbDpcXCdcXCc7XFxuICAgICAgICBqLmFzeW5jPXRydWU7ai5zcmM9XFwnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPVxcJytpK2RsK1xcJycgKyBndG1fYXV0aCArIGd0bV9wcmV2aWV3ICsgJyZndG1fY29va2llc193aW49eFxcJztcXG4gICAgICAgIGYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaixmKTtcXG4gICAgICB9KSh3aW5kb3csZG9jdW1lbnQsXFwnc2NyaXB0XFwnLFxcJycgKyBkYXRhTGF5ZXJOYW1lICsgJ1xcJyxcXCcnICsgaWQgKyAnXFwnKTsnO1xuXG4gICAgdmFyIGRhdGFMYXllclZhciA9IHRoaXMuZGF0YUxheWVyKGRhdGFMYXllciwgZGF0YUxheWVyTmFtZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWZyYW1lOiBpZnJhbWUsXG4gICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgIGRhdGFMYXllclZhcjogZGF0YUxheWVyVmFyXG4gICAgfTtcbiAgfSxcbiAgZGF0YUxheWVyOiBmdW5jdGlvbiBkYXRhTGF5ZXIoX2RhdGFMYXllciwgZGF0YUxheWVyTmFtZSkge1xuICAgIHJldHVybiAnXFxuICAgICAgd2luZG93LicgKyBkYXRhTGF5ZXJOYW1lICsgJyA9IHdpbmRvdy4nICsgZGF0YUxheWVyTmFtZSArICcgfHwgW107XFxuICAgICAgd2luZG93LicgKyBkYXRhTGF5ZXJOYW1lICsgJy5wdXNoKCcgKyBKU09OLnN0cmluZ2lmeShfZGF0YUxheWVyKSArICcpJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbmlwcGV0czsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfU25pcHBldHMgPSByZXF1aXJlKCcuL1NuaXBwZXRzJyk7XG5cbnZhciBfU25pcHBldHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU25pcHBldHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVGFnTWFuYWdlciA9IHtcbiAgZGF0YVNjcmlwdDogZnVuY3Rpb24gZGF0YVNjcmlwdChkYXRhTGF5ZXIpIHtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlubmVySFRNTCA9IGRhdGFMYXllcjtcbiAgICByZXR1cm4gc2NyaXB0O1xuICB9LFxuICBndG06IGZ1bmN0aW9uIGd0bShhcmdzKSB7XG4gICAgdmFyIHNuaXBwZXRzID0gX1NuaXBwZXRzMi5kZWZhdWx0LnRhZ3MoYXJncyk7XG5cbiAgICB2YXIgbm9TY3JpcHQgPSBmdW5jdGlvbiBub1NjcmlwdCgpIHtcbiAgICAgIHZhciBub3NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25vc2NyaXB0Jyk7XG4gICAgICBub3NjcmlwdC5pbm5lckhUTUwgPSBzbmlwcGV0cy5pZnJhbWU7XG4gICAgICByZXR1cm4gbm9zY3JpcHQ7XG4gICAgfTtcblxuICAgIHZhciBzY3JpcHQgPSBmdW5jdGlvbiBzY3JpcHQoKSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuaW5uZXJIVE1MID0gc25pcHBldHMuc2NyaXB0O1xuICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9O1xuXG4gICAgdmFyIGRhdGFTY3JpcHQgPSB0aGlzLmRhdGFTY3JpcHQoc25pcHBldHMuZGF0YUxheWVyVmFyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBub1NjcmlwdDogbm9TY3JpcHQsXG4gICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgIGRhdGFTY3JpcHQ6IGRhdGFTY3JpcHRcbiAgICB9O1xuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKF9yZWYpIHtcbiAgICB2YXIgZ3RtSWQgPSBfcmVmLmd0bUlkLFxuICAgICAgICBfcmVmJGV2ZW50cyA9IF9yZWYuZXZlbnRzLFxuICAgICAgICBldmVudHMgPSBfcmVmJGV2ZW50cyA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmJGV2ZW50cyxcbiAgICAgICAgZGF0YUxheWVyID0gX3JlZi5kYXRhTGF5ZXIsXG4gICAgICAgIF9yZWYkZGF0YUxheWVyTmFtZSA9IF9yZWYuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYkZGF0YUxheWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2RhdGFMYXllcicgOiBfcmVmJGRhdGFMYXllck5hbWUsXG4gICAgICAgIF9yZWYkYXV0aCA9IF9yZWYuYXV0aCxcbiAgICAgICAgYXV0aCA9IF9yZWYkYXV0aCA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJGF1dGgsXG4gICAgICAgIF9yZWYkcHJldmlldyA9IF9yZWYucHJldmlldyxcbiAgICAgICAgcHJldmlldyA9IF9yZWYkcHJldmlldyA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJHByZXZpZXc7XG5cbiAgICB2YXIgZ3RtID0gdGhpcy5ndG0oe1xuICAgICAgaWQ6IGd0bUlkLFxuICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICBkYXRhTGF5ZXI6IGRhdGFMYXllciB8fCB1bmRlZmluZWQsXG4gICAgICBkYXRhTGF5ZXJOYW1lOiBkYXRhTGF5ZXJOYW1lLFxuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIHByZXZpZXc6IHByZXZpZXdcbiAgICB9KTtcbiAgICBpZiAoZGF0YUxheWVyKSBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGd0bS5kYXRhU2NyaXB0KTtcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShndG0uc2NyaXB0KCksIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZ3RtLm5vU2NyaXB0KCksIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gIH0sXG4gIGRhdGFMYXllcjogZnVuY3Rpb24gZGF0YUxheWVyKF9yZWYyKSB7XG4gICAgdmFyIF9kYXRhTGF5ZXIgPSBfcmVmMi5kYXRhTGF5ZXIsXG4gICAgICAgIF9yZWYyJGRhdGFMYXllck5hbWUgPSBfcmVmMi5kYXRhTGF5ZXJOYW1lLFxuICAgICAgICBkYXRhTGF5ZXJOYW1lID0gX3JlZjIkZGF0YUxheWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2RhdGFMYXllcicgOiBfcmVmMiRkYXRhTGF5ZXJOYW1lO1xuXG4gICAgaWYgKHdpbmRvd1tkYXRhTGF5ZXJOYW1lXSkgcmV0dXJuIHdpbmRvd1tkYXRhTGF5ZXJOYW1lXS5wdXNoKF9kYXRhTGF5ZXIpO1xuICAgIHZhciBzbmlwcGV0cyA9IF9TbmlwcGV0czIuZGVmYXVsdC5kYXRhTGF5ZXIoX2RhdGFMYXllciwgZGF0YUxheWVyTmFtZSk7XG4gICAgdmFyIGRhdGFTY3JpcHQgPSB0aGlzLmRhdGFTY3JpcHQoc25pcHBldHMpO1xuICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGRhdGFTY3JpcHQsIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFnTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfVGFnTWFuYWdlciA9IHJlcXVpcmUoJy4vVGFnTWFuYWdlcicpO1xuXG52YXIgX1RhZ01hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVGFnTWFuYWdlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX1RhZ01hbmFnZXIyLmRlZmF1bHQ7IiwiaW1wb3J0IFRhZ01hbmFnZXIgZnJvbSBcInJlYWN0LWd0bS1tb2R1bGVcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBJbml0aWFsaXplR1RNID0gcHJvcHMgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRGF0YVVuYXZhaWxhYmxlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGFVbmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhZGRpdGlvbmFsUHJvcHM6ICcsIHByb3BzLmFkZGl0aW9uYWxQcm9wcylcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIHByb3BzLmFkZGl0aW9uYWxQcm9wcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RhdHVzIHNldDogJywgb2JqZWN0LnByb3BEYXRhU291cmNlKVxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QucHJvcERhdGFTb3VyY2Uuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8ICghb2JqZWN0LnByb3BEYXRhU291cmNlLml0ZW1zLmxlbmd0aCAmJiBwcm9wcy5zZW5kQWRkaXRpb25hbFByb3BzKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVW5hdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2RhdGFVbmF2YWlsYWJsZScpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YVVuYXZhaWxhYmxlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkYXRhTGF5ZXJTdHJ1Y3R1cmUgPSAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YUxheWVyID0gJ3tcImV2ZW50XCI6XCInICsgcHJvcHMucGFnZVZpZXdFdmVudE5hbWUgKyAnXCIsJzsgLy8gaW5pdGlhbGl6ZSB0aGUgZGF0YUxheWVyIHZhcmlhYmxlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kUGFnZVRpdGxlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuMScpXG4gICAgICAgICAgICAgICAgLy8gc2VuZCBwYWdlIHRpdGxlXG4gICAgICAgICAgICAgICAgZGF0YUxheWVyICs9ICdcIlBhZ2UgTmFtZVwiOlwiJyArIG14LnVpLmdldENvbnRlbnRGb3JtKCkudGl0bGUgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRNb2R1bGVMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzLjInKVxuICAgICAgICAgICAgICAgIC8vIHNlbmQgbW9kdWxlIGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZVBhdGggPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLnBhdGg7XG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZUxvY2F0aW9uID0gZnVuY3Rpb24gKG1vZFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VFeHRlbnNpb24gPSBcIi5wYWdlLnhtbFwiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IG1vZFBhdGguc3Vic3RyKDAsIG1vZFBhdGgubGVuZ3RoIC0gcGFnZUV4dGVuc2lvbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCJNb2R1bGUgTG9jYXRpb25cIjpcIicgKyBtb2R1bGVMb2NhdGlvbihtb2R1bGVQYXRoKSArICdcIiwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocHJvcHMuc2VuZFBhZ2VVUkwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy4zJylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIHBhZ2UgVVJMXG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VVUkw7XG4gICAgICAgICAgICAgICAgaWYgKG14LnVpLmdldENvbnRlbnRGb3JtKCkudXJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgbXgudWkuZ2V0Q29udGVudEZvcm0oKS51cmw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWRVUkwgPSBmdW5jdGlvbiAoZnVsbFVSTCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdENoYXJJbmRleCA9IGZ1bGxVUkwubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kU3RyaW5nID0gZnVsbFVSTC5zdWJzdHJpbmcobGFzdENoYXJJbmRleCArIDEsIGZ1bGxVUkwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKGVuZFN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdWxsVVJMOyAvLyB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgaXNuJ3QgYSBudW1iZXIsIHJldHVybiB0aGUgd2hvbGUgdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdWxsVVJMLnN1YnN0cigwLCBsYXN0Q2hhckluZGV4KTsgLy8gdGhlIGVuZCBvZiB0aGUgc3RyaW5nIGlzIGEgbnVtYmVyLCB0cmltIGl0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCJQYWdlIFVSTFwiOlwiJyArIHRyaW1tZWRVUkwocGFnZVVSTCkgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRTZXNzaW9uSUQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy40JylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIHNlc3Npb24gSURcbiAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiU2Vzc2lvbiBJRFwiOlwiJyArIG14LnNlc3Npb24uZ2V0U2Vzc2lvbk9iamVjdElkKCkgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRBZGRpdGlvbmFsUHJvcHMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy41JylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIGFkZGl0aW9uYWwgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIGxldCBleHByZXNzaW9uUmVzdWx0ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnYWRkaXRpb25hbFByb3BzJywgcHJvcHMuYWRkaXRpb25hbFByb3BzKVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBwcm9wcy5hZGRpdGlvbmFsUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdsaW5lJywgbGluZS5wcm9wTmFtZSwgbGluZSlcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvYmplY3Qgb2YgbGluZS5wcm9wRGF0YVNvdXJjZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0IGlzIGFuIGl0ZW0gaW4gdGhlIGxpc3QgdGhhdCBpcyByZXR1cm5lZCBmcm9tIHRoZSBkYXRhIHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvblJlc3VsdCArPSBsaW5lLnByb3BWYWx1ZS5nZXQob2JqZWN0KS52YWx1ZSArIFwiLCBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZXhwcmVzc2lvblJlc3VsdCcgLCBleHByZXNzaW9uUmVzdWx0KVxuXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25SZXN1bHQgPSBleHByZXNzaW9uUmVzdWx0LnJlcGxhY2UoLyxcXHMqJC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiJyArIGxpbmUucHJvcE5hbWUgKyAnXCI6XCInICsgZXhwcmVzc2lvblJlc3VsdCArICdcIiwnO1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uUmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy42IGZpbmlzaCcpXG5cbiAgICAgICAgICAgIGRhdGFMYXllciA9IGRhdGFMYXllci5yZXBsYWNlKC8sXFxzKiQvLCBcIlwiKTsgLy8gcmVtb3ZlIHRoZSBsYXN0IGNvbW1hIGZyb20gdGhlIGRhdGFMYXllciB2YXJpYWJsZVxuICAgICAgICAgICAgZGF0YUxheWVyICs9IFwifVwiO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGRhdGFMYXllcilcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGFMYXllcik7XG4gICAgICAgIH07XG5cblxuICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMScsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICBpc0RhdGFVbmF2YWlsYWJsZShwcm9wcylcbiAgICAgICAgaWYgKCFteC5nYTRDb25uZWN0ZWQgJiYgIW14LmdhNFBlbmRpbmcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAyJywgcHJvcHMucGFnZVZpZXdFdmVudE5hbWUpXG5cbiAgICAgICAgICAgIC8vIGZsYWcgdG8gcHJldmVudCBvbk5hdmlnYXRpb24gZnJvbSBzZW5kaW5nIG11bHRpcGxlIHBhZ2Ugdmlld3MgYWZ0ZXIgdGhpbmdzIGxpa2UgYWZ0ZXIgd2lkZ2V0IGxvYWQsIGFmdGVyIHNob3cgcGFnZSwgZXRjLlxuXG4gICAgICAgICAgICAvLyBkYXRhVW5hdmFpbGFibGUgY2hlY2sgaGVyZSBiZWNhdXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gd2lsbCB0YWtlIGNhcmUgb2YgY2FsbGluZyBpdCBtdWx0aXBsZSB0aW1lc1xuICAgICAgICAgICAgaWYgKCFteC5nYTRQZW5kaW5nKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMycsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICAgICAgICAgIGlmICghaXNEYXRhVW5hdmFpbGFibGUocHJvcHMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzIHNldHRpbmcgdXAgbmF2aWdhdGlvbicsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnT25OYXZpZ2F0aW9uID0gbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb247IC8vIHNhdmUgd2hhdCB0aGUgb3JpZ2luYWwgb25OYXZpZ2F0aW9uIGZ1bmN0aW9uIGRpZFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbXguZ2E0UGVuZGluZyA9IHRydWU7IC8vIFdlIGhhdmUgc2V0IHRoZSBwYWdlIGluaXRpYWxpemF0aW9uLCBub3cgdG9nZ2xlIHRoZSBzd2l0Y2ggb2ZmIHRvIGF2b2lkIHNldHRpbmcgdXAgZHVwbGljYXRlIGluc2FuY2VzXG4gICAgICAgICAgICAgICAgICAgIG14LmdhNFB1c2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEN1c3RvbSBBY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuc2VuZEN1c3RvbVByb3BzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ01hbmFnZXJBcmdzSW5pdGlhbGl6ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3RtSWQ6IHByb3BzLm1lYXN1cmVtZW50SURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzIGluaXRpYWxpemUgc3RhcnQnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUYWdNYW5hZ2VyLmluaXRpYWxpemUodGFnTWFuYWdlckFyZ3NJbml0aWFsaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMyBpbml0aWFsaXplIGVuZCcsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhTGF5ZXIgPSBkYXRhTGF5ZXJTdHJ1Y3R1cmUocHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ01hbmFnZXJBcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndG1JZDogcHJvcHMubWVhc3VyZW1lbnRJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUxheWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUYWdNYW5hZ2VyLmluaXRpYWxpemUodGFnTWFuYWdlckFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMgdXBkYXRpbmcgZmxhZ3MnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbXguZ2E0Q29ubmVjdGVkID0gdHJ1ZTsgLy8gV2UgaGF2ZSBzZW50IHRoZSBwYWdlIGhpdCwgbm93IHRvZ2dsZSB0aGUgc3dpdGNoIG9mZiB0byBhdm9pZCBzZW5kaW5nIGR1cGxpY2F0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIG14LmdhNFBlbmRpbmcgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9yaWdpbmFsIEFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdPbk5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG14LmdhNFBlbmRpbmcgJiYgbXguZ2E0UHVzaCkgeyAvLyBpZiBvdGhlciBwdXNoZXMgYXJlIG5lZWRlZCB0byBiZSBkb25lIGJ1dCB0aGUgaW5pdGlhbGl6YXRpb24gaXMgbm90IHllZCBkb25lXG5cbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzLjIwIG9uTmF2aWdhdGlvbiBmb2xsb3ctdXAgcHVzaCcpXG4gICAgICAgICAgICBpZiAoIWlzRGF0YVVuYXZhaWxhYmxlKHByb3BzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdPbk5hdmlnYXRpb24gPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbjsgLy8gc2F2ZSB3aGF0IHRoZSBvcmlnaW5hbCBvbk5hdmlnYXRpb24gZnVuY3Rpb24gZGlkXG4gICAgICAgICAgICAgICAgbXguZ2E0UHVzaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzLjIxIG9uTmF2aWdhdGlvbiBmb2xsb3ctdXAgcHVzaCcpXG4gICAgICAgICAgICAgICAgICAgIG9yaWdPbk5hdmlnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhTGF5ZXIgPSBkYXRhTGF5ZXJTdHJ1Y3R1cmUocHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaChkYXRhTGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobXguZ2E0UHVzaCkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzdGVwIDMuMzAgc2ltcGxlIHB1c2gnKVxuXG4gICAgICAgICAgICBpZiAoIWlzRGF0YVVuYXZhaWxhYmxlKHByb3BzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdPbk5hdmlnYXRpb24gPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbjsgLy8gc2F2ZSB3aGF0IHRoZSBvcmlnaW5hbCBvbk5hdmlnYXRpb24gZnVuY3Rpb24gZGlkXG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0ZXAgMy4zMSBzaW1wbGUgcHVzaCcpXG4gICAgICAgICAgICAgICAgbXguZ2E0UHVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFMYXllciA9IGRhdGFMYXllclN0cnVjdHVyZShwcm9wcyk7XG4gICAgICAgICAgICAgICAgbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RlcCAzLjMxIG9uTmF2aWdhdGlvbiBmb2xsb3ctdXAgcHVzaCcpXG4gICAgICAgICAgICAgICAgICAgIG9yaWdPbk5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKGRhdGFMYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ3NraXBwaW5nJylcbiAgICAgICAgfVxuICAgIH0pOyAvLyBubyBkZXBlbmRlbmN5IGFycmF5IC0+IHRyaWdnZXIgb24gZXZlcnkgbG9hZFxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbml0aWFsaXplR1RNO1xuIiwiaW1wb3J0IEluaXRpYWxpemVHVE0gZnJvbSBcIi4vY29tcG9uZW50cy9Jbml0aWFsaXplR1RNXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBHb29nbGVUYWdNYW5hZ2VyKHtcbiAgICBtZWFzdXJlbWVudElELFxuICAgIHNlbmRDdXN0b21Qcm9wcyxcbiAgICBwYWdlVmlld0V2ZW50TmFtZSxcbiAgICBzZW5kUGFnZVRpdGxlLFxuICAgIHNlbmRNb2R1bGVMb2NhdGlvbixcbiAgICBzZW5kUGFnZVVSTCxcbiAgICBzZW5kU2Vzc2lvbklELFxuICAgIHNlbmRBZGRpdGlvbmFsUHJvcHMsXG4gICAgYWRkaXRpb25hbFByb3BzXG59KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEluaXRpYWxpemVHVE1cbiAgICAgICAgICAgIG1lYXN1cmVtZW50SUQ9e21lYXN1cmVtZW50SUR9XG4gICAgICAgICAgICBzZW5kQ3VzdG9tUHJvcHM9e3NlbmRDdXN0b21Qcm9wc31cbiAgICAgICAgICAgIHBhZ2VWaWV3RXZlbnROYW1lPXtwYWdlVmlld0V2ZW50TmFtZX1cbiAgICAgICAgICAgIHNlbmRQYWdlVGl0bGU9e3NlbmRQYWdlVGl0bGV9XG4gICAgICAgICAgICBzZW5kTW9kdWxlTG9jYXRpb249e3NlbmRNb2R1bGVMb2NhdGlvbn1cbiAgICAgICAgICAgIHNlbmRQYWdlVVJMPXtzZW5kUGFnZVVSTH1cbiAgICAgICAgICAgIHNlbmRTZXNzaW9uSUQ9e3NlbmRTZXNzaW9uSUR9XG4gICAgICAgICAgICBzZW5kQWRkaXRpb25hbFByb3BzPXtzZW5kQWRkaXRpb25hbFByb3BzfVxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BzPXthZGRpdGlvbmFsUHJvcHN9XG4gICAgICAgIC8+XG4gICAgKTtcbn1cbiJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIndhcm4iLCJzIiwiY29uc29sZSIsIl93YXJuIiwicmVxdWlyZSIsIl93YXJuMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIlNuaXBwZXRzIiwidGFncyIsIl9yZWYiLCJpZCIsImV2ZW50cyIsImRhdGFMYXllciIsImRhdGFMYXllck5hbWUiLCJwcmV2aWV3IiwiYXV0aCIsImd0bV9hdXRoIiwiZ3RtX3ByZXZpZXciLCJpZnJhbWUiLCJzY3JpcHQiLCJKU09OIiwic3RyaW5naWZ5Iiwic2xpY2UiLCJkYXRhTGF5ZXJWYXIiLCJfZGF0YUxheWVyIiwibW9kdWxlIiwiX1NuaXBwZXRzIiwiX1NuaXBwZXRzMiIsIlRhZ01hbmFnZXIiLCJkYXRhU2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZ3RtIiwiYXJncyIsInNuaXBwZXRzIiwibm9TY3JpcHQiLCJub3NjcmlwdCIsImluaXRpYWxpemUiLCJndG1JZCIsIl9yZWYkZXZlbnRzIiwidW5kZWZpbmVkIiwiX3JlZiRkYXRhTGF5ZXJOYW1lIiwiX3JlZiRhdXRoIiwiX3JlZiRwcmV2aWV3IiwiaGVhZCIsImFwcGVuZENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImJvZHkiLCJfcmVmMiIsIl9yZWYyJGRhdGFMYXllck5hbWUiLCJ3aW5kb3ciLCJwdXNoIiwiX1RhZ01hbmFnZXIiLCJfVGFnTWFuYWdlcjIiLCJJbml0aWFsaXplR1RNIiwicHJvcHMiLCJ1c2VFZmZlY3QiLCJpc0RhdGFVbmF2YWlsYWJsZSIsImRhdGFVbmF2YWlsYWJsZSIsImluZm8iLCJhZGRpdGlvbmFsUHJvcHMiLCJvYmplY3QiLCJwcm9wRGF0YVNvdXJjZSIsInN0YXR1cyIsIml0ZW1zIiwibGVuZ3RoIiwic2VuZEFkZGl0aW9uYWxQcm9wcyIsImRhdGFMYXllclN0cnVjdHVyZSIsInBhZ2VWaWV3RXZlbnROYW1lIiwic2VuZFBhZ2VUaXRsZSIsIm14IiwidWkiLCJnZXRDb250ZW50Rm9ybSIsInRpdGxlIiwic2VuZE1vZHVsZUxvY2F0aW9uIiwibW9kdWxlUGF0aCIsInBhdGgiLCJtb2R1bGVMb2NhdGlvbiIsIm1vZFBhdGgiLCJwYWdlRXh0ZW5zaW9uIiwic3Vic3RyIiwic2VuZFBhZ2VVUkwiLCJwYWdlVVJMIiwidXJsIiwibG9jYXRpb24iLCJvcmlnaW4iLCJ0cmltbWVkVVJMIiwiZnVsbFVSTCIsImxhc3RDaGFySW5kZXgiLCJsYXN0SW5kZXhPZiIsImVuZFN0cmluZyIsInN1YnN0cmluZyIsImlzTmFOIiwic2VuZFNlc3Npb25JRCIsInNlc3Npb24iLCJnZXRTZXNzaW9uT2JqZWN0SWQiLCJleHByZXNzaW9uUmVzdWx0IiwibGluZSIsInByb3BOYW1lIiwicHJvcFZhbHVlIiwiZ2V0IiwicmVwbGFjZSIsInBhcnNlIiwiZ2E0Q29ubmVjdGVkIiwiZ2E0UGVuZGluZyIsIm9yaWdPbk5hdmlnYXRpb24iLCJvbk5hdmlnYXRpb24iLCJnYTRQdXNoIiwic2VuZEN1c3RvbVByb3BzIiwidGFnTWFuYWdlckFyZ3NJbml0aWFsaXplIiwibWVhc3VyZW1lbnRJRCIsInRhZ01hbmFnZXJBcmdzIiwiR29vZ2xlVGFnTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7OztFQUVBQSxNQUFNLENBQUNDLGNBQWMsQ0FBQ0MsTUFBTyxFQUFFLFlBQVksRUFBRTtFQUMzQ0MsRUFBQUEsS0FBSyxFQUFFLElBQUE7RUFDVCxDQUFDLENBQUMsQ0FBQTtFQUNGLElBQUlDLElBQUksR0FBRyxTQUFTQSxJQUFJQSxDQUFDQyxDQUFDLEVBQUU7RUFDMUJDLEVBQUFBLE9BQU8sQ0FBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRUMsQ0FBQyxDQUFDLENBQUE7RUFDaEMsQ0FBQyxDQUFBO0FBRURILFFBQUFBLENBQUFBLE9BQWUsR0FBR0U7O0VDUGxCLElBQUlHLEtBQUssR0FBR0MsTUFBdUIsQ0FBQTtFQUVuQyxJQUFJQyxNQUFNLEdBQUdDLHdCQUFzQixDQUFDSCxLQUFLLENBQUMsQ0FBQTtFQUUxQyxTQUFTRyx3QkFBc0JBLENBQUNDLEdBQUcsRUFBRTtFQUFFLEVBQUEsT0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVUsR0FBR0QsR0FBRyxHQUFHO0VBQUVFLElBQUFBLE9BQU8sRUFBRUYsR0FBQUE7S0FBSyxDQUFBO0VBQUUsQ0FBQTs7RUFFOUY7O0VBRUEsSUFBSUcsUUFBUSxHQUFHO0VBQ2JDLEVBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFJQSxDQUFDQyxJQUFJLEVBQUU7RUFDeEIsSUFBQSxJQUFJQyxFQUFF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
