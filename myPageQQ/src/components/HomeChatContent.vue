<template>
    <div class="chat-content p-2">
        <div class="container">
            <!-- 聊天信息列表 -->
            <div class="message-day">
                <!-- 聊天信息项  -->
                <div :class="{self:msg.username===currentUser.username,other:msg.username!==currentUser.username}" class="message" v-for="(msg,index) in groupMsgAll" :key="index">
                    <div class="message-wrapper">
                        <div class="message-content">
                            <!-- h6 class="text-dark" v-text="msg.username"></h6 -->
                            <span v-text="msg.text_msg"></span>
                        </div>
                    </div>
                    <!-- 信息操作选项 -->
                    <div class="message-options">
                        <div class="avatar avatar-sm"><img alt="" :src="'./../assets/media/avatar/'+msg.chat_head+'.png'"></div>
                        <span class="message-date">上午 9:12</span>
                        <div class="dropdown">
                            <a class="text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg class="hw-18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </a>


                        </div>
                    </div>
                </div>


            </div>
        </div>

        <!-- Scroll to finish -->
        <div class="chat-finished" id="chat-finished"></div>
    </div>
</template>

<script>
    export default {
        name: "HomeChatContent",

        //数据双向绑定
        data(){
            return{
                groupMsgAll:[]
            }
        },

        //从父组件中取传过来的值
        props:{
            currentUser:{
            type:Object
            }
        },

        //响应后台socket方法
        sockets:{
            addGroupMsgSuccess(groupMsgAll){
                this.groupMsgAll = groupMsgAll;
                console.log('------------------------------88888---')
                console.log(groupMsgAll);
            }
        }
    }
</script>

<style scoped>
    .other{
        text-align: left;
    }
</style>