(function () {
    'use strict';

    angular.module('baseApp').service('querystring', function () {

        this.getParam = function (key) {
            /**
            * @ngdoc method
            * @name baseApp.querystring #getParam
            * @methodOf baseApp.querystring
            * @description Gets a querystring value based on the key passed in
            * @param {string} key querystring parameter key, of a key/value pair. Required
            * @returns {string} querystring value of key (eg. 1-11NAVKX)
            * @example URL: https://www.lta.org.uk/competitions/playerprofile/?pid=1-11NAVKX <br/> <code>querystring.getParam(pid)</code>
            */
            var val = {};
            var regex = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (e, param, value) {
                val[param] = decodeURIComponent(value);
            });

            return val[key] ? val[key] : null;
        };

        this.setParam = function (key, value) {
            /**
            * @ngdoc method
            * @name baseApp.querystring #setParam
            * @methodOf baseApp.querystring
            * @description Sets (or resets) a querystring key/value pair, <i>appending after the '/#/!/?' to prevent page refresh</i>
            * @param {string} key querystring parameter key, of a key/value pair. Required
            * @param {string} value new querystring parameter value, of a key/value pair. Required
            * @returns {string} full URL. eg. http://www.lta.org.uk/coach-teach/courses/#!/?<b>results=22</b>
            * @example <code>querystring.setParam('results', '22')</code> will return the example above
            */
            var url = window.location.href;
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = url.indexOf('?') !== -1 ? "&" : "?";
            var prefix = url.indexOf('!/') !== -1 ? "" : "!/";
            var decodedValue = decodeURIComponent(value);

            if (url.match(re)) {
                if (url.indexOf(value) === -1) {
                    window.location.hash = window.location.hash.replace(re, '$1' + key + "=" + decodedValue + '$2');
                }
            }
            else {
                window.location.hash = prefix + window.location.hash + separator + key + "=" + decodedValue;
            }
            return window.location.href;
        };

        this.addParam = function (key, value) {
            /**
            * @ngdoc method
            * @name baseApp.querystring #addParam
            * @methodOf baseApp.querystring
            * @description ADDS to a value to a key in the querystring (separated by a '/' ), <i>appending after the '/#/!/?' to prevent page refresh</i>
            *              If the key does not exist, it will add it to the URL.
            * @param {string} key querystring parameter key, of a key/value pair. Required
            * @param {string} value additional querystring parameter value, of a key/value pair. Required
            * @returns {string} full URL. eg. http://www.lta.org.uk/coach-teach/courses/#!/?<b>provider=1/2</b>
            * @example The following code will return the example above <br/> <code>querystring.addParam('provider', '1');<br/> querystring.addParam('provider', '2');</code>
            */
            var url = window.location.hash;
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = url.indexOf('?') !== -1 ? "&" : "?";
            var prefix = url.indexOf('!/') !== -1 ? "" : "!/";
            var decodedValue = decodeURIComponent(value);

            if (url.match(re)) {
                var currentValue = this.getParam(key),
                    currentValueArray = currentValue.split('/');

                if (currentValueArray.indexOf(value) === -1)
                    window.location.hash = window.location.hash.replace(re, '$1' + key + "=" + decodedValue + '/' + currentValue + '$2');
            }
            else {
                window.location.hash = prefix + window.location.hash + separator + key + "=" + decodedValue;
            }
            return window.location.href;
        };

        this.removeParam = function (key, value) {
            /**
            * @ngdoc method
            * @name baseApp.querystring #removeParam
            * @methodOf baseApp.querystring
            * @description Removes a value from a key, a key/value pair or a entire querystring
            * @param {string} key querystring parameter key, of a key/value pair. Will remove key/value pair if value not defined
            * @param {string} value removes querystring parameter value, of a key/value pair
            * @returns {object} <code>undefined</code>
            */
            var url = window.location.href;
            var paramVal = this.getParam(key);

            // Always remove entire key=value pair from querystring
            if (paramVal) {
                var rtn = url.split("?")[0],
                    param,
                    paramsArr = [],
                    queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";

                if (queryString !== "") {
                    paramsArr = queryString.split("&");
                    for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
                        param = paramsArr[i].split("=")[0];
                        if (param === key) {
                            paramsArr.splice(i, 1);
                        }
                    }
                    rtn = rtn + "?" + paramsArr.join("&");
                }

                window.location.hash = rtn.split('#')[1];

                // Add remaining parameters
                if (value && paramVal.indexOf('/') !== -1) {
                    var pValues = paramVal.split('/'),
                        pvIndex = pValues.indexOf(value.toString());

                    if (pvIndex !== -1) pValues.splice(pvIndex, 1);

                    for (var j = 0; j < pValues.length; j++) {
                        this.addParam(key, pValues[j]);
                    }
                }
            }
            if (!key) {
                window.location.hash = '#';
            }
        };

    });

}());
/**
    * @ngdoc service 
    * @name baseApp.querystring 
    *
    * @description
    * The <code>querystring</code> service contains 4 methods that get or manipulate the querystring keys or values.
**/