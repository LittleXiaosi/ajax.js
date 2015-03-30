/**
 * 此文件为临时文件，尚不支持post格式请求数据，后续可能添加
 * */

(function() {
    var that;

    function AJAX(obj) {
        that = this;
        that.argu = {
            type: 'GET',
            url: window.location.origin + '/H5Event/AppQd/work/action/',
            action: "",
            data: {
                signIn: '374179084'
            },
            callback: function() {
            }
        };

        for (var i in  obj) {
            that.argu[i] = obj[i];
        }
        that.http_request = false;

        that.init();
    }

    AJAX.prototype = {

        //初始化当前请求
        init: function() {
            if (window.XMLHttpRequest) { // Mozilla, Safari,...
                that.http_request = new XMLHttpRequest();
                if (that.http_request.overrideMimeType) {
                    that.http_request.overrideMimeType('text/xml');
                }
            } else if (window.ActiveXObject) { // IE
                try {
                    that.http_request = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        that.http_request = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                    }
                }
            }

            if (!that.http_request) {
                that.console('Giving up :( Cannot create an XMLHTTP instance');
                return false;
            }
            that.http_request.onreadystatechange = that.consoleContents;
            that.http_request.open('GET', that.getUrlData(), true);
            that.http_request.send();
        },
        //拼合参数与请求地址
        getUrlData: function() {
            var url = that.argu.url;
            var data = [];
            for (var key in that.argu.data) {
                var value = that.argu.data[key];
                data.push(key + '=' + encodeURIComponent(value));
            }
            if (data.length) {
                url += that.argu.action + '?' + data.join('&');
            }
            return url;
        },
        //输出请求结果
        consoleContents: function() {
            if (that.http_request.readyState == 4) {
                if (that.http_request.status == 200) {
                    that.argu.callback.call(that, JSON.parse(that.http_request.responseText));
                } else {
                    that.console('请求不成功');
                    that.console(that.http_request.status);
                }
            }
        },
        //输出console
        console: function(str) {
            if (window.console) {
                console.log(str);
            }
        }
    }

    window.AJAX = AJAX;
})();
