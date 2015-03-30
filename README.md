# ajax.js
自用的ajax调用文件

##使用方法
```js
 window.onload = function() {
        var myAjax = new AJAX({
            action: 'signIn',
            data: {
                uin: '374179084'
            },
            callback: function(responseText) {
                console.log(responseText);
            }
        });
    }
```
