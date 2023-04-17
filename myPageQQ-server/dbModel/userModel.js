//引入数据库
const query = require('./baseModel');

//添加新用户
function addUser({username,password,create_time,chat_head,online_state}) {
    const sql = 'insert into user_a(username,password,create_time,chat_head,online_state)'+'values(?,?,?,?,?)';
    return query(sql,[username,password,create_time,chat_head,online_state]);
}


//根据用户名查询用户信息
function queryByUsername({username}) {
    const sql = 'select * from user_a where username = ?';
    return query(sql,[username]);
}

//查找所有用户信息
function queryAllUsers() {
    const sql = 'select * from user_a';
    return query(sql,[]);
}

//查询当前在线用户信息
function initAllUsersOnline() {
    const sql = 'select * from user_a where online_state = 1';
    return query(sql,[]);
}

// 修改用户的在线状态
function updateUserState ({ online_state, username }) {
    const sql = 'update user_a set online_state = ? where username = ?';
    return query(sql, [online_state, username]);
}

//查询当前在线用户列表
function queryUsersOnline(){
    const sql = 'select * from user_a where online_state = ?';
    return query(sql,[1]);
}

//暴露外部接口
module.exports = {
    queryByUsername,
    queryAllUsers,
    initAllUsersOnline,
    updateUserState,
    addUser,
    queryUsersOnline
}