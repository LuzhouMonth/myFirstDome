<template>
    <!-- 主页面(home页面) -->
    <div class="main-layout">
        <!-- 侧边栏 -->
        <HomeSidebar :currentUser="currentUser" :otherUsers="otherUsers"></HomeSidebar>


        <!-- 聊天信息区域 -->
        <main class="main main-visible">
            <div class="chats">
                <div class="chat-body">
                    <!-- 聊天信息头部区域 -->
                    <HomeChatHeader></HomeChatHeader>


                    <!-- 聊天内容显示区域 -->
                    <HomeChatContent :currentUser="currentUser"></HomeChatContent>


                    <!-- 聊天内容底部区域 -->
                    <HomeChatFooter :currentUser="currentUser"></HomeChatFooter>

                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import HomeSidebar from "../components/HomeSidebar";
    import HomeChatHeader from "../components/HomeChatHeader";
    import HomeChatContent from "../components/HomeChatContent";
    import HomeChatFooter from "../components/HomeChatFooter";
    export default {
        name: "Home",
        components: {HomeChatFooter, HomeChatContent, HomeChatHeader, HomeSidebar},

        //数据双向绑定
        data:function(){
            return{
                currentUser:{},//当前用户
                otherUsers:[], //其他在线用户
            }
        },


        //当登录页面跳转过来时，Vue加载并触发mounted()方法
        async mounted() {
            console.log('登录界面传过来的值:',window.sessionStorage.getItem('loginUser'));

            //解析JSON字符串为用户对象
            this.currentUser = JSON.parse(window.sessionStorage.getItem('loginUser'));

            //发起axios请求：获取在线用户列表
            const data = await this.$http.get('/getUsersOnLine');

            console.log('======================');
            console.log(data);
            //把当前登录用户在otherUsers中剔除
            this.otherUsers = data.data.filter(item => item.username!==this.currentUser.username);
            console.log('======================');
            console.log(this.otherUsers);

            //当页面刷新时，当前socket就断开连接触发disconnect事件，而后创建了一个新的socket发生了链接
            //在页面初始化mounted()方法中，需要做相关处理：
            this.$socket.emit('setUsername',this.currentUser);
        },
        sockets:{
            //其他用户新登录
            otherUserLogin(user){
                console.log('新登录用户--------------')
                console.log(user);
                this.otherUsers.push(user);
            },

            // //其他用户下线，
            userLeave(otherUsersOnline){
                this.otherUsers = otherUsersOnline.filter(item => item.username!==this.currentUser.username);
            }
        }
    }
</script>

<style scoped>

</style>