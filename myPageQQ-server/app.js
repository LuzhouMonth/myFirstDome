//引入express
const express = require('express');

//引入userMode
const userModel = require('./dbModel/userModel');

//引入groupModel
const groupModel = require('./dbModel/groupMode');

//创建一个服务器对象
const app = express();


//引入http核心模块
const http = require('http');

//由于socket.io不支持express创建的服务器对象，故需通过app创建原生服务对象
const server = http.createServer(app);

//引入socket.io
const socketIo = require('socket.io');

//创建io，并将http服务对象作为参数
const io =  socketIo(server);

//利用Cors解决不同源请求问题
app.use((req, res, next) => {
    console.log('利用Cors解决不同源请求问题..............');
    // Access-Control-Allow-Origin: 告诉浏览器, 允许跨域的请求源(CORS跨域中这个是一定要设置的), *表示所有
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Access-Control-Request-Method: 用于非简单请求的预检请求中, 告诉浏览器, 允许跨域的请求类型(get, post, head这三个类型默认是允许的)
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    // res.setHeader('Access-Control-Allow-Methods', '*');
    // Access-Control-Allow-Headers: 用于非简单请求的预检请求中, 告诉浏览器, 允许跨域的请求头信息
    res.setHeader('Access-Control-Allow-Headers', "content-type, sec-ch-ua, sec-ch-ua-mobile, Sec-Fetch-Site, Sec-Fetch-Mode, Sec-Fetch-Dest, Referer, Accept-Encoding, Accept-Language, If-None-Match, If-Modified-Since");
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});

//监听事件,使用绑定了socket的服务器对象监听，替换原来的express服务器对象
server.listen(3000,'127.0.0.1',function (err) {
    if (!err){
        console.log('服务器已启动:127.0.0.1:3000');
    }
})

//监听connection事件，当前台发起socket请求时，则会触发执行
io.on('connection',function (socket) {
    console.log('当前有用户发起连接.........');

    //监听一个自定义userLogin方法，用户登录事件
    socket.on('userLogin',async function (data) {
        console.log(data);

        //解构前台传过来的数据
        const {username,password} = data;

        //给当前登录用户的socket绑定一个username属性
        socket.username = username;

        console.log('当前登录用户为：')
        console.log(socket.username);

        //通过前台传过来的用户名取数据库中的对应用户信息
        let user = await userModel.queryByUsername({username});
        console.log(user[0]);

        // 如果用户存在, 但密码不正确, 则阻止登入, 并提示
        if (user[0] && user[0].password !== password){
            socket.emit('userLoginFailed',{err:'用户密码不正确!请重新登录'});
            return socket.username = null;
        }

        //如果用户不存在，则作为新用户注册
        if (!user[0]){
            //头像：随机
            const chat_head = Math.ceil(Math.random()*8);
            const create_time = Date.now();

            //把当前不存用户数据插入用户表，完成注册即登录
            const result = await userModel.addUser({username,password,create_time,chat_head,online_state:1});

            user[0] = {username,password,create_time,chat_head,online_state:1};

        }else {//用户名和密码都匹配，需要修改用户的登录状态
            const result = await userModel.updateUserState({online_state:1,username:user[0].username});
        }

        //通知前台，触发登录成功事件
        socket.emit('userLoginSucess',user[0]);

        //要将当前登录的所有用户广播给其他在线用户，供其他在线用户刷新用户列表
        socket.broadcast.emit('otherUserLogin',user[0]);
    })
    
    //监听用户断开事件:当前用户断开，改变当前用户在数据库中的登录状态为0，再查询数据库中所有在线用户，广播给其他还在线的用户
    socket.on('disconnect',async function () {
        console.log('当前下线的用户是:');
        console.log(socket.username);

        //改变当前用户在数据库中的登录状态为0
        await userModel.updateUserState({online_state:0,username:socket.username});

        //当前用户登录成功，查询数据库中所有在线用户
        const otherUsersOnline = await userModel.queryUsersOnline();

        console.log(otherUsersOnline);

        //广播给其他用户
        socket.broadcast.emit('userLeave',otherUsersOnline);
    })

    //当页面刷新时，当前socket就断开连接触发disconnect事件，而后创建了一个新的socket发生了链接
    //在页面初始化mounted()方法中，需要做相关处理：
    socket.on('setUsername',async function (user) {
        socket.username = user.username;

        console.log('当前刷新下线后的用户');
        console.log(socket.username);

        //刷新时，先下线，那么设置登录状态为1
        await userModel.updateUserState({online_state:1,username:socket.username});

        //此时，读取数据库中在线用户列表
        const otherUsersOnline = await userModel.queryUsersOnline();

        //广播给其他用户(刷新时，你先下线，广播给其他在线用户)
        socket.broadcast.emit('userLeave',otherUsersOnline);
    })

    //处理群聊消息，插入数据库
    socket.on('addGroupMsg',async function (data) {
        console.log(data);
        //消息生成时间
        data.create_time = Date.now();

        //将当前用户相关信息：包括需要发送的聊天消息  一起发往后台，
        // 后台存储数据库，
        await groupModel.addGroupMsg(data);

        //新增群里消息后，群聊消息总数发送变化，需要读取最新的群聊消息，准备发往前台展示
        const groupMsgAll = await groupModel.getGroupMsgAll();

        //console.log('---------------------999');
        //console.log(groupMsgAll);

        // 告知前台刷新聊天组件页面，
        socket.emit('addGroupMsgSuccess',groupMsgAll);

        // 并广播给其他在线用户刷新聊天组件页面内容
        socket.broadcast.emit('addGroupMsgSuccess',groupMsgAll);
    })

})

//提供外部访问接口
app.get('/getUsers',async function (req,res) {
    console.log('进入getUsers....');

    const data = await userModel.queryAllUsers();

    res.send(data);

    //返回数据给前台
    //res.send('返回给前台的数据');

})

//提供外部访问接口：请求当前在线用户列表
app.get('/getUsersOnLine',async function (req,res) {
    console.log('进入在线用户请求....');
    const data = await userModel.queryUsersOnline();

    res.send(data);
})