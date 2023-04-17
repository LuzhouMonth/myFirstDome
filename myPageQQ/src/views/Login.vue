<template>
    <div class="main-layout card-bg-1">
        <div class="container d-flex flex-column">
            <div class="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div class="col-12 col-md-6 col-lg-5 col-xl-4">
                    <h1 class="font-weight-bold">用户登录</h1>
                    <p class="text-dark mb-3">没有注册的用户, 登录即注册</p>
                    <form class="mb-3">
                        <div class="form-group">
                            <label for="email" class="sr-only">请输入您的邮箱</label>
                            <input v-model="username" type="email" class="form-control form-control-md" id="email" placeholder="请输入您的邮箱">
                        </div>
                        <div class="form-group">
                            <label for="password" class="sr-only">请输入您的密码</label>
                            <input v-model="password" type="password" class="form-control form-control-md" id="password" placeholder="请输入您的密码">
                        </div>
                        <button @click.prevent="loginHandle" class="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold"
                                type="submit">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",

        //双向数据绑定
        data:function(){
            return {
                username:'',
                password:''
            }
        },

        //添加方法
        methods:{
            loginHandle:function () {
                //alert("登录点击.....");
                //解构
                const {username,password} = this;

                console.log(this.username,this.password);

                //为了测试前端工程，不做后台提交而写的页面跳转
                //this.$router.replace('/home');

                //向后台发起登录请求，并将参数传过去
                this.$socket.emit('userLogin',{username,password});
            }
        },
        //socket事件
        sockets:{
            //用户登录失败事件
            userLoginFailed(data){
                alert(data.err);
            },

            //用户登录成功事件
            userLoginSucess(data){
                console.log(data);

                //将数据存储在本地浏览器中
                window.sessionStorage.setItem('loginUser',JSON.stringify(data));

                //用户登录成功，调整到聊天页面
                this.$router.replace('/home');
            }
        }
    }
</script>

<style scoped>

</style>