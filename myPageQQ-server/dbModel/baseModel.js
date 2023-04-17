//引入数据库
const mysql = require('mysql');

//创建数据库连接
const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'chat',
    charset:'utf8mb4'       //设置连接数据库字符集
});

//封装一个公共数据库访问方法
function query(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql,values,function (err,result) {
                if (err){
                    reject(err);//失败回调
                }else {
                    resolve(result);
                }
            }
        )
    });
}

module.exports = query;