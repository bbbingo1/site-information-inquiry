<template>
    <div>
        <div class="login-main" :style="{height:clientHeight + 'px'}">
            <img :src="login_center_bg" class="login-background-image">
        </div>
        <el-card class="login-form-layout"
                 :style="{left: loginFormLayoutPositonLeft + 'px', top: loginFormLayoutPositonTop + 'px'}">


            <!-- 企业微信扫码登陆 begin -->

            <div class="qrcode">
                <div id="wx_qrcode" style="display: inline-block; text-align: center;margin-top: 20px"></div>
                <div v-show="!isNeedRefresh" class="">
                    <p class="sub_title">使用企业微信扫码登录</p>
                    <p class="sub_desc v-scope" v-if="showPrivacyTips">需要配合手机使用</p><!-- end vIf: showPrivacyTips -->
                </div>
            </div>

            <!-- 企业微信扫码登陆 end -->
            <div style="display: none">
                <div style="text-align: center">
                    <!-- TODO 后续替换成 LOGO 图片 -->
                    <i class="fa fa-envelope fa-5x" style="width: 56px;height: 56px;color: #304156"></i>
                </div>
                <h2 class="login-title"> 后台管理系统</h2>
                <el-form autoComplete="on"
                         :model="loginForm"
                         :rules="loginRules"
                         ref="loginForm"
                         label-position="left">
                    <el-form-item prop="username">
                        <el-input name="username"
                                  type="text"
                                  prefix-icon="fa fa-user"
                                  v-model="loginForm.username"
                                  autoComplete="on"
                                  placeholder="请输入用户名">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input name="password"
                                  type="password"
                                  prefix-icon="fa fa-key"
                                  @keyup.enter.native="handleLogin"
                                  v-model="loginForm.password"
                                  autoComplete="on"
                                  placeholder="请输入密码"
                                  show-password>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="needImageCaptcha" class="login-image-captcha-form" prop="imageCaptcha">
                        <el-input name="imageCaptcha"
                                  type="text"
                                  autoComplete="on"
                                  v-model="loginForm.imageCaptcha"
                                  style="width: 120px"
                                  placeholder="图片验证码"
                                  @keyup.enter.native="handleLogin">
                        </el-input>
                        <el-tooltip :disabled="isReloadImageCaptcha" effect="dark" content="看不清楚,换一张" placement="bottom">
                            <div class="login-image-captcha" ref="imageCaptchaDiv"
                                 @click="handleRefreshCaptcha">
                                <img :src="imageCaptchaURL"/>
                                <div class="refresh-captcha-button">
                                    <i class="fa fa-refresh" :class="{'fa-pulse': isReloadImageCaptcha}"></i>
                                </div>
                            </div>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 60px">
                        <el-button style="width: 100%" type="primary" :loading="loading"
                                   @click.native.prevent="handleLogin">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>


        <!-- TODO 待开发 -->
        <el-dialog
                title="手机短信验证"
                :visible.sync="needSMSCaptcha"
                :top="smsCaptchaDialogTop + 'px'"
                width="30%"
                center>
            <el-form>
                <label>
                    账号已绑定手机号:
                    <el-input name="phoneName"></el-input>
                </label>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="needSMSCaptcha = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


        <!-- TODO 待开发 -->
        <el-dialog
                title="邮箱验证"
                :visible.sync="needMailCaptcha"
                :top="smsCaptchaDialogTop + 'px'"
                width="30%"
                center>
            <el-form>
                <label>
                    账号已绑定邮箱:
                    <el-input name="email"></el-input>
                </label>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="needMailCaptcha = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>

    import login_center_bg from '@/assets/images/login_center_bg.png'
    import {validUsername} from '@/utils/validate';
    import {login, reloadImageCaptcha, getQRCode, checkLoginStatus} from "@/api/user";
    import QRCode from 'qrcodejs2'

    const refreshCaptcha = app => {
        app.isReloadImageCaptcha = true
        reloadImageCaptcha(app.$store.getters.sid).then(response => {
            if (response.code === 'S_OK') {
                app.imageCaptchaURL = response.data.image
            }
        }).catch(error => console.log(error))
        app.isReloadImageCaptcha = false
    }

    export default {
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (this.usernameOrPasswordError) {
                    callback(new Error(' ')) // 一定要空格
                } else if (!validUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            };
            const validatePass = (rule, value, callback) => {
                if (this.usernameOrPasswordError) {
                    callback(new Error('用户名或密码错误'))
                    this.usernameOrPasswordError = false
                } else if (value.length < 3) {
                    callback(new Error('密码不能小于3位'))
                } else {
                    callback()
                }
            };
            const validateImageCaptcha = (rule, value, callback) => {
                // 根据预留图片位置大小只能实现 4 位的验证码
                if (this.needImageCaptcha && (value.trim().length != 4 || this.imageCaptchaError)) {
                    callback(new Error('请输入正确图片验证码'))
                    if (this.imageCaptchaError) { // 重置状态
                        this.imageCaptchaError = false
                    }
                } else {
                    callback()
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: '',
                    imageCaptcha: '',
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}],
                    imageCaptcha: [{required: true, trigger: 'blur', validator: validateImageCaptcha}]
                },
                loading: false,
                login_center_bg,
                needImageCaptcha: false,
                imageCaptchaURL: '',
                imageCaptchaError: false,
                isReloadImageCaptcha: false,
                needSMSCaptcha: false,
                needMailCaptcha: false,
                usernameOrPasswordError: false,
                clientWidth: document.documentElement.clientWidth,
                clientHeight: document.documentElement.clientHeight,
                loginFormLayoutPositonLeft: (document.documentElement.clientWidth - 360) / 2,
                loginFormLayoutPositonTop: (document.documentElement.clientHeight - 404) / 2,
                smsCaptchaDialogTop: (document.documentElement.clientHeight - 400) / 2,

                // 定制企业微信登陆内容
                isNeedRefresh: false,
                showPrivacyTips: true,
                qrLink: '',
                qrcode: null,
                timer: '',
            }
        },
        mounted() {
            const that = this
            window.onresize = () => {
                return (() => {
                    that.clientWidth = document.documentElement.clientWidth
                    that.clientHeight = document.documentElement.clientHeight
                    that.loginFormLayoutPositonLeft = (document.documentElement.clientWidth - 360) / 2
                    that.loginFormLayoutPositonTop = (document.documentElement.clientHeight - 404) / 2
                    that.smsCaptchaDialogTop = (document.documentElement.clientHeight - 400) / 2
                })()
            }
            // 企业微信扫码登陆
            getQRCode().then(res => {
                that.qrLink = res.data.qrLink
                that.$store.dispatch('setSid', res.data.sid)
            }).catch(error => console.log(error))
            this.timer = setInterval(() => {
                checkLoginStatus(that.$store.getters.sid).then(res => {
                    if (res.code === 'S_OK') {
                        this.$store.dispatch('login') //切换登陆状态
                        this.$router.push('/index')
                    }
                    if (res.data.qrLink && res.data.sid) {
                        that.qrLink = res.data.qrLink
                        that.$store.dispatch('setSid', res.data.sid)
                    }
                }).catch(error => console.log(error))
            }, 2000);

        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        watch: {
            qrLink(val) {
                if (val.trim() !== '') {
                    console.log(val)
                    this.qrcode = new QRCode(document.getElementById("wx_qrcode"),  {
                        text: val,
                        width: 200,
                        height: 200,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                }
            },
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        const sid = this.$store.getters.sid
                        const username = this.loginForm.username.trim()
                        const password = this.loginForm.password.trim()
                        const imageCaptcha = this.loginForm.imageCaptcha.trim()
                        login(sid, username, password, imageCaptcha).then(response => {
                            this.$store.dispatch('setSid', sid ? sid : response.data.sid)
                            if (response.code === 'S_OK') { //登陆成功
                                this.$store.dispatch('login') //切换登陆状态
                                this.$router.push('/index')
                            } else if (response.code === 'FA_NEED_IMAGE_CAPTCHA') { //需要图片验证码
                                this.needImageCaptcha = true
                                this.imageCaptchaURL = response.data.image
                            } else if (response.code === 'FA_IMAGE_CAPTCHA_ERROR') { //图片验证码校验错误
                                this.imageCaptchaError = true
                                this.$refs.loginForm.validateField('imageCaptcha')
                            } else if (response.code === 'FA_NEED_SMS_CAPTCHA') {
                                this.needSMSCaptcha = true
                            } else if (response.code === 'FA_NEED_EMAIL_CAPTCHA') {
                                this.needMailCaptcha = true
                            } else if (response.code === 'FA_USERNAME_OR_PASSWORD_ERROR') { //用户名或密码错误
                                this.usernameOrPasswordError = true
                                this.$refs.loginForm.validateField('username')
                                this.$refs.loginForm.validateField('password')
                                refreshCaptcha(this)
                            }
                        }).catch(error => console.log(error))
                        this.loading = false
                    } else {
                        console.log('参数验证不合法！');
                        return false
                    }
                })
            },
            handleRefreshCaptcha() {
                refreshCaptcha(this)
            }
        },
    }
</script>
<style lang="scss" scoped>

    .login-main {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        width: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .login-form-layout {
        position: absolute;
        z-index: 999;
        width: 360px;
        border-top: 10px solid #304156;

        .qrcode {
            position: relative;
            text-align: center;
            .sub_title {
                text-align: center;
                font-size: 20px;
                color: #353535;
                margin-bottom: 23px;
            }
            .sub_desc {
                text-align: center;
                color: #a3a3a3;
                font-size: 15px;
                padding: 0 40px;
                line-height: 1.8;
            }
            .refresh_qrcode_mask {
                & {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 270px;
                }
                .refresh_tips {
                    color: #353535;
                }
            }
        }
        .login-image-captcha-form {
            position: relative;
            display: inline-block;
            top: -20px;
            height: 50px;
            vertical-align: middle;

            .login-image-captcha {
                position: relative;
                display: inline-block;
                top: 17px;
                left: 12px;
                width: 195px;
                height: 42px;
                cursor: pointer;

                img {
                    border-color: #DCDFE6;
                    border-style: solid;
                    border-width: 1px 0 1px 1px;
                    width: 145px;
                    height: 40px;
                }

                .refresh-captcha-button {
                    position: relative;
                    top: -12px;
                    display: inline-block;
                    border-style: solid;
                    border-color: #DCDFE6;
                    border-width: 1px 1px 1px 0;
                    border-radius: 0 5px 5px 0;
                    width: 38px;
                    height: 38px;
                    text-align: center;
                    color: #DCDFE6;

                    &:hover {
                        background-color: #E8F0FE;
                    }

                    i {
                        line-height: 40px;
                        font-size: 20px;
                    }
                }

            }
        }
    }

    .login-title {
        text-align: center;
    }

    .login-background-image {
        width: 100%;
        background: #304156;
        vertical-align: middle;
    }
</style>
