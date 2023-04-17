<template>
    <div class="chat-footer">
        <form>
            <div class="form-row">
                <div class="col">
                    <div class="input-group">
                        <div class="input-group-prepend mr-sm-2 mr-1">
                            <div class="dropdown">
                                <button class="btn btn-secondary btn-icon btn-minimal btn-sm" type="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <div class="dropdown-menu">
                                    <div class="item">
                                        <label for="sendPic" style="display: inline;">
                                            <a class="dropdown-item">
                                                <svg class="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>图片</span>
                                            </a>
                                        </label>
                                        <input id="sendPic" name="sendPic" type="file" style="display: none;">
                                    </div>

                                    <div class="item">
                                        <label for="sendPic" style="display: inline;">
                                            <a class="dropdown-item">
                                                <svg class="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <span>文件</span>
                                            </a>
                                        </label>
                                        <input id="sendPic" name="sendPic" type="file" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 表情符号按钮 -->
                        <div class="input-group-prepend mr-sm-2 mr-1">
                            <button @click="emojiShow=!emojiShow" class="btn btn-secondary btn-icon btn-minimal btn-sm" type="button">
                                <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                        <!-- 添加表情面板 -->
                        <div v-if="emojiShow" class="chat-emoji">
                            <ul class="emoji-list">
                                <!-- 一个li就是一个表情符号，故要在emojiList中遍历所有表情 -->
                                <li v-for="(el,index) in emojiList" :key="index" @click="emojiSelectHandle(el)" class="emoji-item">{{el}}</li>
                            </ul>
                        </div>

                        <!-- 输入框,文本域 -->
                        <textarea v-model="text_msg" class="form-control bg-transparent border-0 no-resize hide-scrollbar"
                                  placeholder="虽然不知道说些什么, 但还是说点什么吧......" rows="1"></textarea>
                    </div>
                </div>

                <!-- 发送信息的按钮 -->
                <div class="col-auto">
                    <div @click="sendMsgHandle" class="btn btn-primary btn-icon rounded-circle text-light mb-1" role="button">
                        <svg class="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "HomeChatFooter",

        //从父组件中取传过来的值
        props:{
            currentUser:{
                type:Object
            }
        },

        //双向绑定数据
        data(){
            return{
                text_msg:'',
                emojiList: ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚',
                    '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝',
                    '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬',
                    '😰', '😱', '😳', '😵', '😡', '😠', '💘', '❤', '💓', '💔', '💕', '💖', '💗', '💙', '💚', '💛',
                    '💜', '💝', '💞', '💟', '❣', '💪', '👈', '👉', '☝', '👆', '👇', '✌', '✋', '👌', '👍', '👎', '✊', '👊',
                    '👋', '👏', '👐', '✍', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑', '🍒',
                    '🍓', '🍅', '🍆', '🌽', '🍄', '🌰', '🍞', '🍖', '🍗', '🍔', '🍟', '🍕', '🍳', '🍲', '🍱', '🍘',
                    '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🍡', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂',
                    '🍰', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '☕', '🍵', '🍶', '🍷', '🍸', '🍹', '🍺', '🍻', '🍴', '🌹', '🍀',
                    '🍎', '💰', '📱', '🌙', '🍁', '🍂', '🍃', '🌷', '💎', '🔪', '🔫', '🏀', '⚽', '⚡', '👄', '👍', '🔥',
                    '🙈', '🙉', '🙊', '🐵', '🐒', '🐶', '🐕', '🐩', '🐺', '🐱', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
                    '😿', '😾', '🐈', '🐯', '🐅', '🐆', '🐴', '🐎', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏',
                    '🐑', '🐐', '🐪', '🐫', '🐘', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐻', '🐨', '🐼', '🐾', '🐔', '🐓',
                    '🐣', '🐤', '🐥', '🐦', '🐧', '🐸', '🐊', '🐢', '🐍', '🐲', '🐉', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡',
                    '🐙', '🐚', '🐌', '🐛', '🐜', '🐝', '🐞', '🦋', '😈', '👿', '👹', '👺', '💀', '☠', '👻', '👽', '👾', '💣'],

                emojiShow:false, //控制表情面板的显示
            }
        },
        //方法
        methods:{
            //发送消息按钮事件
            sendMsgHandle(){
                //alert(this.text_msg);

                //将当前用户相关信息：包括需要发送的聊天消息  一起发往后台，
                // 后台存储数据库，
                // 告知前台刷新聊天组件页面，
                // 并广播给其他在线用户刷新聊天组件页面内容
                this.$socket.emit('addGroupMsg',{
                    username:this.currentUser.username,
                    text_msg:this.text_msg,
                    chat_head:this.currentUser.chat_head
                });

                //发送完消息，输入框清空
                this.text_msg = '';

            },
            //选择表情事件
            emojiSelectHandle(el){
                //当选择具体的表情时，应该将表情字符添加到输入框中
                this.text_msg += el;

                //选择完一个表情后将表情面板显示标记置false
                this.emojiShow = false;
            }
        }
    }
</script>

<style scoped>
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .chat-emoji {
        width: 550px;
        height: 336px;
        left: -26px;
        background: beige;
        position: absolute;
        top: -338px;
    }

    .chat-emoji::after {
        content: "";
        display: block;
        border: 10px solid transparent;
        border-bottom-color: beige;
        width: 0;
        position: absolute;
        z-index: -1;
        left: 67px;

        transform: rotate(180deg);
    }

    .emoji-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .emoji-item {
        float: left;
        padding: 2px;
        cursor: pointer;
    }
</style>