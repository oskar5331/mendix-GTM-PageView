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
} // https://developers.google.com/tag-manager/quickstart


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
    if (!mx.ga4Connected) {
      // flag to prevent onNavigation from sending multiple page views after things like after widget load, after show page, etc.
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
            };
            dist.initialize(tagManagerArgsInitialize);
          } else {
            let dataLayerStructure = function (props) {
              var dataLayer = '{"event":"' + props.pageViewEventName + '",'; // initialize the dataLayer variable

              if (props.sendPageTitle) {
                // send page title
                dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
              }

              if (props.sendModuleLocation) {
                // send module location
                var modulePath = mx.ui.getContentForm().path;

                var moduleLocation = function (modulePath) {
                  var pageExtension = ".page.xml";
                  var path = modulePath.substr(0, modulePath.length - pageExtension.length);
                  return path;
                }(modulePath);

                dataLayer += '"Module Location":"' + moduleLocation + '",';
              }

              if (props.sendPageURL) {
                // send page URL
                if (mx.ui.getContentForm().url !== null) {
                  var pageURL = window.location.origin + mx.ui.getContentForm().url;
                } else {
                  var pageURL = window.location.origin;
                }

                var trimmedURL = function (fullURL) {
                  var lastCharIndex = fullURL.lastIndexOf("/");
                  var endString = fullURL.substring(lastCharIndex + 1, fullURL.length);

                  if (isNaN(endString)) {
                    return fullURL; // the end of the string isn't a number, return the whole thing
                  } else {
                    return fullPath.substr(0, lastCharIndex); // the end of the string is a number, trim it
                  }
                }(pageURL);

                dataLayer += '"Page URL":"' + trimmedURL + '",';
              }

              if (props.sendSessionID) {
                // send session ID
                dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
              }

              if (props.sendAdditionalProps) {
                // send additional properties
                let expressionResult = '';

                for (let line of props.additionalProps) {
                  for (let object of line.propDataSource.items) {
                    // object is an item in the list that is returned from the data source
                    expressionResult += line.propValue.get(object).value + ', ';
                  }

                  expressionResult = expressionResult.replace(/,\s*$/, "");
                  dataLayer += '"' + line.propName + '":"' + expressionResult + '",';
                  expressionResult = '';
                }
              }

              dataLayer = dataLayer.replace(/,\s*$/, ""); // remove the last comma from the dataLayer variable

              dataLayer += "}";
              return JSON.parse(dataLayer);
            };

            let dataLayer = dataLayerStructure(props);
            const tagManagerArgs = {
              gtmId: props.measurementID,
              dataLayer
            };
            dist.initialize(tagManagerArgs);
          }

          mx.ga4Connected = true; // We have sent the page hit, now toggle the switch off to avoid sending duplicates
          // Original Actions

          origOnNavigation();
          return () => {
          };
        };
      }
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
function getPreviewCss() {
  return require$$0;
}

exports.GoogleTagManager = GoogleTagManager;
exports.getPreviewCss = getPreviewCss;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZ2xlVGFnTWFuYWdlci5lZGl0b3JQcmV2aWV3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWd0bS1tb2R1bGUvZGlzdC91dGlscy93YXJuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWd0bS1tb2R1bGUvZGlzdC9TbmlwcGV0cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvVGFnTWFuYWdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1ndG0tbW9kdWxlL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Jbml0aWFsaXplR1RNLmpzeCIsIi4uLy4uLy4uL3NyYy9Hb29nbGVUYWdNYW5hZ2VyLmVkaXRvclByZXZpZXcuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgd2FybiA9IGZ1bmN0aW9uIHdhcm4ocykge1xuICBjb25zb2xlLndhcm4oJ1tyZWFjdC1ndG1dJywgcyk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB3YXJuOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF93YXJuID0gcmVxdWlyZSgnLi91dGlscy93YXJuJyk7XG5cbnZhciBfd2FybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vdGFnLW1hbmFnZXIvcXVpY2tzdGFydFxuXG52YXIgU25pcHBldHMgPSB7XG4gIHRhZ3M6IGZ1bmN0aW9uIHRhZ3MoX3JlZikge1xuICAgIHZhciBpZCA9IF9yZWYuaWQsXG4gICAgICAgIGV2ZW50cyA9IF9yZWYuZXZlbnRzLFxuICAgICAgICBkYXRhTGF5ZXIgPSBfcmVmLmRhdGFMYXllcixcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgcHJldmlldyA9IF9yZWYucHJldmlldyxcbiAgICAgICAgYXV0aCA9IF9yZWYuYXV0aDtcblxuICAgIHZhciBndG1fYXV0aCA9ICcmZ3RtX2F1dGg9JyArIGF1dGg7XG4gICAgdmFyIGd0bV9wcmV2aWV3ID0gJyZndG1fcHJldmlldz0nICsgcHJldmlldztcblxuICAgIGlmICghaWQpICgwLCBfd2FybjIuZGVmYXVsdCkoJ0dUTSBJZCBpcyByZXF1aXJlZCcpO1xuXG4gICAgdmFyIGlmcmFtZSA9ICdcXG4gICAgICA8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL25zLmh0bWw/aWQ9JyArIGlkICsgZ3RtX2F1dGggKyBndG1fcHJldmlldyArICcmZ3RtX2Nvb2tpZXNfd2luPXhcIlxcbiAgICAgICAgaGVpZ2h0PVwiMFwiIHdpZHRoPVwiMFwiIHN0eWxlPVwiZGlzcGxheTpub25lO3Zpc2liaWxpdHk6aGlkZGVuXCIgaWQ9XCJ0YWctbWFuYWdlclwiPjwvaWZyYW1lPic7XG5cbiAgICB2YXIgc2NyaXB0ID0gJ1xcbiAgICAgIChmdW5jdGlvbih3LGQscyxsLGkpe3dbbF09d1tsXXx8W107XFxuICAgICAgICB3W2xdLnB1c2goe1xcJ2d0bS5zdGFydFxcJzogbmV3IERhdGUoKS5nZXRUaW1lKCksZXZlbnQ6XFwnZ3RtLmpzXFwnLCAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnRzKS5zbGljZSgxLCAtMSkgKyAnfSk7XFxuICAgICAgICB2YXIgZj1kLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdLGo9ZC5jcmVhdGVFbGVtZW50KHMpLGRsPWwhPVxcJ2RhdGFMYXllclxcJz9cXCcmbD1cXCcrbDpcXCdcXCc7XFxuICAgICAgICBqLmFzeW5jPXRydWU7ai5zcmM9XFwnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RtLmpzP2lkPVxcJytpK2RsK1xcJycgKyBndG1fYXV0aCArIGd0bV9wcmV2aWV3ICsgJyZndG1fY29va2llc193aW49eFxcJztcXG4gICAgICAgIGYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaixmKTtcXG4gICAgICB9KSh3aW5kb3csZG9jdW1lbnQsXFwnc2NyaXB0XFwnLFxcJycgKyBkYXRhTGF5ZXJOYW1lICsgJ1xcJyxcXCcnICsgaWQgKyAnXFwnKTsnO1xuXG4gICAgdmFyIGRhdGFMYXllclZhciA9IHRoaXMuZGF0YUxheWVyKGRhdGFMYXllciwgZGF0YUxheWVyTmFtZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWZyYW1lOiBpZnJhbWUsXG4gICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgIGRhdGFMYXllclZhcjogZGF0YUxheWVyVmFyXG4gICAgfTtcbiAgfSxcbiAgZGF0YUxheWVyOiBmdW5jdGlvbiBkYXRhTGF5ZXIoX2RhdGFMYXllciwgZGF0YUxheWVyTmFtZSkge1xuICAgIHJldHVybiAnXFxuICAgICAgd2luZG93LicgKyBkYXRhTGF5ZXJOYW1lICsgJyA9IHdpbmRvdy4nICsgZGF0YUxheWVyTmFtZSArICcgfHwgW107XFxuICAgICAgd2luZG93LicgKyBkYXRhTGF5ZXJOYW1lICsgJy5wdXNoKCcgKyBKU09OLnN0cmluZ2lmeShfZGF0YUxheWVyKSArICcpJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbmlwcGV0czsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfU25pcHBldHMgPSByZXF1aXJlKCcuL1NuaXBwZXRzJyk7XG5cbnZhciBfU25pcHBldHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU25pcHBldHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVGFnTWFuYWdlciA9IHtcbiAgZGF0YVNjcmlwdDogZnVuY3Rpb24gZGF0YVNjcmlwdChkYXRhTGF5ZXIpIHtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LmlubmVySFRNTCA9IGRhdGFMYXllcjtcbiAgICByZXR1cm4gc2NyaXB0O1xuICB9LFxuICBndG06IGZ1bmN0aW9uIGd0bShhcmdzKSB7XG4gICAgdmFyIHNuaXBwZXRzID0gX1NuaXBwZXRzMi5kZWZhdWx0LnRhZ3MoYXJncyk7XG5cbiAgICB2YXIgbm9TY3JpcHQgPSBmdW5jdGlvbiBub1NjcmlwdCgpIHtcbiAgICAgIHZhciBub3NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25vc2NyaXB0Jyk7XG4gICAgICBub3NjcmlwdC5pbm5lckhUTUwgPSBzbmlwcGV0cy5pZnJhbWU7XG4gICAgICByZXR1cm4gbm9zY3JpcHQ7XG4gICAgfTtcblxuICAgIHZhciBzY3JpcHQgPSBmdW5jdGlvbiBzY3JpcHQoKSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuaW5uZXJIVE1MID0gc25pcHBldHMuc2NyaXB0O1xuICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9O1xuXG4gICAgdmFyIGRhdGFTY3JpcHQgPSB0aGlzLmRhdGFTY3JpcHQoc25pcHBldHMuZGF0YUxheWVyVmFyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBub1NjcmlwdDogbm9TY3JpcHQsXG4gICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgIGRhdGFTY3JpcHQ6IGRhdGFTY3JpcHRcbiAgICB9O1xuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKF9yZWYpIHtcbiAgICB2YXIgZ3RtSWQgPSBfcmVmLmd0bUlkLFxuICAgICAgICBfcmVmJGV2ZW50cyA9IF9yZWYuZXZlbnRzLFxuICAgICAgICBldmVudHMgPSBfcmVmJGV2ZW50cyA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmJGV2ZW50cyxcbiAgICAgICAgZGF0YUxheWVyID0gX3JlZi5kYXRhTGF5ZXIsXG4gICAgICAgIF9yZWYkZGF0YUxheWVyTmFtZSA9IF9yZWYuZGF0YUxheWVyTmFtZSxcbiAgICAgICAgZGF0YUxheWVyTmFtZSA9IF9yZWYkZGF0YUxheWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2RhdGFMYXllcicgOiBfcmVmJGRhdGFMYXllck5hbWUsXG4gICAgICAgIF9yZWYkYXV0aCA9IF9yZWYuYXV0aCxcbiAgICAgICAgYXV0aCA9IF9yZWYkYXV0aCA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJGF1dGgsXG4gICAgICAgIF9yZWYkcHJldmlldyA9IF9yZWYucHJldmlldyxcbiAgICAgICAgcHJldmlldyA9IF9yZWYkcHJldmlldyA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJHByZXZpZXc7XG5cbiAgICB2YXIgZ3RtID0gdGhpcy5ndG0oe1xuICAgICAgaWQ6IGd0bUlkLFxuICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICBkYXRhTGF5ZXI6IGRhdGFMYXllciB8fCB1bmRlZmluZWQsXG4gICAgICBkYXRhTGF5ZXJOYW1lOiBkYXRhTGF5ZXJOYW1lLFxuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIHByZXZpZXc6IHByZXZpZXdcbiAgICB9KTtcbiAgICBpZiAoZGF0YUxheWVyKSBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGd0bS5kYXRhU2NyaXB0KTtcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShndG0uc2NyaXB0KCksIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZ3RtLm5vU2NyaXB0KCksIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XG4gIH0sXG4gIGRhdGFMYXllcjogZnVuY3Rpb24gZGF0YUxheWVyKF9yZWYyKSB7XG4gICAgdmFyIF9kYXRhTGF5ZXIgPSBfcmVmMi5kYXRhTGF5ZXIsXG4gICAgICAgIF9yZWYyJGRhdGFMYXllck5hbWUgPSBfcmVmMi5kYXRhTGF5ZXJOYW1lLFxuICAgICAgICBkYXRhTGF5ZXJOYW1lID0gX3JlZjIkZGF0YUxheWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2RhdGFMYXllcicgOiBfcmVmMiRkYXRhTGF5ZXJOYW1lO1xuXG4gICAgaWYgKHdpbmRvd1tkYXRhTGF5ZXJOYW1lXSkgcmV0dXJuIHdpbmRvd1tkYXRhTGF5ZXJOYW1lXS5wdXNoKF9kYXRhTGF5ZXIpO1xuICAgIHZhciBzbmlwcGV0cyA9IF9TbmlwcGV0czIuZGVmYXVsdC5kYXRhTGF5ZXIoX2RhdGFMYXllciwgZGF0YUxheWVyTmFtZSk7XG4gICAgdmFyIGRhdGFTY3JpcHQgPSB0aGlzLmRhdGFTY3JpcHQoc25pcHBldHMpO1xuICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGRhdGFTY3JpcHQsIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFnTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfVGFnTWFuYWdlciA9IHJlcXVpcmUoJy4vVGFnTWFuYWdlcicpO1xuXG52YXIgX1RhZ01hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVGFnTWFuYWdlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX1RhZ01hbmFnZXIyLmRlZmF1bHQ7IiwiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUYWdNYW5hZ2VyIGZyb20gJ3JlYWN0LWd0bS1tb2R1bGUnXHJcblxyXG5jb25zdCBJbml0aWFsaXplR1RNID0gKCBwcm9wcyApID0+IHtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuXHJcbiAgICBpZiAoIW14LmdhNENvbm5lY3RlZCkgeyAvLyBmbGFnIHRvIHByZXZlbnQgb25OYXZpZ2F0aW9uIGZyb20gc2VuZGluZyBtdWx0aXBsZSBwYWdlIHZpZXdzIGFmdGVyIHRoaW5ncyBsaWtlIGFmdGVyIHdpZGdldCBsb2FkLCBhZnRlciBzaG93IHBhZ2UsIGV0Yy5cclxuICAgICAgXHJcbiAgICAgIC8vIGRhdGFVbmF2YWlsYWJsZSBjaGVjayBoZXJlIGJlY2F1c2UgdGhlIHJlbmRlciBmdW5jdGlvbiB3aWxsIHRha2UgY2FyZSBvZiBjYWxsaW5nIGl0IG11bHRpcGxlIHRpbWVzXHJcbiAgICAgIGxldCBkYXRhVW5hdmFpbGFibGUgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHByb3BzLmFkZGl0aW9uYWxQcm9wcykge1xyXG4gICAgICAgIGlmIChvYmplY3QucHJvcERhdGFTb3VyY2Uuc3RhdHVzICE9PSAnYXZhaWxhYmxlJykge1xyXG4gICAgICAgICAgZGF0YVVuYXZhaWxhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZGF0YVVuYXZhaWxhYmxlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9yaWdPbk5hdmlnYXRpb24gPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLm9uTmF2aWdhdGlvbjsgLy8gc2F2ZSB3aGF0IHRoZSBvcmlnaW5hbCBvbk5hdmlnYXRpb24gZnVuY3Rpb24gZGlkXHJcbiAgICAgICAgbXgudWkuZ2V0Q29udGVudEZvcm0oKS5vbk5hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEN1c3RvbSBBY3Rpb25zXHJcbiAgICAgICAgICBpZiAocHJvcHMuc2VuZEN1c3RvbVByb3BzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YWdNYW5hZ2VyQXJnc0luaXRpYWxpemUgPSB7XHJcbiAgICAgICAgICAgICAgZ3RtSWQ6IHByb3BzLm1lYXN1cmVtZW50SURcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVGFnTWFuYWdlci5pbml0aWFsaXplKHRhZ01hbmFnZXJBcmdzSW5pdGlhbGl6ZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhTGF5ZXJTdHJ1Y3R1cmUgPSBmdW5jdGlvbihwcm9wcykge1xyXG4gICAgICAgICAgICAgIHZhciBkYXRhTGF5ZXIgPSAne1wiZXZlbnRcIjpcIicgKyBwcm9wcy5wYWdlVmlld0V2ZW50TmFtZSArICdcIiwnOyAvLyBpbml0aWFsaXplIHRoZSBkYXRhTGF5ZXIgdmFyaWFibGVcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRQYWdlVGl0bGUpIHsgLy8gc2VuZCBwYWdlIHRpdGxlXHJcbiAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiUGFnZSBOYW1lXCI6XCInICsgbXgudWkuZ2V0Q29udGVudEZvcm0oKS50aXRsZSArICdcIiwnO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKHByb3BzLnNlbmRNb2R1bGVMb2NhdGlvbikgeyAvLyBzZW5kIG1vZHVsZSBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZVBhdGggPSBteC51aS5nZXRDb250ZW50Rm9ybSgpLnBhdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlTG9jYXRpb24gPSAoZnVuY3Rpb24obW9kdWxlUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcGFnZUV4dGVuc2lvbiA9IFwiLnBhZ2UueG1sXCI7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gbW9kdWxlUGF0aC5zdWJzdHIoMCwgbW9kdWxlUGF0aC5sZW5ndGggLSBwYWdlRXh0ZW5zaW9uLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgICAgICAgICAgICAgfShtb2R1bGVQYXRoKSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhTGF5ZXIgKz0gJ1wiTW9kdWxlIExvY2F0aW9uXCI6XCInICsgbW9kdWxlTG9jYXRpb24gKyAnXCIsJztcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kUGFnZVVSTCkgeyAvLyBzZW5kIHBhZ2UgVVJMXHJcbiAgICAgICAgICAgICAgICBpZiAobXgudWkuZ2V0Q29udGVudEZvcm0oKS51cmwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgbXgudWkuZ2V0Q29udGVudEZvcm0oKS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcGFnZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWRVUkwgPSAoZnVuY3Rpb24oZnVsbFVSTCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGFzdENoYXJJbmRleCA9IGZ1bGxVUkwubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgZW5kU3RyaW5nID0gZnVsbFVSTC5zdWJzdHJpbmcobGFzdENoYXJJbmRleCArIDEsZnVsbFVSTC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oZW5kU3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdWxsVVJMOyAvLyB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgaXNuJ3QgYSBudW1iZXIsIHJldHVybiB0aGUgd2hvbGUgdGhpbmdcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVsbFBhdGguc3Vic3RyKDAsbGFzdENoYXJJbmRleCk7IC8vIHRoZSBlbmQgb2YgdGhlIHN0cmluZyBpcyBhIG51bWJlciwgdHJpbSBpdFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KHBhZ2VVUkwpKTtcclxuICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCJQYWdlIFVSTFwiOlwiJyArIHRyaW1tZWRVUkwgKyAnXCIsJztcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChwcm9wcy5zZW5kU2Vzc2lvbklEKSB7IC8vIHNlbmQgc2Vzc2lvbiBJRFxyXG4gICAgICAgICAgICAgICAgZGF0YUxheWVyICs9ICdcIlNlc3Npb24gSURcIjpcIicgKyBteC5zZXNzaW9uLmdldFNlc3Npb25PYmplY3RJZCgpICsgJ1wiLCc7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAocHJvcHMuc2VuZEFkZGl0aW9uYWxQcm9wcykgeyAvLyBzZW5kIGFkZGl0aW9uYWwgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4cHJlc3Npb25SZXN1bHQ9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGxpbmUgb2YgcHJvcHMuYWRkaXRpb25hbFByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IG9iamVjdCBvZiBsaW5lLnByb3BEYXRhU291cmNlLml0ZW1zKSB7IC8vIG9iamVjdCBpcyBhbiBpdGVtIGluIHRoZSBsaXN0IHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGUgZGF0YSBzb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uUmVzdWx0ICs9IGxpbmUucHJvcFZhbHVlLmdldChvYmplY3QpLnZhbHVlICsgJywgJztcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvblJlc3VsdCA9IGV4cHJlc3Npb25SZXN1bHQucmVwbGFjZSgvLFxccyokLywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgIGRhdGFMYXllciArPSAnXCInICsgbGluZS5wcm9wTmFtZSArICdcIjpcIicgKyBleHByZXNzaW9uUmVzdWx0ICsgJ1wiLCc7XHJcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25SZXN1bHQgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgZGF0YUxheWVyID0gZGF0YUxheWVyLnJlcGxhY2UoLyxcXHMqJC8sIFwiXCIpOyAvLyByZW1vdmUgdGhlIGxhc3QgY29tbWEgZnJvbSB0aGUgZGF0YUxheWVyIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgZGF0YUxheWVyICs9IFwifVwiXHJcbiAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YUxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFMYXllciA9IGRhdGFMYXllclN0cnVjdHVyZShwcm9wcyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YWdNYW5hZ2VyQXJncyA9IHtcclxuICAgICAgICAgICAgICBndG1JZDogcHJvcHMubWVhc3VyZW1lbnRJRCxcclxuICAgICAgICAgICAgICBkYXRhTGF5ZXJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVGFnTWFuYWdlci5pbml0aWFsaXplKHRhZ01hbmFnZXJBcmdzKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG14LmdhNENvbm5lY3RlZCA9IHRydWU7IC8vIFdlIGhhdmUgc2VudCB0aGUgcGFnZSBoaXQsIG5vdyB0b2dnbGUgdGhlIHN3aXRjaCBvZmYgdG8gYXZvaWQgc2VuZGluZyBkdXBsaWNhdGVzXHJcblxyXG4gICAgICAgICAgLy8gT3JpZ2luYWwgQWN0aW9uc1xyXG4gICAgICAgICAgb3JpZ09uTmF2aWdhdGlvbigpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIG51bGw7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pOyAvLyBubyBkZXBlbmRlbmN5IGFycmF5IC0+IHRyaWdnZXIgb24gZXZlcnkgbG9hZFxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5pdGlhbGl6ZUdUTSIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBJbml0aWFsaXplR1RNIGZyb20gXCIuL2NvbXBvbmVudHMvSW5pdGlhbGl6ZUdUTVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gR29vZ2xlVGFnTWFuYWdlcih7IG1lYXN1cmVtZW50SUQsIHNlbmRDdXN0b21Qcm9wcywgcGFnZVZpZXdFdmVudE5hbWUsIHNlbmRQYWdlVGl0bGUsIHNlbmRNb2R1bGVMb2NhdGlvbiwgc2VuZFBhZ2VVUkwsIHNlbmRTZXNzaW9uSUQsIHNlbmRBZGRpdGlvbmFsUHJvcHMsIGFkZGl0aW9uYWxQcm9wcyB9KSB7XG4gICAgcmV0dXJuIDxJbml0aWFsaXplR1RNIG1lYXN1cmVtZW50SUQ9e21lYXN1cmVtZW50SUR9IHNlbmRDdXN0b21Qcm9wcz17c2VuZEN1c3RvbVByb3BzfSBwYWdlVmlld0V2ZW50TmFtZT17cGFnZVZpZXdFdmVudE5hbWV9IHNlbmRQYWdlVGl0bGU9e3NlbmRQYWdlVGl0bGV9IHNlbmRNb2R1bGVMb2NhdGlvbj17c2VuZE1vZHVsZUxvY2F0aW9ufSBzZW5kUGFnZVVSTD17c2VuZFBhZ2VVUkx9IHNlbmRTZXNzaW9uSUQ9e3NlbmRTZXNzaW9uSUR9IHNlbmRBZGRpdGlvbmFsUHJvcHM9e3NlbmRBZGRpdGlvbmFsUHJvcHN9IGFkZGl0aW9uYWxQcm9wcz17YWRkaXRpb25hbFByb3BzfSAvPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpZXdDc3MoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoXCIuL3VpL0dvb2dsZVRhZ01hbmFnZXIuY3NzXCIpO1xufVxuIl0sIm5hbWVzIjpbInN0eWxlSW5qZWN0IiwiY3NzIiwicmVmIiwiaW5zZXJ0QXQiLCJkb2N1bWVudCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsImNyZWF0ZVRleHROb2RlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ3YXJuIiwicyIsImNvbnNvbGUiLCJfd2FybiIsInJlcXVpcmUiLCJfd2FybjIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJTbmlwcGV0cyIsInRhZ3MiLCJfcmVmIiwiaWQiLCJldmVudHMiLCJkYXRhTGF5ZXIiLCJkYXRhTGF5ZXJOYW1lIiwicHJldmlldyIsImF1dGgiLCJndG1fYXV0aCIsImd0bV9wcmV2aWV3IiwiaWZyYW1lIiwic2NyaXB0IiwiSlNPTiIsInN0cmluZ2lmeSIsInNsaWNlIiwiZGF0YUxheWVyVmFyIiwiX2RhdGFMYXllciIsIm1vZHVsZSIsIl9TbmlwcGV0cyIsIl9TbmlwcGV0czIiLCJUYWdNYW5hZ2VyIiwiZGF0YVNjcmlwdCIsImlubmVySFRNTCIsImd0bSIsImFyZ3MiLCJzbmlwcGV0cyIsIm5vU2NyaXB0Iiwibm9zY3JpcHQiLCJpbml0aWFsaXplIiwiZ3RtSWQiLCJfcmVmJGV2ZW50cyIsInVuZGVmaW5lZCIsIl9yZWYkZGF0YUxheWVyTmFtZSIsIl9yZWYkYXV0aCIsIl9yZWYkcHJldmlldyIsImNoaWxkTm9kZXMiLCJib2R5IiwiX3JlZjIiLCJfcmVmMiRkYXRhTGF5ZXJOYW1lIiwid2luZG93IiwicHVzaCIsIl9UYWdNYW5hZ2VyIiwiX1RhZ01hbmFnZXIyIiwiSW5pdGlhbGl6ZUdUTSIsInByb3BzIiwidXNlRWZmZWN0IiwibXgiLCJnYTRDb25uZWN0ZWQiLCJkYXRhVW5hdmFpbGFibGUiLCJvYmplY3QiLCJhZGRpdGlvbmFsUHJvcHMiLCJwcm9wRGF0YVNvdXJjZSIsInN0YXR1cyIsIm9yaWdPbk5hdmlnYXRpb24iLCJ1aSIsImdldENvbnRlbnRGb3JtIiwib25OYXZpZ2F0aW9uIiwic2VuZEN1c3RvbVByb3BzIiwidGFnTWFuYWdlckFyZ3NJbml0aWFsaXplIiwibWVhc3VyZW1lbnRJRCIsImRhdGFMYXllclN0cnVjdHVyZSIsInBhZ2VWaWV3RXZlbnROYW1lIiwic2VuZFBhZ2VUaXRsZSIsInRpdGxlIiwic2VuZE1vZHVsZUxvY2F0aW9uIiwibW9kdWxlUGF0aCIsInBhdGgiLCJtb2R1bGVMb2NhdGlvbiIsInBhZ2VFeHRlbnNpb24iLCJzdWJzdHIiLCJsZW5ndGgiLCJzZW5kUGFnZVVSTCIsInVybCIsInBhZ2VVUkwiLCJsb2NhdGlvbiIsIm9yaWdpbiIsInRyaW1tZWRVUkwiLCJmdWxsVVJMIiwibGFzdENoYXJJbmRleCIsImxhc3RJbmRleE9mIiwiZW5kU3RyaW5nIiwic3Vic3RyaW5nIiwiaXNOYU4iLCJmdWxsUGF0aCIsInNlbmRTZXNzaW9uSUQiLCJzZXNzaW9uIiwiZ2V0U2Vzc2lvbk9iamVjdElkIiwic2VuZEFkZGl0aW9uYWxQcm9wcyIsImV4cHJlc3Npb25SZXN1bHQiLCJsaW5lIiwiaXRlbXMiLCJwcm9wVmFsdWUiLCJnZXQiLCJyZXBsYWNlIiwicHJvcE5hbWUiLCJwYXJzZSIsInRhZ01hbmFnZXJBcmdzIiwiR29vZ2xlVGFnTWFuYWdlciIsImdldFByZXZpZXdDc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxXQUFULENBQXFCQyxHQUFyQixFQUEwQkMsR0FBMUIsRUFBK0I7QUFDN0IsTUFBS0EsR0FBRyxLQUFLLEtBQUssQ0FBbEIsRUFBc0JBLEdBQUcsR0FBRyxFQUFOO0FBQ3RCLE1BQUlDLFFBQVEsR0FBR0QsR0FBRyxDQUFDQyxRQUFuQjs7QUFFQSxNQUFJLENBQUNGLEdBQUQs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
