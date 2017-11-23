


//     直接显示出来.
window.onload = function () {



    var mBody = new Vue({
        el: '#main-bg',
        data: {
            setClass: false
        }
    });

//登录窗口
    var loginWindow = new Vue({
        el: '#login-window',
        data: {
            text: '登录百度账号',
            loginMessage: '',
            isShow: false,
            verificationShow: false,
            passWordDelete: false,
            userNameDelete: false
        },
        methods: {
            closeLoginWindow: function () {
                loginWindow.isShow = false;
                mBody.setClass = false;
            },
            loginByPhone: function () {
                alert('loginByPhone')
            }
        }
    });

    var loginButton = new Vue({
        el: '#login-btn',
        methods: {
            showLoginWindow: function () {
                console.log('loginBtn Click');
                mBody.setClass = true;
                loginWindow.isShow = true;
            }
        }
    });

};