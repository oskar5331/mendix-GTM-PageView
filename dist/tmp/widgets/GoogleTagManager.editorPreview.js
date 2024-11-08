'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*\nPlace your custom CSS here\n*/\n.widget-hello-world {\n\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvb2dsZVRhZ01hbmFnZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBQ0Q7O0FBRUEiLCJmaWxlIjoiR29vZ2xlVGFnTWFuYWdlci5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuUGxhY2UgeW91ciBjdXN0b20gQ1NTIGhlcmVcbiovXG4ud2lkZ2V0LWhlbGxvLXdvcmxkIHtcblxufVxuIl19 */";
var stylesheet="/*\nPlace your custom CSS here\n*/\n.widget-hello-world {\n\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvb2dsZVRhZ01hbmFnZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBQ0Q7O0FBRUEiLCJmaWxlIjoiR29vZ2xlVGFnTWFuYWdlci5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuUGxhY2UgeW91ciBjdXN0b20gQ1NTIGhlcmVcbiovXG4ud2lkZ2V0LWhlbGxvLXdvcmxkIHtcblxufVxuIl19 */";
styleInject(css_248z);

var GoogleTagManager$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': css_248z,
	stylesheet: stylesheet
});

var require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(GoogleTagManager$1);

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
      // console.info('additionalProps: ', props.additionalProps)
      for (const object of props.additionalProps) {
        // console.info('status set: ', object.propDataSource)
        if (object.propDataSource.status !== "available" || !object.propDataSource.items.length && props.sendAdditionalProps) {
          dataUnavailable = true;
          // console.info('dataUnavailable')
        }
      }
      return dataUnavailable;
    };
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
    isDataUnavailable();
    if (!mx.ga4Connected && !mx.ga4Pending) {
      // console.info('step 2', props.pageViewEventName)

      // flag to prevent onNavigation from sending multiple page views after things like after widget load, after show page, etc.

      // dataUnavailable check here because the render function will take care of calling it multiple times
      if (!mx.ga4Pending) {
        // console.info('step 3', props.pageViewEventName)
        if (!isDataUnavailable()) {
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

              dist.initialize(tagManagerArgsInitialize);
              // console.info('step 3 initialize end', props.pageViewEventName)
            } else {
              const dataLayer = dataLayerStructure();
              const tagManagerArgs = {
                gtmId: props.measurementID,
                dataLayer
              };
              dist.initialize(tagManagerArgs);
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
    } else if (mx.ga4Pending && mx.ga4Push) {
      // if other pushes are needed to be done but the initialization is not yed done

      // console.info('step 3.20 onNavigation follow-up push')
      if (!isDataUnavailable()) {
        const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did
        mx.ga4Push = false;
        mx.ui.getContentForm().onNavigation = () => {
          // console.info('step 3.21 onNavigation follow-up push')
          origOnNavigation();
          const dataLayer = dataLayerStructure();
          window.dataLayer.push(dataLayer);
          return null;
        };
      }
    } else if (mx.ga4Push) {
      // console.info('step 3.30 simple push')

      if (!isDataUnavailable()) {
        const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did

        // console.info('step 3.31 simple push')
        mx.ga4Push = false;
        const dataLayer = dataLayerStructure();
        mx.ui.getContentForm().onNavigation = () => {
          // console.info('step 3.31 onNavigation follow-up push')
          origOnNavigation();
          return null;
        };
        window.dataLayer.push(dataLayer);
      }
    } else ;
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
function getPreviewCss() {
  return require$$0;
}

exports.GoogleTagManager = GoogleTagManager;
exports.getPreviewCss = getPreviewCss;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZ2xlVGFnTWFuYWdlci5lZGl0b3JQcmV2aWV3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWd0bS1tb2R1bGUvZGlzdC91dGlscy93YXJuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWd0bS1tb2R1bGUvZGlzdC9TbmlwcGV0cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvVGFnTWFuYWdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Jbml0aWFsaXplR1RNLmpzeCIsIi4uLy4uLy4uL3NyYy9Hb29nbGVUYWdNYW5hZ2VyLmVkaXRvclByZXZpZXcuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgd2FybiA9IGZ1bmN0aW9uIHdhcm4ocykge1xuICBjb25zb2xlLndhcm4oJ1tyZWFjdC1ndG1dJywgcyk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB3YXJuOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF93YXJuID0gcmVxdWlyZSgnLi91dGlscy93YXJuJyk7XG5cbnZhciBfd2FybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vdGFnLW1hbmFnZXIvcXVpY2tzdGFydFxuXG52YXIgU25pcHBldHMgPSB7XG4gIHRhZ3M6IGZ1bmN0aW9uIHRhZ3MoX3JlZikge1xuICAgIHZhciBpZCA9IF9yZWYuaWQsXG4gICAgICAgIGV2ZW50cyA9IF9yZWYuZXZlbnRzLFxuICAgICAgICBkYXRhTGF5ZXIgPSBfcmVmLmRhdGFMYXllcixcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgcHJldmlldyA9IF9yZWYucHJldmlldyxcbiAgICAgICAgYXV0aCA9IF9yZWYuYXV0aDtcblxuICAgIHZhciBndG1fYXV0aCA9ICcmZ3RtX2F1dGg9JyArIGF1dGg7XG4gICAgdmFyIGd0bV9wcmV2aWV3ID0gJyZndG1fcHJldmlldz0nICsgcHJldmlldztcblxuICAgIGlmICghaWQpICgwLCBfd2FybjIuZGVmYXVsdCkoJ0dUTSBJZCBpcyByZXF1aXJlZCcpO1xuXG4gICAgdmFyIGlmcmFtZSA9ICdcXG4gICAgICA8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL25zLmh0bWw/aWQ9JyArIGlkICsgZ3RtX2F1dGggKyBndG1fcHJldmlldyArICcmZ3RtX2Nvb2tpZXNfd2luPXhcIlxcbiAgICAgICAgaGVpZ2h0PVwiMFwiIHdpZHRoPVwiMFwiIHN0eWxlPVwiZGlzcGxheTpub25lO3Zpc2liaWxpdHk6aGlkZGVuXCIgaWQ9XCJ0YWctbWFuYWdlclwiPjwvaWZyYW1lPic7XG5cbiAgICB2YXIgc2NyaXB0ID0gJ1xcbiAgICAgIChmdW5jdGlvbih3LGQscyxsLGkpe3dbbF09d1tsXXx8W107XFxuICAgICAgICB3W2xdLnB1c2goe1xcJ2d0bS5zdGFydFxcJzogbmV3IERhdGUoKS5nZXRUaW1lKCksZXZlbnQ6XFwnZ3RtLmpzXFwnLCAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKS5zbGljZSgxLCAtMSkgKyAnfSk7XFxuICAgICAgICB2YXIgZj1kLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdLGo9ZC5jcmVhdGVFbGVtZW50KHMpLGRsPWwhPVxcJ2RhdGFMYXllclxcJz9cXCcmbD1cXCcrbDpcXCdcXCc7XFxuICAgICAgICBqLmFzeW5jPXRydWU7ai5zcmM9XFwnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPVxcJytpK2RsK1xcJycgKyBndG1fYXV0aCArIGd0bV9wcmV2aWV3ICsgJyZndG1fY29va2llc193aW49eFxcJztcXG4gICAgICAgIGYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaixmKTtcXG4gICAgICB9KSh3aW5kb3csZG9jdW1lbnQsXFwnc2NyaXB0XFwnLFxcJycgKyBkYXRhTGF5ZXJOYW1lICsgJ1xcJyxcXCcnICsgaWQgKyAnXFwnKTsnO1xuXG4gICAgdmFyIGRhdGFMYXllclZhciA9IHRoaXMuZGF0YUxheWVyKGRhdGFMYXllciwgZGF0YUxheWVyTmFtZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWZyYW1lOiBpZnJhbWUsXG4gICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgIGRhdGFMYXllclZhcjogZGF0YUxheWVyVmFyXG4gICAgfTtcbiAgfSxcbiAgZGF0YUxheWVyOiBmdW5jdGlvbiBkYXRhTGF5ZXIoX2RhdGFMYXllciwgZGF0YUxheWVyTmFtZSkge1xuICAgIHJldHVybiAnXFxuICAgICAgd2luZG93LicgKyBkYXRhTGF5ZXJOYW1lICsgJyA9IHdpbmRvdy4nICsgZGF0YUxheWVyTmFtZSArICcgfHwgW107XFxuICAgICAgd2luZG93LicgKyBkYXRhTGF5ZXJOYW1lICsgJy5wdXNoKCcgKyBKU09OLnN0cmluZ2lmeShfZGF0YUxheWVyKSArICcpJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbmlwcGV0czsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfU25pcHBldHMgPSByZXF1aXJlKCcuL1NuaXBwZXRzJyk7XG5cbnZhciBfU25pcHBldHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU25pcHBldHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVGFnTWFuYWdlciA9IHtcbiAgZGF0YVNjcmlwdDogZnVuY3Rpb24gZGF0YVNjcmlwdChkYXRhTGF5ZXIpIHtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlubmVySFRNTCA9IGRhdGFMYXllcjtcbiAgICByZXR1cm4gc2NyaXB0O1xuICB9LFxuICBndG06IGZ1bmN0aW9uIGd0bShhcmdzKSB7XG4gICAgdmFyIHNuaXBwZXRzID0gX1NuaXBwZXRzMi5kZWZhdWx0LnRhZ3MoYXJncyk7XG5cbiAgICB2YXIgbm9TY3JpcHQgPSBmdW5jdGlvbiBub1NjcmlwdCgpIHtcbiAgICAgIHZhciBub3NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25vc2NyaXB0Jyk7XG4gICAgICBub3NjcmlwdC5pbm5lckhUTUwgPSBzbmlwcGV0cy5pZnJhbWU7XG4gICAgICByZXR1cm4gbm9zY3JpcHQ7XG4gICAgfTtcblxuICAgIHZhciBzY3JpcHQgPSBmdW5jdGlvbiBzY3JpcHQoKSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuaW5uZXJIVE1MID0gc25pcHBldHMuc2NyaXB0O1xuICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9O1xuXG4gICAgdmFyIGRhdGFTY3JpcHQgPSB0aGlzLmRhdGFTY3JpcHQoc25pcHBldHMuZGF0YUxheWVyVmFyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBub1NjcmlwdDogbm9TY3JpcHQsXG4gICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgIGRhdGFTY3JpcHQ6IGRhdGFTY3JpcHRcbiAgICB9O1xuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKF9yZWYpIHtcbiAgICB2YXIgZ3RtSWQgPSBfcmVmLmd0bUlkLFxuICAgICAgICBfcmVmJGV2ZW50cyA9IF9yZWYuZXZlbnRzLFxuICAgICAgICBldmVudHMgPSBfcmVmJGV2ZW50cyA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmJGV2ZW50cyxcbiAgICAgICAgZGF0YUxheWVyID0gX3JlZi5kYXRhTGF5ZXIsXG4gICAgICAgIF9yZWYkZGF0YUxheWVyTmFtZSA9IF9yZWYuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYkZGF0YUxheWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2RhdGFMYXllcicgOiBfcmVmJGRhdGFMYXllck5hbWUsXG4gICAgICAgIF9yZWYkYXV0aCA9IF9yZWYuYXV0aCxcbiAgICAgICAgYXV0aCA9IF9yZWYkYXV0aCA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJGF1dGgsXG4gICAgICAgIF9yZWYkcHJldmlldyA9IF9yZWYucHJldmlldyxcbiAgICAgICAgcHJldmlldyA9IF9yZWYkcHJldmlldyA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJHByZXZpZXc7XG5cbiAgICB2YXIgZ3RtID0gdGhpcy5ndG0oe1xuICAgICAgaWQ6IGd0bUlkLFxuICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICBkYXRhTGF5ZXI6IGRhdGFMYXllciB8fCB1bmRlZmluZWQsXG4gICAgICBkYXRhTGF5ZXJOYW1lOiBkYXRhTGF5ZXJOYW1lLFxuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIHByZXZpZXc6IHByZXZpZXdcbiAgICB9KTtcbiAgICBpZiAoZGF0YUxheWVyKSBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGd0bS5kYXRhU2NyaXB0KTtcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShndG0uc2NyaXB0KCksIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZ3RtLm5vU2NyaXB0KCksIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gIH0sXG4gIGRhdGFMYXllcjogZnVuY3Rpb24gZGF0YUxheWVyKF9yZWYyKSB7XG4gICAgdmFyIF9kYXRhTGF5ZXIgPSBfcmVmMi5kYXRhTGF5ZXIsXG4gICAgICAgIF9yZWYyJGRhdGFMYXllck5hbWUgPSBfcmVmMi5kYXRhTGF5ZXJOYW1lLFxuICAgICAgICBkYXRhTGF5ZXJOYW1lID0gX3JlZjIkZGF0YUxheWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2RhdGFMYXllcicgOiBfcmVmMiRkYXRhTGF5ZXJOYW1lO1xuXG4gICAgaWYgKHdpbmRvd1tkYXRhTGF5ZXJOYW1lXSkgcmV0dXJuIHdpbmRvd1tkYXRhTGF5ZXJOYW1lXS5wdXNoKF9kYXRhTGF5ZXIpO1xuICAgIHZhciBzbmlwcGV0cyA9IF9TbmlwcGV0czIuZGVmYXVsdC5kYXRhTGF5ZXIoX2RhdGFMYXllciwgZGF0YUxheWVyTmFtZSk7XG4gICAgdmFyIGRhdGFTY3JpcHQgPSB0aGlzLmRhdGFTY3JpcHQoc25pcHBldHMpO1xuICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGRhdGFTY3JpcHQsIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFnTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfVGFnTWFuYWdlciA9IHJlcXVpcmUoJy4vVGFnTWFuYWdlcicpO1xuXG52YXIgX1RhZ01hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVGFnTWFuYWdlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX1RhZ01hbmFnZXIyLmRlZmF1bHQ7IiwiaW1wb3J0IFRhZ01hbmFnZXIgZnJvbSBcInJlYWN0LWd0bS1tb2R1bGVcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBJbml0aWFsaXplR1RNID0gcHJvcHMgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRGF0YVVuYXZhaWxhYmxlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGFVbmF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdhZGRpdGlvbmFsUHJvcHM6ICcsIHByb3BzLmFkZGl0aW9uYWxQcm9wcylcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIHByb3BzLmFkZGl0aW9uYWxQcm9wcykge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RhdHVzIHNldDogJywgb2JqZWN0LnByb3BEYXRhU291cmNlKVxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QucHJvcERhdGFTb3VyY2Uuc3RhdHVzICE9PSBcImF2YWlsYWJsZVwiIHx8ICghb2JqZWN0LnByb3BEYXRhU291cmNlLml0ZW1zLmxlbmd0aCAmJiBwcm9wcy5zZW5kQWRkaXRpb25hbFByb3BzKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVW5hdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ2RhdGFVbmF2YWlsYWJsZScpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YVVuYXZhaWxhYmxlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkYXRhTGF5ZXJTdHJ1Y3R1cmUgPSAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgZGF0YUxheWVyID0gJ3tcImV2ZW50XCI6XCInICsgcHJvcHMucGFnZVZpZXdFdmVudE5hbWUgKyAnXCIsJzsgLy8gaW5pdGlhbGl6ZSB0aGUgZGF0YUxheWVyIHZhcmlhYmxlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kUGFnZVRpdGxlKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdzdGVwIDMuMScpXG4gICAgICAgICAgICAgICAgLy8gc2VuZCBwYWdlIHRpdGxlXG4gICAgICAgICAgICAgICAgZGF0YUxheWVyICs9ICdcIlBhZ2UgTmFtZVwiOlwiJyArIG14LnVpLmdldENvbnRlbnRGb3JtKCkudGl0bGUgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRNb2R1bGVMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAzLjInKVxuICAgICAgICAgICAgICAgIC8vIHNlbmQgbW9kdWxlIGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZVBhdGggPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLnBhdGg7XG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZUxvY2F0aW9uID0gZnVuY3Rpb24gKG1vZFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VFeHRlbnNpb24gPSBcIi5wYWdlLnhtbFwiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IG1vZFBhdGguc3Vic3RyKDAsIG1vZFBhdGgubGVuZ3RoIC0gcGFnZUV4dGVuc2lvbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCJNb2R1bGUgTG9jYXRpb25cIjpcIicgKyBtb2R1bGVMb2NhdGlvbihtb2R1bGVQYXRoKSArICdcIiwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocHJvcHMuc2VuZFBhZ2VVUkwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMy4zJylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIHBhZ2UgVVJMXG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VVUkw7XG4gICAgICAgICAgICAgICAgaWYgKG14LnVpLmdldENvbnRlbnRGb3JtKCkudXJsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgbXgudWkuZ2V0Q29udGVudEZvcm0oKS51cmw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWRVUkwgPSBmdW5jdGlvbiAoZnVsbFVSTCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdENoYXJJbmRleCA9IGZ1bGxVUkwubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kU3RyaW5nID0gZnVsbFVSTC5zdWJzdHJpbmcobGFzdENoYXJJbmRleCArIDEsIGZ1bGxVUkwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKGVuZFN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdWxsVVJMOyAvLyB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgaXNuJ3QgYSBudW1iZXIsIHJldHVybiB0aGUgd2hvbGUgdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdWxsVVJMLnN1YnN0cigwLCBsYXN0Q2hhckluZGV4KTsgLy8gdGhlIGVuZCBvZiB0aGUgc3RyaW5nIGlzIGEgbnVtYmVyLCB0cmltIGl0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCJQYWdlIFVSTFwiOlwiJyArIHRyaW1tZWRVUkwocGFnZVVSTCkgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRTZXNzaW9uSUQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMy40JylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIHNlc3Npb24gSURcbiAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiU2Vzc2lvbiBJRFwiOlwiJyArIG14LnNlc3Npb24uZ2V0U2Vzc2lvbk9iamVjdElkKCkgKyAnXCIsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRBZGRpdGlvbmFsUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMy41JylcbiAgICAgICAgICAgICAgICAvLyBzZW5kIGFkZGl0aW9uYWwgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIGxldCBleHByZXNzaW9uUmVzdWx0ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnYWRkaXRpb25hbFByb3BzJywgcHJvcHMuYWRkaXRpb25hbFByb3BzKVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBwcm9wcy5hZGRpdGlvbmFsUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdsaW5lJywgbGluZS5wcm9wTmFtZSwgbGluZSlcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvYmplY3Qgb2YgbGluZS5wcm9wRGF0YVNvdXJjZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0IGlzIGFuIGl0ZW0gaW4gdGhlIGxpc3QgdGhhdCBpcyByZXR1cm5lZCBmcm9tIHRoZSBkYXRhIHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvblJlc3VsdCArPSBsaW5lLnByb3BWYWx1ZS5nZXQob2JqZWN0KS52YWx1ZSArIFwiLCBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnZXhwcmVzc2lvblJlc3VsdCcgLCBleHByZXNzaW9uUmVzdWx0KVxuXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25SZXN1bHQgPSBleHByZXNzaW9uUmVzdWx0LnJlcGxhY2UoLyxcXHMqJC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiJyArIGxpbmUucHJvcE5hbWUgKyAnXCI6XCInICsgZXhwcmVzc2lvblJlc3VsdCArICdcIiwnO1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uUmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMy42IGZpbmlzaCcpXG5cbiAgICAgICAgICAgIGRhdGFMYXllciA9IGRhdGFMYXllci5yZXBsYWNlKC8sXFxzKiQvLCBcIlwiKTsgLy8gcmVtb3ZlIHRoZSBsYXN0IGNvbW1hIGZyb20gdGhlIGRhdGFMYXllciB2YXJpYWJsZVxuICAgICAgICAgICAgZGF0YUxheWVyICs9IFwifVwiO1xuICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKEpTT04ucGFyc2UoZGF0YUxheWVyKSlcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGFMYXllcik7XG4gICAgICAgIH07XG5cblxuICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMScsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICBpc0RhdGFVbmF2YWlsYWJsZShwcm9wcylcbiAgICAgICAgaWYgKCFteC5nYTRDb25uZWN0ZWQgJiYgIW14LmdhNFBlbmRpbmcpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAyJywgcHJvcHMucGFnZVZpZXdFdmVudE5hbWUpXG5cbiAgICAgICAgICAgIC8vIGZsYWcgdG8gcHJldmVudCBvbk5hdmlnYXRpb24gZnJvbSBzZW5kaW5nIG11bHRpcGxlIHBhZ2Ugdmlld3MgYWZ0ZXIgdGhpbmdzIGxpa2UgYWZ0ZXIgd2lkZ2V0IGxvYWQsIGFmdGVyIHNob3cgcGFnZSwgZXRjLlxuXG4gICAgICAgICAgICAvLyBkYXRhVW5hdmFpbGFibGUgY2hlY2sgaGVyZSBiZWNhdXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gd2lsbCB0YWtlIGNhcmUgb2YgY2FsbGluZyBpdCBtdWx0aXBsZSB0aW1lc1xuICAgICAgICAgICAgaWYgKCFteC5nYTRQZW5kaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMycsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICAgICAgICAgIGlmICghaXNEYXRhVW5hdmFpbGFibGUocHJvcHMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAzIHNldHRpbmcgdXAgbmF2aWdhdGlvbicsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnT25OYXZpZ2F0aW9uID0gbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb247IC8vIHNhdmUgd2hhdCB0aGUgb3JpZ2luYWwgb25OYXZpZ2F0aW9uIGZ1bmN0aW9uIGRpZFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbXguZ2E0UGVuZGluZyA9IHRydWU7IC8vIFdlIGhhdmUgc2V0IHRoZSBwYWdlIGluaXRpYWxpemF0aW9uLCBub3cgdG9nZ2xlIHRoZSBzd2l0Y2ggb2ZmIHRvIGF2b2lkIHNldHRpbmcgdXAgZHVwbGljYXRlIGluc2FuY2VzXG4gICAgICAgICAgICAgICAgICAgIG14LmdhNFB1c2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEN1c3RvbSBBY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuc2VuZEN1c3RvbVByb3BzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ01hbmFnZXJBcmdzSW5pdGlhbGl6ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3RtSWQ6IHByb3BzLm1lYXN1cmVtZW50SURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAzIGluaXRpYWxpemUgc3RhcnQnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUYWdNYW5hZ2VyLmluaXRpYWxpemUodGFnTWFuYWdlckFyZ3NJbml0aWFsaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMyBpbml0aWFsaXplIGVuZCcsIHByb3BzLnBhZ2VWaWV3RXZlbnROYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhTGF5ZXIgPSBkYXRhTGF5ZXJTdHJ1Y3R1cmUocHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ01hbmFnZXJBcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndG1JZDogcHJvcHMubWVhc3VyZW1lbnRJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUxheWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUYWdNYW5hZ2VyLmluaXRpYWxpemUodGFnTWFuYWdlckFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdzdGVwIDMgdXBkYXRpbmcgZmxhZ3MnLCBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbXguZ2E0Q29ubmVjdGVkID0gdHJ1ZTsgLy8gV2UgaGF2ZSBzZW50IHRoZSBwYWdlIGhpdCwgbm93IHRvZ2dsZSB0aGUgc3dpdGNoIG9mZiB0byBhdm9pZCBzZW5kaW5nIGR1cGxpY2F0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIG14LmdhNFBlbmRpbmcgPSBmYWxzZTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9yaWdpbmFsIEFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdPbk5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG14LmdhNFBlbmRpbmcgJiYgbXguZ2E0UHVzaCkgeyAvLyBpZiBvdGhlciBwdXNoZXMgYXJlIG5lZWRlZCB0byBiZSBkb25lIGJ1dCB0aGUgaW5pdGlhbGl6YXRpb24gaXMgbm90IHllZCBkb25lXG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAzLjIwIG9uTmF2aWdhdGlvbiBmb2xsb3ctdXAgcHVzaCcpXG4gICAgICAgICAgICBpZiAoIWlzRGF0YVVuYXZhaWxhYmxlKHByb3BzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdPbk5hdmlnYXRpb24gPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbjsgLy8gc2F2ZSB3aGF0IHRoZSBvcmlnaW5hbCBvbk5hdmlnYXRpb24gZnVuY3Rpb24gZGlkXG4gICAgICAgICAgICAgICAgbXguZ2E0UHVzaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAzLjIxIG9uTmF2aWdhdGlvbiBmb2xsb3ctdXAgcHVzaCcpXG4gICAgICAgICAgICAgICAgICAgIG9yaWdPbk5hdmlnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhTGF5ZXIgPSBkYXRhTGF5ZXJTdHJ1Y3R1cmUocHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaChkYXRhTGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobXguZ2E0UHVzaCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdzdGVwIDMuMzAgc2ltcGxlIHB1c2gnKVxuXG4gICAgICAgICAgICBpZiAoIWlzRGF0YVVuYXZhaWxhYmxlKHByb3BzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdPbk5hdmlnYXRpb24gPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbjsgLy8gc2F2ZSB3aGF0IHRoZSBvcmlnaW5hbCBvbk5hdmlnYXRpb24gZnVuY3Rpb24gZGlkXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3N0ZXAgMy4zMSBzaW1wbGUgcHVzaCcpXG4gICAgICAgICAgICAgICAgbXguZ2E0UHVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFMYXllciA9IGRhdGFMYXllclN0cnVjdHVyZShwcm9wcyk7XG4gICAgICAgICAgICAgICAgbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnc3RlcCAzLjMxIG9uTmF2aWdhdGlvbiBmb2xsb3ctdXAgcHVzaCcpXG4gICAgICAgICAgICAgICAgICAgIG9yaWdPbk5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2luZG93LmRhdGFMYXllci5wdXNoKGRhdGFMYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3NraXBwaW5nJylcbiAgICAgICAgfVxuICAgIH0pOyAvLyBubyBkZXBlbmRlbmN5IGFycmF5IC0+IHRyaWdnZXIgb24gZXZlcnkgbG9hZFxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbml0aWFsaXplR1RNO1xuIiwiaW1wb3J0IEluaXRpYWxpemVHVE0gZnJvbSBcIi4vY29tcG9uZW50cy9Jbml0aWFsaXplR1RNXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBHb29nbGVUYWdNYW5hZ2VyKHtcbiAgICBtZWFzdXJlbWVudElELFxuICAgIHNlbmRDdXN0b21Qcm9wcyxcbiAgICBwYWdlVmlld0V2ZW50TmFtZSxcbiAgICBzZW5kUGFnZVRpdGxlLFxuICAgIHNlbmRNb2R1bGVMb2NhdGlvbixcbiAgICBzZW5kUGFnZVVSTCxcbiAgICBzZW5kU2Vzc2lvbklELFxuICAgIHNlbmRBZGRpdGlvbmFsUHJvcHMsXG4gICAgYWRkaXRpb25hbFByb3BzXG59KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEluaXRpYWxpemVHVE1cbiAgICAgICAgICAgIG1lYXN1cmVtZW50SUQ9e21lYXN1cmVtZW50SUR9XG4gICAgICAgICAgICBzZW5kQ3VzdG9tUHJvcHM9e3NlbmRDdXN0b21Qcm9wc31cbiAgICAgICAgICAgIHBhZ2VWaWV3RXZlbnROYW1lPXtwYWdlVmlld0V2ZW50TmFtZX1cbiAgICAgICAgICAgIHNlbmRQYWdlVGl0bGU9e3NlbmRQYWdlVGl0bGV9XG4gICAgICAgICAgICBzZW5kTW9kdWxlTG9jYXRpb249e3NlbmRNb2R1bGVMb2NhdGlvbn1cbiAgICAgICAgICAgIHNlbmRQYWdlVVJMPXtzZW5kUGFnZVVSTH1cbiAgICAgICAgICAgIHNlbmRTZXNzaW9uSUQ9e3NlbmRTZXNzaW9uSUR9XG4gICAgICAgICAgICBzZW5kQWRkaXRpb25hbFByb3BzPXtzZW5kQWRkaXRpb25hbFByb3BzfVxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BzPXthZGRpdGlvbmFsUHJvcHN9XG4gICAgICAgIC8+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpZXdDc3MoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL3VpL0dvb2dsZVRhZ01hbmFnZXIuY3NzXCIpO1xufVxuIl0sIm5hbWVzIjpbInN0eWxlSW5qZWN0IiwiY3NzIiwicmVmIiwiaW5zZXJ0QXQiLCJkb2N1bWVudCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsImNyZWF0ZVRleHROb2RlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ3YXJuIiwicyIsImNvbnNvbGUiLCJfd2FybiIsInJlcXVpcmUiLCJfd2FybjIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJTbmlwcGV0cyIsInRhZ3MiLCJfcmVmIiwiaWQiLCJldmVudHMiLCJkYXRhTGF5ZXIiLCJkYXRhTGF5ZXJOYW1lIiwicHJldmlldyIsImF1dGgiLCJndG1fYXV0aCIsImd0bV9wcmV2aWV3IiwiaWZyYW1lIiwic2NyaXB0IiwiSlNPTiIsInN0cmluZ2lmeSIsInNsaWNlIiwiZGF0YUxheWVyVmFyIiwiX2RhdGFMYXllciIsIm1vZHVsZSIsIl9TbmlwcGV0cyIsIl9TbmlwcGV0czIiLCJUYWdNYW5hZ2VyIiwiZGF0YVNjcmlwdCIsImlubmVySFRNTCIsImd0bSIsImFyZ3MiLCJzbmlwcGV0cyIsIm5vU2NyaXB0Iiwibm9zY3JpcHQiLCJpbml0aWFsaXplIiwiZ3RtSWQiLCJfcmVmJGV2ZW50cyIsInVuZGVmaW5lZCIsIl9yZWYkZGF0YUxheWVyTmFtZSIsIl9yZWYkYXV0aCIsIl9yZWYkcHJldmlldyIsImNoaWxkTm9kZXMiLCJib2R5IiwiX3JlZjIiLCJfcmVmMiRkYXRhTGF5ZXJOYW1lIiwid2luZG93IiwicHVzaCIsIl9UYWdNYW5hZ2VyIiwiX1RhZ01hbmFnZXIyIiwiSW5pdGlhbGl6ZUdUTSIsInByb3BzIiwidXNlRWZmZWN0IiwiaXNEYXRhVW5hdmFpbGFibGUiLCJkYXRhVW5hdmFpbGFibGUiLCJvYmplY3QiLCJhZGRpdGlvbmFsUHJvcHMiLCJwcm9wRGF0YVNvdXJjZSIsInN0YXR1cyIsIml0ZW1zIiwibGVuZ3RoIiwic2VuZEFkZGl0aW9uYWxQcm9wcyIsImRhdGFMYXllclN0cnVjdHVyZSIsInBhZ2VWaWV3RXZlbnROYW1lIiwic2VuZFBhZ2VUaXRsZSIsIm14IiwidWkiLCJnZXRDb250ZW50Rm9ybSIsInRpdGxlIiwic2VuZE1vZHVsZUxvY2F0aW9uIiwibW9kdWxlUGF0aCIsInBhdGgiLCJtb2R1bGVMb2NhdGlvbiIsIm1vZFBhdGgiLCJwYWdlRXh0ZW5zaW9uIiwic3Vic3RyIiwic2VuZFBhZ2VVUkwiLCJwYWdlVVJMIiwidXJsIiwibG9jYXRpb24iLCJvcmlnaW4iLCJ0cmltbWVkVVJMIiwiZnVsbFVSTCIsImxhc3RDaGFySW5kZXgiLCJsYXN0SW5kZXhPZiIsImVuZFN0cmluZyIsInN1YnN0cmluZyIsImlzTmFOIiwic2VuZFNlc3Npb25JRCIsInNlc3Npb24iLCJnZXRTZXNzaW9uT2JqZWN0SWQiLCJleHByZXNzaW9uUmVzdWx0IiwibGluZSIsInByb3BWYWx1ZSIsImdldCIsInJlcGxhY2UiLCJwcm9wTmFtZSIsInBhcnNlIiwiZ2E0Q29ubmVjdGVkIiwiZ2E0UGVuZGluZyIsIm9yaWdPbk5hdmlnYXRpb24iLCJvbk5hdmlnYXRpb24iLCJnYTRQdXNoIiwic2VuZEN1c3RvbVByb3BzIiwidGFnTWFuYWdlckFyZ3NJbml0aWFsaXplIiwibWVhc3VyZW1lbnRJRCIsInRhZ01hbmFnZXJBcmdzIiwiR29vZ2xlVGFnTWFuYWdlciIsImdldFByZXZpZXdDc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxXQUFXQSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtFQUM3QixJQUFLQSxHQUFHLEtBQUssS0FBSyxDQUFDLEVBQUdBLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFDOUIsRUFBQSxJQUFJQyxRQUFRLEdBQUdELEdBQUcsQ0FBQ0MsUUFBUSxDQUFBO0FBRTNCLEVBQUEsSUFBSSxDQUFDRixHQUFHLElBQUksT0FBT0csUUFBUSxLQUFLLFdBQVcsRUFBRTtBQUFFLElBQUEsT0FBQTtBQUFRLEdBQUE7QUFFdkQsRUFBQSxJQUFJQyxJQUFJLEdBQUdELFFBQVEsQ0FBQ0MsSUFBSSxJQUFJRCxRQUFRLENBQUNFLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3BFLEVBQUEsSUFBSUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtFQUMzQ0QsS0FBSyxDQUFDRSxJQUFJLEdBQUcsVUFBVSxDQUFBO0VBRXZCLElBQUlOLFFBQVEsS0FBSyxLQUFLLEVBQUU7SUFDdEIsSUFBSUUsSUFBSSxDQUFDSyxVQUFVLEVBQUU7TUFDbkJMLElBQUksQ0FBQ00sWUFBWSxDQUFDSixLQUFLLEVBQUVGLElBQUksQ0FBQ0ssVUFBVSxDQUFDLENBQUE7QUFDM0MsS0FBQyxNQUFNO0FBQ0xMLE1BQUFBLElBQUksQ0FBQ08sV0FBVyxDQUFDTCxLQUFLLENBQUMsQ0FBQTtBQUN6QixLQUFBO0FBQ0YsR0FBQyxNQUFNO0FBQ0xGLElBQUFBLElBQUksQ0FBQ08sV0FBVyxDQUFDTCxLQUFLLENBQUMsQ0FBQTtBQUN6QixHQUFBO0VBRUEsSUFBSUEsS0FBSyxDQUFDTSxVQUFVLEVBQUU7QUFDcEJOLElBQUFBLEtBQUssQ0FBQ00sVUFBVSxDQUFDQyxPQUFPLEdBQUdiLEdBQUcsQ0FBQTtBQUNoQyxHQUFDLE1BQU07SUFDTE0sS0FBSyxDQUFDSyxXQUFXLENBQUNSLFFBQVEsQ0FBQ1csY0FBYyxDQUFDZCxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pELEdBQUE7QUFDRjs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQWUsTUFBTSxDQUFDQyxjQUFjLENBQUNDLE1BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0NDLEVBQUFBLEtBQUssRUFBRSxJQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUE7QUFDRixJQUFJQyxJQUFJLEdBQUcsU0FBU0EsSUFBSUEsQ0FBQ0MsQ0FBQyxFQUFFO0FBQzFCQyxFQUFBQSxPQUFPLENBQUNGLElBQUksQ0FBQyxhQUFhLEVBQUVDLENBQUMsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQTtBQUVESCxNQUFBQSxDQUFBQSxPQUFlLEdBQUdFOztBQ1BsQixJQUFJRyxLQUFLLEdBQUdDLE1BQXVCLENBQUE7QUFFbkMsSUFBSUMsTUFBTSxHQUFHQyx3QkFBc0IsQ0FBQ0gsS0FBSyxDQUFDLENBQUE7QUFFMUMsU0FBU0csd0JBQXNCQSxDQUFDQyxHQUFHLEVBQUU7QUFBRSxFQUFBLE9BQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFVLEdBQUdELEdBQUcsR0FBRztBQUFFRSxJQUFBQSxPQUFPLEVBQUVGLEdBQUFBO0dBQUssQ0FBQTtBQUFFLENBQUE7O0FBRTlGOztBQUVBLElBQUlHLFFBQVEsR0FBRztBQUNiQyxFQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQ0MsSUFBSSxFQUFFO0FBQ3hCLElBQUEsSUFBSUMsRUFBRSxHQUFHRCxJQUFJLENBQUNDLEVBQUU7TUFDWkMsTUFBTSxHQUFHRixJQUFJLENBQUNFLE1BQU07TUFDcEJDLFNBQVMsR0FBR0gsSUFBSSxDQUFDRyxTQUFTO01BQzFCQyxhQUFhLEdBQUdKLElBQUksQ0FBQ0ksYUFBYTtNQUNsQ0MsT0FBTyxHQUFHTCxJQUFJLENBQUNLLE9BQU87TUFDdEJDLElBQUksR0FBR04sSUFBSSxDQUFDTSxJQUFJLENBQUE7QUFFcEIsSUFBQSxJQUFJQyxRQUFRLEdBQUcsWUFBWSxHQUFHRCxJQUFJLENBQUE7QUFDbEMsSUFBQSxJQUFJRSxXQUFXLEdBQUcsZUFBZSxHQUFHSCxPQUFPLENBQUE7SUFFM0MsSUFBSSxDQUFDSixFQUFFLEVBQUUsSUFBSVIsTUFBTSxDQUFDSSxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtJQUVsRCxJQUFJWSxNQUFNLEdBQUcsbUVBQW1FLEdBQUdSLEVBQUUsR0FBR00sUUFBUSxHQUFHQyxXQUFXLEdBQUcscUhBQXFILENBQUE7QUFFdE8sSUFBQSxJQUFJRSxNQUFNLEdBQUcsd0hBQXdILEdBQUdDLElBQUksQ0FBQ0MsU0FBUyxDQUFDVixNQUFNLENBQUMsQ0FBQ1csS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLDhMQUE4TCxHQUFHTixRQUFRLEdBQUdDLFdBQVcsR0FBRyx3R0FBd0csR0FBR0osYUFBYSxHQUFHLE9BQU8sR0FBR0gsRUFBRSxHQUFHLE1BQU0sQ0FBQTtJQUV4aEIsSUFBSWEsWUFBWSxHQUFHLElBQUksQ0FBQ1gsU0FBUyxDQUFDQSxTQUFTLEVBQUVDLGFBQWEsQ0FBQyxDQUFBO0lBRTNELE9BQU87QUFDTEssTUFBQUEsTUFBTSxFQUFFQSxNQUFNO0FBQ2RDLE1BQUFBLE1BQU0sRUFBRUEsTUFBTTtBQUNkSSxNQUFBQSxZQUFZLEVBQUVBLFlBQUFBO0tBQ2YsQ0FBQTtHQUNGO0FBQ0RYLEVBQUFBLFNBQVMsRUFBRSxTQUFTQSxTQUFTQSxDQUFDWSxVQUFVLEVBQUVYLGFBQWEsRUFBRTtJQUN2RCxPQUFPLGlCQUFpQixHQUFHQSxhQUFhLEdBQUcsWUFBWSxHQUFHQSxhQUFhLEdBQUcsd0JBQXdCLEdBQUdBLGFBQWEsR0FBRyxRQUFRLEdBQUdPLElBQUksQ0FBQ0MsU0FBUyxDQUFDRyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUE7QUFDbEssR0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVEQyxJQUFBQSxVQUFjLEdBQUdsQixRQUFROztBQ3ZDekIsSUFBSW1CLFNBQVMsR0FBR3pCLFVBQXFCLENBQUE7QUFFckMsSUFBSTBCLFVBQVUsR0FBR3hCLHdCQUFzQixDQUFDdUIsU0FBUyxDQUFDLENBQUE7QUFFbEQsU0FBU3ZCLHdCQUFzQkEsQ0FBQ0MsR0FBRyxFQUFFO0FBQUUsRUFBQSxPQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsVUFBVSxHQUFHRCxHQUFHLEdBQUc7QUFBRUUsSUFBQUEsT0FBTyxFQUFFRixHQUFBQTtHQUFLLENBQUE7QUFBRSxDQUFBO0FBRTlGLElBQUl3QixVQUFVLEdBQUc7QUFDZkMsRUFBQUEsVUFBVSxFQUFFLFNBQVNBLFVBQVVBLENBQUNqQixTQUFTLEVBQUU7QUFDekMsSUFBQSxJQUFJTyxNQUFNLEdBQUd0QyxRQUFRLENBQUNJLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3Q2tDLE1BQU0sQ0FBQ1csU0FBUyxHQUFHbEIsU0FBUyxDQUFBO0FBQzVCLElBQUEsT0FBT08sTUFBTSxDQUFBO0dBQ2Q7QUFDRFksRUFBQUEsR0FBRyxFQUFFLFNBQVNBLEdBQUdBLENBQUNDLElBQUksRUFBRTtJQUN0QixJQUFJQyxRQUFRLEdBQUdOLFVBQVUsQ0FBQ3JCLE9BQU8sQ0FBQ0UsSUFBSSxDQUFDd0IsSUFBSSxDQUFDLENBQUE7QUFFNUMsSUFBQSxJQUFJRSxRQUFRLEdBQUcsU0FBU0EsUUFBUUEsR0FBRztBQUNqQyxNQUFBLElBQUlDLFFBQVEsR0FBR3RELFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2pEa0QsTUFBQUEsUUFBUSxDQUFDTCxTQUFTLEdBQUdHLFFBQVEsQ0FBQ2YsTUFBTSxDQUFBO0FBQ3BDLE1BQUEsT0FBT2lCLFFBQVEsQ0FBQTtLQUNoQixDQUFBO0FBRUQsSUFBQSxJQUFJaEIsTUFBTSxHQUFHLFNBQVNBLE1BQU1BLEdBQUc7QUFDN0IsTUFBQSxJQUFJQSxNQUFNLEdBQUd0QyxRQUFRLENBQUNJLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM3Q2tDLE1BQUFBLE1BQU0sQ0FBQ1csU0FBUyxHQUFHRyxRQUFRLENBQUNkLE1BQU0sQ0FBQTtBQUNsQyxNQUFBLE9BQU9BLE1BQU0sQ0FBQTtLQUNkLENBQUE7SUFFRCxJQUFJVSxVQUFVLEdBQUcsSUFBSSxDQUFDQSxVQUFVLENBQUNJLFFBQVEsQ0FBQ1YsWUFBWSxDQUFDLENBQUE7SUFFdkQsT0FBTztBQUNMVyxNQUFBQSxRQUFRLEVBQUVBLFFBQVE7QUFDbEJmLE1BQUFBLE1BQU0sRUFBRUEsTUFBTTtBQUNkVSxNQUFBQSxVQUFVLEVBQUVBLFVBQUFBO0tBQ2IsQ0FBQTtHQUNGO0FBQ0RPLEVBQUFBLFVBQVUsRUFBRSxTQUFTQSxVQUFVQSxDQUFDM0IsSUFBSSxFQUFFO0FBQ3BDLElBQUEsSUFBSTRCLEtBQUssR0FBRzVCLElBQUksQ0FBQzRCLEtBQUs7TUFDbEJDLFdBQVcsR0FBRzdCLElBQUksQ0FBQ0UsTUFBTTtNQUN6QkEsTUFBTSxHQUFHMkIsV0FBVyxLQUFLQyxTQUFTLEdBQUcsRUFBRSxHQUFHRCxXQUFXO01BQ3JEMUIsU0FBUyxHQUFHSCxJQUFJLENBQUNHLFNBQVM7TUFDMUI0QixrQkFBa0IsR0FBRy9CLElBQUksQ0FBQ0ksYUFBYTtBQUN2Q0EsTUFBQUEsYUFBYSxHQUFHMkIsa0JBQWtCLEtBQUtELFNBQVMsR0FBRyxXQUFXLEdBQUdDLGtCQUFrQjtNQUNuRkMsU0FBUyxHQUFHaEMsSUFBSSxDQUFDTSxJQUFJO0FBQ3JCQSxNQUFBQSxJQUFJLEdBQUcwQixTQUFTLEtBQUtGLFNBQVMsR0FBRyxFQUFFLEdBQUdFLFNBQVM7TUFDL0NDLFlBQVksR0FBR2pDLElBQUksQ0FBQ0ssT0FBTztBQUMzQkEsTUFBQUEsT0FBTyxHQUFHNEIsWUFBWSxLQUFLSCxTQUFTLEdBQUcsRUFBRSxHQUFHRyxZQUFZLENBQUE7QUFFNUQsSUFBQSxJQUFJWCxHQUFHLEdBQUcsSUFBSSxDQUFDQSxHQUFHLENBQUM7QUFDakJyQixNQUFBQSxFQUFFLEVBQUUyQixLQUFLO0FBQ1QxQixNQUFBQSxNQUFNLEVBQUVBLE1BQU07TUFDZEMsU0FBUyxFQUFFQSxTQUFTLElBQUkyQixTQUFTO0FBQ2pDMUIsTUFBQUEsYUFBYSxFQUFFQSxhQUFhO0FBQzVCRSxNQUFBQSxJQUFJLEVBQUVBLElBQUk7QUFDVkQsTUFBQUEsT0FBTyxFQUFFQSxPQUFBQTtBQUNYLEtBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSUYsU0FBUyxFQUFFL0IsUUFBUSxDQUFDQyxJQUFJLENBQUNPLFdBQVcsQ0FBQzBDLEdBQUcsQ0FBQ0YsVUFBVSxDQUFDLENBQUE7QUFDeERoRCxJQUFBQSxRQUFRLENBQUNDLElBQUksQ0FBQ00sWUFBWSxDQUFDMkMsR0FBRyxDQUFDWixNQUFNLEVBQUUsRUFBRXRDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDNkQsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDckU5RCxJQUFBQSxRQUFRLENBQUMrRCxJQUFJLENBQUN4RCxZQUFZLENBQUMyQyxHQUFHLENBQUNHLFFBQVEsRUFBRSxFQUFFckQsUUFBUSxDQUFDK0QsSUFBSSxDQUFDRCxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUN4RTtBQUNEL0IsRUFBQUEsU0FBUyxFQUFFLFNBQVNBLFNBQVNBLENBQUNpQyxLQUFLLEVBQUU7QUFDbkMsSUFBQSxJQUFJckIsVUFBVSxHQUFHcUIsS0FBSyxDQUFDakMsU0FBUztNQUM1QmtDLG1CQUFtQixHQUFHRCxLQUFLLENBQUNoQyxhQUFhO0FBQ3pDQSxNQUFBQSxhQUFhLEdBQUdpQyxtQkFBbUIsS0FBS1AsU0FBUyxHQUFHLFdBQVcsR0FBR08sbUJBQW1CLENBQUE7QUFFekYsSUFBQSxJQUFJQyxNQUFNLENBQUNsQyxhQUFhLENBQUMsRUFBRSxPQUFPa0MsTUFBTSxDQUFDbEMsYUFBYSxDQUFDLENBQUNtQyxJQUFJLENBQUN4QixVQUFVLENBQUMsQ0FBQTtJQUN4RSxJQUFJUyxRQUFRLEdBQUdOLFVBQVUsQ0FBQ3JCLE9BQU8sQ0FBQ00sU0FBUyxDQUFDWSxVQUFVLEVBQUVYLGFBQWEsQ0FBQyxDQUFBO0FBQ3RFLElBQUEsSUFBSWdCLFVBQVUsR0FBRyxJQUFJLENBQUNBLFVBQVUsQ0FBQ0ksUUFBUSxDQUFDLENBQUE7QUFDMUNwRCxJQUFBQSxRQUFRLENBQUNDLElBQUksQ0FBQ00sWUFBWSxDQUFDeUMsVUFBVSxFQUFFaEQsUUFBUSxDQUFDQyxJQUFJLENBQUM2RCxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNyRSxHQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRURsQixJQUFBQSxZQUFjLEdBQUdHLFVBQVU7O0FDdkUzQixJQUFJcUIsV0FBVyxHQUFHaEQsWUFBdUIsQ0FBQTtBQUV6QyxJQUFJaUQsWUFBWSxHQUFHL0Msc0JBQXNCLENBQUM4QyxXQUFXLENBQUMsQ0FBQTtBQUV0RCxTQUFTOUMsc0JBQXNCQSxDQUFDQyxHQUFHLEVBQUU7QUFBRSxFQUFBLE9BQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFVLEdBQUdELEdBQUcsR0FBRztBQUFFRSxJQUFBQSxPQUFPLEVBQUVGLEdBQUFBO0dBQUssQ0FBQTtBQUFFLENBQUE7SUFFOUZxQixJQUFjLEdBQUd5QixZQUFZLENBQUM1QyxPQUFPOztBQ0xyQyxNQUFNNkMsYUFBYSxHQUFHQyxLQUFLLElBQUk7QUFDM0JDLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0lBQ1osTUFBTUMsaUJBQWlCLEdBQUdBLE1BQU07TUFDNUIsSUFBSUMsZUFBZSxHQUFHLEtBQUssQ0FBQTtBQUMzQjtBQUNBLE1BQUEsS0FBSyxNQUFNQyxNQUFNLElBQUlKLEtBQUssQ0FBQ0ssZUFBZSxFQUFFO0FBQ3hDO1FBQ0EsSUFBSUQsTUFBTSxDQUFDRSxjQUFjLENBQUNDLE1BQU0sS0FBSyxXQUFXLElBQUssQ0FBQ0gsTUFBTSxDQUFDRSxjQUFjLENBQUNFLEtBQUssQ0FBQ0MsTUFBTSxJQUFJVCxLQUFLLENBQUNVLG1CQUFvQixFQUFFO0FBQ3BIUCxVQUFBQSxlQUFlLEdBQUcsSUFBSSxDQUFBO0FBQ3RCO0FBRUosU0FBQTtBQUNKLE9BQUE7QUFDQSxNQUFBLE9BQU9BLGVBQWUsQ0FBQTtLQUN6QixDQUFBO0lBRUQsTUFBTVEsa0JBQWtCLEdBQUdBLE1BQU07TUFDN0IsSUFBSW5ELFNBQVMsR0FBRyxZQUFZLEdBQUd3QyxLQUFLLENBQUNZLGlCQUFpQixHQUFHLElBQUksQ0FBQzs7TUFFOUQsSUFBSVosS0FBSyxDQUFDYSxhQUFhLEVBQUU7QUFDckI7QUFDQTtBQUNBckQsUUFBQUEsU0FBUyxJQUFJLGVBQWUsR0FBR3NELEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxjQUFjLEVBQUUsQ0FBQ0MsS0FBSyxHQUFHLElBQUksQ0FBQTtBQUN0RSxPQUFBO01BRUEsSUFBSWpCLEtBQUssQ0FBQ2tCLGtCQUFrQixFQUFFO0FBQzFCO0FBQ0E7UUFDQSxJQUFJQyxVQUFVLEdBQUdMLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxjQUFjLEVBQUUsQ0FBQ0ksSUFBSSxDQUFBO0FBQzVDLFFBQUEsSUFBSUMsY0FBYyxHQUFHLFVBQVVDLE9BQU8sRUFBRTtVQUNwQyxJQUFJQyxhQUFhLEdBQUcsV0FBVyxDQUFBO0FBQy9CLFVBQUEsSUFBSUgsSUFBSSxHQUFHRSxPQUFPLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEVBQUVGLE9BQU8sQ0FBQ2IsTUFBTSxHQUFHYyxhQUFhLENBQUNkLE1BQU0sQ0FBQyxDQUFBO0FBQ25FLFVBQUEsT0FBT1csSUFBSSxDQUFBO1NBQ2QsQ0FBQTtRQUNENUQsU0FBUyxJQUFJLHFCQUFxQixHQUFHNkQsY0FBYyxDQUFDRixVQUFVLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDMUUsT0FBQTtNQUVBLElBQUluQixLQUFLLENBQUN5QixXQUFXLEVBQUU7QUFDbkI7QUFDQTtBQUNBLFFBQUEsSUFBSUMsT0FBTyxDQUFBO1FBQ1gsSUFBSVosRUFBRSxDQUFDQyxFQUFFLENBQUNDLGNBQWMsRUFBRSxDQUFDVyxHQUFHLEtBQUssSUFBSSxFQUFFO0FBQ3JDRCxVQUFBQSxPQUFPLEdBQUcvQixNQUFNLENBQUNpQyxRQUFRLENBQUNDLE1BQU0sR0FBR2YsRUFBRSxDQUFDQyxFQUFFLENBQUNDLGNBQWMsRUFBRSxDQUFDVyxHQUFHLENBQUE7QUFDakUsU0FBQyxNQUFNO0FBQ0hELFVBQUFBLE9BQU8sR0FBRy9CLE1BQU0sQ0FBQ2lDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFBO0FBQ3BDLFNBQUE7QUFFQSxRQUFBLElBQUlDLFVBQVUsR0FBRyxVQUFVQyxPQUFPLEVBQUU7QUFDaEMsVUFBQSxJQUFJQyxhQUFhLEdBQUdELE9BQU8sQ0FBQ0UsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzVDLFVBQUEsSUFBSUMsU0FBUyxHQUFHSCxPQUFPLENBQUNJLFNBQVMsQ0FBQ0gsYUFBYSxHQUFHLENBQUMsRUFBRUQsT0FBTyxDQUFDdEIsTUFBTSxDQUFDLENBQUE7QUFDcEUsVUFBQSxJQUFJMkIsS0FBSyxDQUFDRixTQUFTLENBQUMsRUFBRTtZQUNsQixPQUFPSCxPQUFPLENBQUM7QUFDbkIsV0FBQyxNQUFNO1lBQ0gsT0FBT0EsT0FBTyxDQUFDUCxNQUFNLENBQUMsQ0FBQyxFQUFFUSxhQUFhLENBQUMsQ0FBQztBQUM1QyxXQUFBO1NBQ0gsQ0FBQTtRQUNEeEUsU0FBUyxJQUFJLGNBQWMsR0FBR3NFLFVBQVUsQ0FBQ0osT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFBO0FBQzVELE9BQUE7TUFFQSxJQUFJMUIsS0FBSyxDQUFDcUMsYUFBYSxFQUFFO0FBQ3JCO0FBQ0E7UUFDQTdFLFNBQVMsSUFBSSxnQkFBZ0IsR0FBR3NELEVBQUUsQ0FBQ3dCLE9BQU8sQ0FBQ0Msa0JBQWtCLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDMUUsT0FBQTtNQUVBLElBQUl2QyxLQUFLLENBQUNVLG1CQUFtQixFQUFFO0FBQzNCO0FBQ0E7UUFDQSxJQUFJOEIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFBOztBQUV6QjtBQUNBLFFBQUEsS0FBSyxNQUFNQyxJQUFJLElBQUl6QyxLQUFLLENBQUNLLGVBQWUsRUFBRTtBQUN0QztVQUNBLEtBQUssTUFBTUQsTUFBTSxJQUFJcUMsSUFBSSxDQUFDbkMsY0FBYyxDQUFDRSxLQUFLLEVBQUU7QUFDNUM7QUFDQWdDLFlBQUFBLGdCQUFnQixJQUFJQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDdkMsTUFBTSxDQUFDLENBQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFBO0FBRS9ELFdBQUE7QUFDQTs7VUFFQWdHLGdCQUFnQixHQUFHQSxnQkFBZ0IsQ0FBQ0ksT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQTtVQUN4RHBGLFNBQVMsSUFBSSxHQUFHLEdBQUdpRixJQUFJLENBQUNJLFFBQVEsR0FBRyxLQUFLLEdBQUdMLGdCQUFnQixHQUFHLElBQUksQ0FBQTtBQUNsRUEsVUFBQUEsZ0JBQWdCLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLFNBQUE7QUFDSixPQUFBO0FBQ0E7O01BRUFoRixTQUFTLEdBQUdBLFNBQVMsQ0FBQ29GLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0NwRixNQUFBQSxTQUFTLElBQUksR0FBRyxDQUFBO0FBQ2hCO0FBQ0EsTUFBQSxPQUFPUSxJQUFJLENBQUM4RSxLQUFLLENBQUN0RixTQUFTLENBQUMsQ0FBQTtLQUMvQixDQUFBOztBQUdEO0lBQ0EwQyxpQkFBaUIsQ0FBTSxDQUFDLENBQUE7SUFDeEIsSUFBSSxDQUFDWSxFQUFFLENBQUNpQyxZQUFZLElBQUksQ0FBQ2pDLEVBQUUsQ0FBQ2tDLFVBQVUsRUFBRTtBQUNwQzs7QUFFQTs7QUFFQTtBQUNBLE1BQUEsSUFBSSxDQUFDbEMsRUFBRSxDQUFDa0MsVUFBVSxFQUFFO0FBRWhCO0FBQ0EsUUFBQSxJQUFJLENBQUM5QyxpQkFBaUIsQ0FBTSxDQUFDLEVBQUU7QUFHM0I7QUFDQSxVQUFBLE1BQU0rQyxnQkFBZ0IsR0FBR25DLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxjQUFjLEVBQUUsQ0FBQ2tDLFlBQVksQ0FBQzs7QUFFN0RwQyxVQUFBQSxFQUFFLENBQUNrQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1VBQ3JCbEMsRUFBRSxDQUFDcUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtVQUdsQnJDLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxjQUFjLEVBQUUsQ0FBQ2tDLFlBQVksR0FBRyxNQUFNO0FBQ3hDO0FBQ0EsWUFBQSxJQUFJbEQsS0FBSyxDQUFDb0QsZUFBZSxLQUFLLEtBQUssRUFBRTtBQUNqQyxjQUFBLE1BQU1DLHdCQUF3QixHQUFHO2dCQUM3QnBFLEtBQUssRUFBRWUsS0FBSyxDQUFDc0QsYUFBQUE7ZUFDaEIsQ0FBQTtBQUNEOztBQUVBOUUsY0FBQUEsSUFBVSxDQUFDUSxVQUFVLENBQUNxRSx3QkFBd0IsQ0FBQyxDQUFBO0FBQy9DO0FBRUosYUFBQyxNQUFNO0FBRUgsY0FBQSxNQUFNN0YsU0FBUyxHQUFHbUQsa0JBQWtCLENBQU0sQ0FBQyxDQUFBO0FBRTNDLGNBQUEsTUFBTTRDLGNBQWMsR0FBRztnQkFDbkJ0RSxLQUFLLEVBQUVlLEtBQUssQ0FBQ3NELGFBQWE7QUFDMUI5RixnQkFBQUEsU0FBQUE7ZUFDSCxDQUFBO0FBRURnQixjQUFBQSxJQUFVLENBQUNRLFVBQVUsQ0FBQ3VFLGNBQWMsQ0FBQyxDQUFBO0FBQ3pDLGFBQUE7QUFDQTs7QUFFQXpDLFlBQUFBLEVBQUUsQ0FBQ2lDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDdkJqQyxFQUFFLENBQUNrQyxVQUFVLEdBQUcsS0FBSyxDQUFBOztBQUVyQjtBQUNBQyxZQUFBQSxnQkFBZ0IsRUFBRSxDQUFBO0FBRWxCLFlBQUEsT0FBTyxJQUFJLENBQUE7V0FDZCxDQUFBO0FBQ0wsU0FBQTtBQUNKLE9BQUE7S0FDSCxNQUFNLElBQUluQyxFQUFFLENBQUNrQyxVQUFVLElBQUlsQyxFQUFFLENBQUNxQyxPQUFPLEVBQUU7QUFBRTs7QUFFdEM7QUFDQSxNQUFBLElBQUksQ0FBQ2pELGlCQUFpQixDQUFNLENBQUMsRUFBRTtBQUMzQixRQUFBLE1BQU0rQyxnQkFBZ0IsR0FBR25DLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxjQUFjLEVBQUUsQ0FBQ2tDLFlBQVksQ0FBQztRQUM3RHBDLEVBQUUsQ0FBQ3FDLE9BQU8sR0FBRyxLQUFLLENBQUE7UUFFbEJyQyxFQUFFLENBQUNDLEVBQUUsQ0FBQ0MsY0FBYyxFQUFFLENBQUNrQyxZQUFZLEdBQUcsTUFBTTtBQUN4QztBQUNBRCxVQUFBQSxnQkFBZ0IsRUFBRSxDQUFBO0FBRWxCLFVBQUEsTUFBTXpGLFNBQVMsR0FBR21ELGtCQUFrQixDQUFNLENBQUMsQ0FBQTtBQUUzQ2hCLFVBQUFBLE1BQU0sQ0FBQ25DLFNBQVMsQ0FBQ29DLElBQUksQ0FBQ3BDLFNBQVMsQ0FBQyxDQUFBO0FBRWhDLFVBQUEsT0FBTyxJQUFJLENBQUE7U0FDZCxDQUFBO0FBQ0wsT0FBQTtBQUNKLEtBQUMsTUFBTSxJQUFJc0QsRUFBRSxDQUFDcUMsT0FBTyxFQUFFO0FBQ25COztBQUVBLE1BQUEsSUFBSSxDQUFDakQsaUJBQWlCLENBQU0sQ0FBQyxFQUFFO0FBQzNCLFFBQUEsTUFBTStDLGdCQUFnQixHQUFHbkMsRUFBRSxDQUFDQyxFQUFFLENBQUNDLGNBQWMsRUFBRSxDQUFDa0MsWUFBWSxDQUFDOztBQUU3RDtRQUNBcEMsRUFBRSxDQUFDcUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtBQUNsQixRQUFBLE1BQU0zRixTQUFTLEdBQUdtRCxrQkFBa0IsQ0FBTSxDQUFDLENBQUE7UUFDM0NHLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxjQUFjLEVBQUUsQ0FBQ2tDLFlBQVksR0FBRyxNQUFNO0FBQ3hDO0FBQ0FELFVBQUFBLGdCQUFnQixFQUFFLENBQUE7QUFFbEIsVUFBQSxPQUFPLElBQUksQ0FBQTtTQUNkLENBQUE7QUFFRHRELFFBQUFBLE1BQU0sQ0FBQ25DLFNBQVMsQ0FBQ29DLElBQUksQ0FBQ3BDLFNBQVMsQ0FBQyxDQUFBO0FBQ3BDLE9BQUE7QUFDSixLQUFDLE1BQU0sQ0FDSDtHQUVQLENBQUMsQ0FBQzs7QUFFSCxFQUFBLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQzs7QUMvTE0sU0FBU2dHLGdCQUFnQkEsQ0FBQztFQUM3QkYsYUFBYTtFQUNiRixlQUFlO0VBQ2Z4QyxpQkFBaUI7RUFDakJDLGFBQWE7RUFDYkssa0JBQWtCO0VBQ2xCTyxXQUFXO0VBQ1hZLGFBQWE7RUFDYjNCLG1CQUFtQjtBQUNuQkwsRUFBQUEsZUFBQUE7QUFDSixDQUFDLEVBQUU7RUFDQyxPQUNJeEUsbUJBQUEsQ0FBQ2tFLGFBQWEsRUFBQTtBQUNWdUQsSUFBQUEsYUFBYSxFQUFFQSxhQUFjO0FBQzdCRixJQUFBQSxlQUFlLEVBQUVBLGVBQWdCO0FBQ2pDeEMsSUFBQUEsaUJBQWlCLEVBQUVBLGlCQUFrQjtBQUNyQ0MsSUFBQUEsYUFBYSxFQUFFQSxhQUFjO0FBQzdCSyxJQUFBQSxrQkFBa0IsRUFBRUEsa0JBQW1CO0FBQ3ZDTyxJQUFBQSxXQUFXLEVBQUVBLFdBQVk7QUFDekJZLElBQUFBLGFBQWEsRUFBRUEsYUFBYztBQUM3QjNCLElBQUFBLG1CQUFtQixFQUFFQSxtQkFBb0I7QUFDekNMLElBQUFBLGVBQWUsRUFBRUEsZUFBQUE7QUFBZ0IsR0FDcEMsQ0FBQyxDQUFBO0FBRVYsQ0FBQTtBQUVPLFNBQVNvRCxhQUFhQSxHQUFHO0VBQzVCLE9BQU81RyxVQUFvQyxDQUFBO0FBQy9DOzs7OzsifQ==
