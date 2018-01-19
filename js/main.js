//     直接显示出来.
window.onload = function () {


    let mainBackGround = new Vue({
        el: '#main-bg',
        data: {
            setClass: false
        }
    });

    //登录按钮
    let loginButton = new Vue({
        el: '#login-btn',
        methods: {
            showLoginWindow: function () {
                mainBackGround.setClass = true;
                loginWindow.loginWindowIsShow = true;
            }
        }
    });


    //登录窗口
    let loginWindow = new Vue({
        el: '#login-window',
        data: {
            text: '登录百度账号',
            loginMessage: '',
            loginWindowIsShow: false,
            verificationShow: false,
            passWordDelete: false,
            userNameDelete: false,
            verificationCode: '',
            inputVerificationCode: '',
            userInfo: {
                userName: '',
                passWord: ''
            }
        },
        methods: {
            closeLoginWindow: function () {
                this.loginWindowIsShow = false;
                mainBackGround.setClass = false;
            },
            loginByPhone: function () {
                alert('loginByPhone')
            },
            onDeleteClick: function (event) {
                const clickId = event.target.id;
                if (clickId === 'usernameDelete') {
                    this.userInfo.userName = '';
                } else if (clickId === 'passwordDelete') {
                    this.userInfo.passWord = '';
                }
            },
            //失去焦点事件
            onBlur: function () {
                //尤其要注意this的指向问题,这里的this指的是loginWindow对象,
                if (this.userInfo.userName.length > 0 && this.userInfo.userName !== '') {
                    setTimeout(function () {
                        //this在这 则是指的延时器对象
                        if (loginWindow.userInfo.userName.length > 0 && loginWindow.userInfo.userName !== '') {
                            loginWindow.verificationShow = true;
                        }
                    }, 1000);
                }
            },
            // 图片验证码
            createCode() {
                let code = "";
                const codeLength = 4;//验证码的长度
                const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];//随机数
                for (let i = 0; i < codeLength; i++) {
                    //循环操作
                    let index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
                    code += random[index] + " ";//根据索引取得随机数加到code上
                }
                this.verificationCode = code;//把code值赋给验证码
            },
            checkedVerificationCode() {
                //清除空格
                let code = this.verificationCode.replace(/\s+/g, "");
                //将用户输入的验证码转换为大写.
                if (this.inputVerificationCode.toUpperCase() === code) {
                    alert('验证通过')
                    //todo 提交userinfo到服务器验证
                } else {
                    this.loginMessage = '验证码错误';
                    this.inputVerificationCode = '';
                    loginWindow.createCode()
                }
            },
            checkUserDataAndCode() {
                if (this.userInfo.userName.length === 0 || this.userInfo.userName === '') {
                    this.loginMessage = '请您输入请输入手机/邮箱/用户名';
                } else if (this.userInfo.passWord.length === 0 || this.userInfo.passWord === '') {
                    this.loginMessage = '请您输入密码';
                } else if (this.inputVerificationCode.length === 0 || this.inputVerificationCode === '') {
                    this.loginMessage = '请您输入验证码';
                } else {
                    loginWindow.checkedVerificationCode()
                }
            }
        },
        watch: {
            //监听数据变化,以更新UI.
            'userInfo.userName': function (val, oldval) {
                console.log('isChange');
                this.userNameDelete = val.length > 0 && val !== '';
            },
            'userInfo.passWord': function (val, oldval) {
                this.passWordDelete = val.length > 0 && val !== '';
            },
            verificationShow: function () {
                if (this.verificationShow) {
                    loginWindow.createCode();
                }
            }
        }
    });
};