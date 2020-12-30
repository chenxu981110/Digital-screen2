//const iot = require('alibabacloud-iot-device-sdk');
const express = require('express');
var mysql = require('mysql');
const app = express();


//接入访问允许
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});



app.get('/user', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    var sql = 'SELECT * FROM user';
    // 查询
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('查询失败!');
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        const users = [];
        for (let item of result) {
            users.push({

                userName: item.userName,
                password: item.password,
                email: item.email,
                gender: item.gender,
                city: item.city

            })
        }
        res.send(JSON.stringify(users));
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
    // res.send('查询完成！');
});

app.post('/user', function (req, res) {
    /*req.on('data',function(data){
        obj=JSON.parse(data);
        console.log(obj);
        const username = obj.userName;
        const password = obj.password;
    })*/

    console.log(JSON.stringify(req.query));

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    var sql = "SELECT * FROM user WHERE username='" + req.query.name + "'";
    // 查询
    connection.query(sql, function (err, result) {
        console.log(sql);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.header.
                res.send(JSON.stringify({
                    succ: false,
                    msg: '账号或者密码不正确！'
                }));
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        if (result.length <= 0) {
            res.send(JSON.stringify({
                succ: false,
                msg: '账号或者密码不正确！'
            }));
        } else {
            for (let item of result) {
                if (item.password === req.query.password) {
                    console.log('Found it!');
                    res.send(JSON.stringify({
                        succ: true,
                        msg: 'Login success'
                    }));

                    return;
                }
            }

            res.send(JSON.stringify({
                succ: false,
                msg: '账号或者密码不正确！'
            }));
        }
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
});














//root登录
app.post('/root/:userName/:password', function (req, res) {

    const userName = req.params["userName"];
    const password = req.params["password"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM root WHERE userName='" + userName + "' and password='" + password + "'";
    // 查询
    console.log(sql);
    connection.query(sql, function (err, result) {

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.header.
                res.send(JSON.stringify({
                    succ: false,
                    msg: '账号或者密码不正确！'
                }));
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        if (result.length <= 0) {
            res.send(JSON.stringify({
                succ: false,
                msg: '账号或者密码不正确！'
            }));
        } else {
            for (let item of result) {
                if (item.password === password) {
                    console.log('Found it!');
                    res.send(JSON.stringify({
                        succ: true,
                        msg: 'Login success'
                    }));

                    return;
                }
            }

            res.send(JSON.stringify({
                succ: false,
                msg: '账号或者密码不正确！'
            }));
        }
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
});


//登录
app.post('/user/:userName/:password', function (req, res) {

    const userName = req.params["userName"];
    const password = req.params["password"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM user WHERE userName='" + userName + "' and password='" + password + "'";
    // 查询
    console.log(sql);
    connection.query(sql, function (err, result) {

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.header.
                res.send(JSON.stringify({
                    succ: false,
                    msg: '账号或者密码不正确！'
                }));
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        if (result.length <= 0) {
            res.send(JSON.stringify({
                succ: false,
                msg: '账号或者密码不正确！'
            }));
        } else {
            for (let item of result) {
                if (item.password === password) {
                    console.log('Found it!');
                    res.send(JSON.stringify({
                        succ: true,
                        msg: 'Login success'
                    }));

                    return;
                }
            }

            res.send(JSON.stringify({
                succ: false,
                msg: '账号或者密码不正确！'
            }));
        }
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
});
//注册账户
app.post('/register/:userName/:password/:email/:gender/:city', function (req, res) {

    const userName = req.params["userName"];
    const password = req.params["password"];
    const email = req.params["email"];
    const gender = req.params["gender"];
    const city = req.params["city"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "INSERT INTO user VALUES('" + userName + "','" + password + "','" + email + "','" + gender + "','" + city + "')";
    // 查询
    console.log(sql);

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '注册失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '注册成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});
//删除用户
app.post('/deluser/:userName', function (req, res) {

    const userName = req.params["userName"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "delete from user where userName='" + userName + "'";
    // 查询
    console.log(sql);

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '删除失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '删除成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});
//修改用户密码
app.post('/moduser/:userName/:password', function (req, res) {
    // 1) 获取参数路由的参数
    const userName = req.params["userName"];
    const password = req.params["password"];
    //console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE user SET password = '" + password
        + "' where userName='" + userName + "'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, _result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});
//查询用户
app.get('/user/:userName', function (req, res) {

    const userName = req.params["userName"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM user WHERE userName='" + userName + "'";
    // 查询
    console.log(sql);

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }
        console.log(_result);

        res.send(JSON.stringify(_result));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});



















app.put('/device/:id/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    let sql = 'UPDATE device SET status=' + status
        + ' WHERE id = \'' + id + '\'';
    console.log(sql);
    const queryCallback = function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const obj = {
            id: id,
            status: result[0].customer_status
        }
        res.send(JSON.stringify(obj));
    };

    const updateCallback = function (err, _result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send('修改失败!');
            return;
        }

        let sql2 = "SELECT * FROM device WHERE id='" + id + "'";
        connection.query(sql2, queryCallback);
        connection.end();
    };
    connection.query(sql, updateCallback);
});

app.get('/device', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.post('/device/:id/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET customer_status = " + status
        + " where id='" + id + "'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, _result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/device/:id', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "INSERT INTO  VALUES('" + id
        + "', 0, 0)";

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});

//添加设备
app.post('/adddevice/:deviceId/:deviceName', function (req, res) {

    const deviceId = req.params["deviceId"];
    const deviceName = req.params["deviceName"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "INSERT INTO device VALUES('" + deviceId + "','" + deviceName + "', 0, 0)";
    // 查询
    console.log(sql);

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});

//删除设备
app.post('/deldevice/:deviceId', function (req, res) {

    const deviceId = req.params["deviceId"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "delete from device where id='" + deviceId + "'";
    // 查询
    console.log(sql);

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '删除失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '删除成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});
//修改设备
app.post('/moddevice/:deviceId/:deviceName', function (req, res) {
    // 1) 获取参数路由的参数
    const deviceId = req.params["deviceId"];
    const deviceName = req.params["deviceName"];
    //console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET name = '" + deviceName
        + "' where id='" + deviceId + "'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, _result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});
//查询设备
app.get('/device/:deviceId', function (req, res) {

    const deviceId = req.params["deviceId"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device WHERE id='" + deviceId + "'";
    // 查询
    console.log(sql);

    let callback = function (err, _result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }
        console.log(_result);

        res.send(JSON.stringify(_result));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});




//灯 //创建iot.device对象将会发起到阿里云IoT的连接
const a = iot.device({
    productKey: 'a1JPK24rhDe', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'led3',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'Yd2hm3u5TEHXWk3vdYJkMsXGrpmTbgYk',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
a.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    a.subscribe('/a1JPK24rhDe/led3/get');
    console.log('connect successfully!');
    a.publish('/a1JPK24rhDe/led3/update', 'hello world!');
});
//监听message事件
a.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});


var lightState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
a.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LightStatus') { //判断是否设置的是LightSwitch属性
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            lightState = cmd.params.LightStatus;
            //连接数据库
            //Update device
            //关闭连接
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'meetingroom'
            });

            connection.connect();

            let sql = 'UPDATE device SET customer_status=' + lightState
                + ' WHERE id =  \'001\'';

            const updateCallback = function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return;
                }
            };
            connection.query(sql, updateCallback);
            connection.end();

            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            a.postProps({ 'LightStatus': lightState });
        }
    }
});

app.put('/device/:001/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    // 上报设备属性
    a.postProps({
        LightStatus: status === "0" ? 0 : 1
    }, (res) => {
        console.log(res);
    });
    //从阿里云拿到的数据下发给设备
    res.send(JSON.stringify({
        id: id,
        status: lightState
    }))
});

app.get('/device/:001', function (req, res) {
    //const id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device WHERE id='" + id + "'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            status: result[0].status,
            customer_status: result[0].customer_status
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});

app.get('/device', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.post('/device/:001/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET customer_status = " + status
        + " where id =  \'001\'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/device/:001', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "INSERT INTO device VALUES('" + id
        + "', 0, 0)";

    let callback = function (err, result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});





//风扇 //创建iot.device对象将会发起到阿里云IoT的连接
const b = iot.device({
    productKey: 'a197l8RcEcE', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'fan1',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'zbEUXtf3Q54JbfDef9DxYfoR0oAOZGyX',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
b.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    b.subscribe('/a197l8RcEcE/fan1/get');
    console.log('connect successfully!');
    b.publish('/a197l8RcEcE/fan1/update', 'hello world!');
});
//监听message事件
b.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});


var fanState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
b.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            fanState = cmd.params.PowerSwitch;
            //连接数据库
            //Update device
            //关闭连接
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'meetingroom'
            });

            connection.connect();

            let sql = 'UPDATE device SET customer_status=' + fanState
                + ' WHERE id =  \'002\'';

            const updateCallback = function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return;
                }
            };
            connection.query(sql, updateCallback);
            connection.end();

            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            b.postProps({ 'PowerSwitch': fanState });
        }
    }
});

app.put('/device/:002/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    // 上报设备属性
    b.postProps({
        PowerSwitch: status === "0" ? 0 : 1
    }, (res) => {
        console.log(res);
    });
    //从阿里云拿到的数据下发给设备
    res.send(JSON.stringify({
        id: id,
        status: fanState
    }))
});

app.get('/device/:002', function (req, res) {
    //const id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device WHERE id='" + id + "'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            status: result[0].status,
            customer_status: result[0].customer_status
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});

app.get('/device', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.post('/device/:002/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET customer_status = " + status
        + " where id =  \'002\'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/device/:002', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "INSERT INTO device VALUES('" + id
        + "', 0, 0)";

    let callback = function (err, result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});





//监控 //创建iot.device对象将会发起到阿里云IoT的连接
const c = iot.device({
    productKey: 'a1QLgHGyjqR', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'jiankong',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'LSswTjJegJsGtfLzLytGeU1aXgkkVQZz',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
c.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    b.subscribe('/a1QLgHGyjqR/jiankong/get');
    console.log('connect successfully!');
    b.publish('/a1QLgHGyjqR/jiankong/update', 'hello world!');
});
//监听message事件
c.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});


var jkState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
c.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            jkState = cmd.params.PowerSwitch;
            //连接数据库
            //Update device
            //关闭连接
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'meetingroom'
            });

            connection.connect();

            let sql = 'UPDATE device SET customer_status=' + jkState
                + ' WHERE id =  \'003\'';

            const updateCallback = function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return;
                }
            };
            connection.query(sql, updateCallback);
            connection.end();

            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            c.postProps({ 'PowerSwitch': jkState });
        }
    }
});

app.put('/device/:003/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    // 上报设备属性
    c.postProps({
        PowerSwitch: status === "0" ? 0 : 1
    }, (res) => {
        console.log(res);
    });
    //从阿里云拿到的数据下发给设备
    res.send(JSON.stringify({
        id: id,
        status: jkState
    }))
});

app.get('/device/:003', function (req, res) {
    //const id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device WHERE id='" + id + "'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            status: result[0].status,
            customer_status: result[0].customer_status
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});

app.get('/device', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.post('/device/:003/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET customer_status = " + status
        + " where id =  \'003\'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/device/:003', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "INSERT INTO device VALUES('" + id
        + "', 0, 0)";

    let callback = function (err, result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});








//电热水壶 //创建iot.device对象将会发起到阿里云IoT的连接
const d = iot.device({
    productKey: 'a1bHGttNMNf', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'shuihu',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'E28u0fZdwdi0skyD592jJPNbgvk9QVxV',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
d.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    d.subscribe('/a1bHGttNMNf/shuihu/get');
    console.log('connect successfully!');
    d.publish('/a1bHGttNMNf/shuihu/update', 'hello world!');
});
//监听message事件
d.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});


var shState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
d.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'WorkSwitch') { //判断是否设置的是LightSwitch属性
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            shState = cmd.params.WorkSwitch;
            //连接数据库
            //Update device
            //关闭连接
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'meetingroom'
            });

            connection.connect();

            let sql = 'UPDATE device SET customer_status=' + shState
                + ' WHERE id =  \'004\'';

            const updateCallback = function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return;
                }
            };
            connection.query(sql, updateCallback);
            connection.end();

            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            d.postProps({ 'WorkSwitch': shState });
        }
    }
});

app.put('/device/:004/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    // 上报设备属性
    c.postProps({
        PowerSwitch: status === "0" ? 0 : 1
    }, (res) => {
        console.log(res);
    });
    //从阿里云拿到的数据下发给设备
    res.send(JSON.stringify({
        id: id,
        status: shState
    }))
});

app.get('/device/:004', function (req, res) {
    //const id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device WHERE id='" + id + "'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            status: result[0].status,
            customer_status: result[0].customer_status
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});

app.get('/device', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.post('/device/:004/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET customer_status = " + status
        + " where id =  \'004\'";
    console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/device/:004', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "INSERT INTO device VALUES('" + id
        + "', 0, 0)";

    let callback = function (err, result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    }

    // 4) 调用SQL语句
    connection.query(sql, callback);
    connection.end();
});






















//获取温湿度数据表中的数据(温度最小值)
app.get('/env3', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from environment where temp=(select min(temp) from environment)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//获取温湿度数据表中的数据(温度最大值)
app.get('/env2', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from environment where temp=(select max(temp) from environment)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//获取温湿度数据表中的数据(湿度最小值)
app.get('/env1', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from environment where humd=(select min(humd) from environment)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//获取温湿度数据表中的数据(湿度最大值)
app.get('/env', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from environment where humd=(select max(humd) from environment)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//温湿度
app.put('/env/:id/:temp/:humd', function (req, res) {
    const id = req.params["id"];
    const temp = req.params["temp"];
    const humd = req.params["humd"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    let sql = 'INSERT INTO environment values(\'' + id + '\', ' + Date.now() + ',' + humd + ',' + temp
        + ')';
    console.log(sql);
    const updateCallback = function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send('修改失败！');
            return;
        }
        res.send({ id: id, status: 'success' });
        connection.end();
    };
    connection.query(sql, updateCallback);
});

app.get('/env/:id/:count', function (req, res) {
    const id = req.params["id"];
    const count = req.params["count"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from environment WHERE id='" + id + "' order by time desc limit " + count;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            data: result
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});





//获取可燃气体数据表中的数据(CH4最小值)
app.get('/met1', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from methane where concentration=(select min(concentration) from methane)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//获取可燃气体数据表中的数据(CH4最大值)
app.get('/met', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from methane where concentration=(select max(concentration) from methane)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//获取可燃气体数据表中的数据(H2最小值)
app.get('/met3', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from methane where qingqi=(select min(qingqi) from methane)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//获取可燃气体数据表中的数据(H2最大值)
app.get('/met2', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from methane where qingqi=(select max(qingqi) from methane)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//甲烷浓度(可燃气体浓度)
app.put('/met/:id/:concentration/:qingqi', function (req, res) {
    const id = req.params["id"];
    const concentration = req.params["concentration"];
    const qingqi = req.params["qingqi"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    let sql = 'INSERT INTO methane values(\'' + id + '\', ' + Date.now() + ',' + concentration + ',' + qingqi
        + ')';
    console.log(sql);
    const updateCallback = function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send('修改失败！');
            return;
        }
        res.send({ id: id, status: 'success' });
        connection.end();
    };
    connection.query(sql, updateCallback);
});

app.get('/met/:id/:count', function (req, res) {
    const id = req.params["id"];
    const count = req.params["count"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from methane WHERE id='" + id + "' order by time desc limit " + count;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            data: result
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});
















//(CO最大值)
app.get('/car', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where monoxide=(select max(monoxide) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//(CO最小值)
app.get('/car1', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where monoxide=(select min(monoxide) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//SO2最大值)
app.get('/car2', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where SO2=(select max(SO2) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//(SO2最小值)
app.get('/car3', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where SO2=(select min(SO2) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//N2最大值)
app.get('/car4', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where N2=(select max(N2) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//N2最小值)
app.get('/car5', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where N2=(select min(N2) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//NH4最大值)
app.get('/car6', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where NH4=(select max(NH4) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//NH4最小值)
app.get('/car7', function (_req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon where NH4=(select min(NH4) from carbon)";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//一氧化碳浓度（烟雾浓度）
app.put('/car/:id/:monoxide/:NH4/:SO2/:N2', function (req, res) {
    const id = req.params["id"];
    const monoxide = req.params["monoxide"];
    const NH4 = req.params["NH4"];
    const SO2 = req.params["SO2"];
    const N2 = req.params["N2"];


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    let sql = 'INSERT INTO carbon values(\'' + id + '\', ' + Date.now() + ',' + monoxide + ',' + NH4 + ',' + SO2 + ',' + N2 + ')';
    console.log(sql);
    const updateCallback = function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send('修改失败！');
            return;
        }
        res.send({ id: id, status: 'success' });
        connection.end();
    };
    connection.query(sql, updateCallback);
});

app.get('/car/:id/:count', function (req, res) {
    const id = req.params["id"];
    const count = req.params["count"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "select * from carbon WHERE id='" + id + "' order by time desc limit " + count;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const resp = {
            id: id,
            data: result
        };
        res.send(JSON.stringify(resp));
    });
    connection.end();
});






app.use(express.static('dist'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));










