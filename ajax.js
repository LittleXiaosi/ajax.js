/**
 * 此文件为临时文件，尚不支持post格式请求数据，后续可能添加
 * */

(function() {

    function AJAX(obj) {
        var that = this;
        that.argu = {
            type: 'GET',
            url: window.location.origin + '/H5Event/AppQd/work/action/',
            action: "",
            data: {
                //signIn: ''
            },
            callback: function() {
            }
        };

        for (var i in  obj) {
            that.argu[i] = obj[i];
        }
        that.http_request = false;

        console.log(that.argu.action + 'ajax1');
        that.init();
    }

    AJAX.prototype = {

        //初始化当前请求
        init: function() {
            var that = this;

            console.log(that.argu.action + 'ajax2');

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

            console.log(that.argu.action + 'ajax3');
            that.http_request.onreadystatechange = function() {
                that.consoleContents();
            };
            that.http_request.async = !that.argu.sync;
            if (that.argu.type.toLocaleLowerCase() == 'get') {
                that.http_request.open('GET', that.getUrlData(), true);
                that.http_request.send();
            } else if (that.argu.type.toLocaleLowerCase() == 'post') {
                that.http_request.open('POST', that.getUrl(), true);
                that.http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                console.log(that.argu.key + '=' + that.getJsonData(that.argu.data));
                that.http_request.send(that.argu.key + '=' + encodeURIComponent(that.getJsonData(that.argu.data)));
            }
        },
        //get请求拼合参数与请求地址
        getUrlData: function() {
            var that = this;

            var url = that.argu.url;
            var data = [];
            for (var key in that.argu.data) {
                if(that.argu.data[key]) {
                    var value = that.argu.data[key];
                    data.push(key + '=' + encodeURIComponent(value));
                }
            }
            if (data.length > 0) {
                url += that.argu.action + '?' + data.join('&');
            } else {
                url += that.argu.action;
            }
            return url;
        },
        //post请求获取请求地址
        getUrl: function() {
            var that = this;

            var url = that.argu.url;
            return url;
        },
        //post请求json格式转化
        getJsonData: function(data) {
            var json = JSON.stringify(data);
            return json;
        },
        //输出请求结果
        consoleContents: function() {
            var that = this;

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
