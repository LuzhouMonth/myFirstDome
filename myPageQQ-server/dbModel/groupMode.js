const query = require('./baseModel');

//添加群里信息
function addGroupMsg({username,text_msg,create_time,chat_head,msg_pic,file_url,file_name}) {
    const sql = 'insert into group_message(username,text_msg,create_time,chat_head,msg_pic,file_url,file_name)'+'values(?,?,?,?,?,?,?)';

    return query(sql,[username,text_msg,create_time,chat_head,msg_pic,file_url,file_name]);
}

//查询所有聊天记录
function getGroupMsgAll() {
    const sql = 'select * from group_message';
    return query(sql,[]);
}

module.exports = {
    addGroupMsg,
    getGroupMsgAll
}



