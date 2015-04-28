# ajax.js
自用的ajax调用文件

##使用方法

### TYPE:GET方式(默认方式，可以在ajax.js中DEFAULT参数修改)
```js
        var myAjax = new AJAX({
            action: 'signIn',
            type:'get',
            data: {
                uin: '374179084'
            },
            callback: function(responseText) {
                console.log(responseText);
            }
        });
```

### TYPE:POST方式
```js
        var ajax_postAddress = new AJAX({
             type: 'post',
             url: POST_URL,
             key: 'addrInfo',
             data: {
                 uin: getCookie('uin'),
                 name: $name.value,
                 addr: $addr.value,
                 mobile: $mobile.value
             },
             callback: function(res) {
                 console.log(res);
                 if (res.ret == 2) {
                     clearNote2();
                     $address_note2.innerHTML = '提示：地址保存成功';
                 }
             }
        });
```
