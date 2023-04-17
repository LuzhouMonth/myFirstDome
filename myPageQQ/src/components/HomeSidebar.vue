<template>
    <aside class="sidebar">
        <div class="tab-content">
            <div class="tab-pane active" id="chats-content">
                <div class="d-flex flex-column h-100">
                    <div class="hide-scrollbar h-100" id="chatContactsList">
                        <!-- 侧边栏头部区域 -->
                        <div class="sidebar-header sticky-top p-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <!-- 当前登录的用户 -->
                                <h5 class="font-weight-semibold mb-0">
                                    <li class="contacts-item friends active">
                                        <a class="contacts-link" style="display: flex; color: black">
                                            <div class="avatar avatar-online" style="margin: 0 6px;">
                                                <img :src="'./../assets/media/avatar/'+currentUser.chat_head+'.png'" alt="">
                                            </div>
                                            <div class="contacts-content">
                                                <div class="contacts-info">
                                                    <h6 class="chat-name" v-text="currentUser.username"></h6>
                                                </div>
                                                <div class="contacts-texts">
                                                    <p class="text-truncate introduce" style="max-width: 246px">个性签名：这个人很懒,
                                                        麻都没有留下麻都没有留下麻都没有留下麻都没有留下</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </h5>
                                <ul class="nav flex-nowrap">
                                    <!-- 通知铃按钮 -->
                                    <li class="nav-item list-inline-item mr-1">
                                        <a class="nav-link text-muted px-1" href="#" title="Notifications" role="button"
                                           data-toggle="modal" data-target="#notificationModal">
                                            <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </a>
                                    </li>
                                    <!-- 选项按钮 -->
                                    <li class="nav-item list-inline-item mr-0">
                                        <div class="dropdown">
                                            <a class="nav-link text-muted px-1" href="#" role="button" title="Details"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- 侧边栏用户列表 -->
                        <ul class="contacts-list" id="chatContactTab" data-chat-list="">
                            <li class="contacts-item friends" v-for="(user,index) in otherUsers" :key="index">
                                <a class="contacts-link">
                                    <div class="avatar avatar-online">
                                        <img :src="'./../assets/media/avatar/'+user.chat_head+'.png'" alt="">
                                    </div>
                                    <div class="contacts-content">
                                        <div class="contacts-info">
                                            <h6 class="chat-name text-truncate">{{user.username}}</h6>
                                            <div class="chat-time">刚刚</div>
                                        </div>
                                        <div class="contacts-texts">
                                            <p class="text-truncate">对不起，我没听清。你能重复一遍吗?</p>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li class="contacts-item groups active">
                                <a class="contacts-link">
                                    <div class="avatar bg-success text-light">
                                        <span>
                                            <svg class="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="contacts-content">
                                        <div class="contacts-info">
                                            <h6 class="chat-name">群名（群聊名）</h6>
                                            <div class="chat-time"><span>上午</span></div>
                                        </div>
                                        <div class="contacts-texts">
                                            <p class="text-truncate">
                                                <span>用户名1: </span>
                                                这是很常见的。我听说很多人都有同样的经历。
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <!--
                            <li class="contacts-item unread">
                                <a class="contacts-link">
                                    <div class="avatar avatar-online">
                                        <img src="./../assets/media/avatar/4.png" alt="">
                                    </div>
                                    <div class="contacts-content">
                                        <div class="contacts-info">
                                            <h6 class="chat-name">用户名2</h6>
                                            <div class="chat-time">
                                                <span>31/05/20</span>
                                            </div>
                                        </div>
                                        <div class="contacts-texts">
                                            <p class="text-truncate">我正在努力学习数学、物理和化学。我计划在十二岁以后在it界出道。</p>
                                            <div class="badge badge-rounded badge-primary ml-1">10</div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        name: "HomeSidebar",

        //props获取从父组件传递过来的值
        props:{
            currentUser:{
                type:Object
            },
            otherUsers:{
                type: Array
            }
        },

        //当登录页面跳转过来时，Vue加载并触发mounted()方法
        mounted(){
            console.log('-----------------------------');
            console.log(this.currentUser);
            console.log('-------#############------------');
            console.log(this.otherUsers);
        }
    }
</script>

<style scoped>

</style>