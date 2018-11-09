var express = require('express');
var request = require('request');
var app = express();
var db = require('./db.js');

// 专门处理post请求的
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//首页
app.get('/gethomemsg', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    request('https://s1.ricebook.com/cdn/home/djEvaG9tZS9pbl9wYWdlLmpzb24/Y2l0eT0yMTYmaXNfbmV3PXRydWUmaXNfbmV3X2xvY2FsPXRydWUmaXNfbmV3X2FydGljbGVfaWNvbj1mYWxzZSZpc19uZXdfb3BlcmF0aW9uX3R5cGU9dHJ1ZSZpc19uZXdfZWRpdGlvbl9uZXd1c2VyX21vZHVsZT10cnVlJmVkaXRpb249ZnJlZSYyMDE4MTAxODE0NDI=.json', function (err, response, body) {
        if (err) {
            throw err;
        }
        //console.log(body);
        res.send(body)
    })
})

app.get('/gethotmsg', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    request('https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC92Mi9pbl90YWIuanNvbj90eXBlPTIwNCZjaXR5PTIxNiZpc19uZXdfbG9jYWw9dHJ1ZSYyMDE4MTAxOTE3NTA=.json', function (err, response, body) {
        if (err) {
            throw err;
        }
        res.send(body)
    })
})

app.get('/getmagazinemsg', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");

    if (req.query.url) {
        request(`https://api.ricebook.com/hub/home/v1/article/detail.json?id=${req.query.url}`, function (err, response, body) {
            if (err) {
                throw err;
            }
            res.send(body)
        })
    } else {
        db.query('sort', 'magazineData', {}, {
            "begin_at": -1
        }, null, function (docs) {
            var page = req.query.page * 1;
            var qty = req.query.qty * 1;
            var newDocs = docs.slice((page - 1) * qty, qty * page);
            var obj = {
                group_section: {
                    desc: "· 一点关于吃喝的人生经验 ·"
                },
                tabs: newDocs,
                total: docs.length
            }
            res.send(obj);
        });
    }

})

app.get('/getcarrecommendmsg', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    db.query('find', 'cartRecommend', {}, null, null, function (docs) {
        var newArr = docs.slice(0, 10);
        res.send(newArr);
    })
})

app.get('/detail', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var product_id = req.query.product_id * 1;
    db.query('find', 'product', {
        "basic.product_id": product_id
    }, null, null, function (current) {
        res.send(current[0]);
    })
})

app.post('/user', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var choice = req.body.choice;
    var username = req.body.username;
    var password = req.body.password;
    if (choice == 'reg') {
        db.query('write', 'userData', {
            username: username,
            password: password
        }, null, null, function (docs) {
            res.send(docs);
        });
    }
    if (choice == 'login') {
        db.query('find', 'userData', {
            username: username,
            password: password
        }, null, null, function (docs) {
            if (docs[0] == undefined) {
                res.send({
                    status: 0,
                    data: '该用户尚未注册'
                })
            } else {
                var newArr = docs.map(function (item) {
                    var user_data = {
                        status: 1,
                        name: item.username,
                        _id: item._id
                    }
                    return user_data;
                });
                res.send(newArr[0]);
            }
        });
    }
})


app.get('/search', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var searchText = req.query.searchText;
    console.log(searchText);
    db.query('find', 'product', {}, null, null, function (current) {

        var newArr = current.filter(function(item) {
            return item.basic.short_name.indexOf(searchText) != -1;
        })
        res.send(newArr);

    })
})

app.get('/shoppingcar', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");

    var username = req.query.username;
    let unique_id = req.query.productId;   
    var qty = req.query.qty * 1;
    console.log(qty);

    if (isNaN(unique_id)) {
        db.query('find', 'userData', {
            username: username
        }, null, null, function (user_data) {
            delete user_data[0].password;
            res.send(user_data[0]);
        })
    } else {
        //删除商品
        if (req.query.type=='del') {
            let unique_id = req.query.productId * 1;
            db.query('del', 'userData', {
                username: username
            }, {
                multi: true
            }, {
                $pull: {
                    user_product: {
                        unique_id: unique_id
                    }
                }
            }, function (user_data) {
                res.send(user_data);
            })
        }else if(req.query.type=='delMore'){
            console.log(unique_id_Arr);
            let unique_id_Arr = req.query.productId;
            unique_id_Arr.forEach(element => {
                db.query('del', 'userData', {
                    username: username
                }, {
                    multi: true
                }, {
                    $pull: {
                        user_product: {
                            unique_id: element*1
                        }
                    }
                }, function (user_data) {
                    res.send(user_data);
                })
            });
        }
        else {
            // 查找商品数据库中对应的商品
            let unique_id = req.query.productId*1;   

            db.query('find', 'product', {
                unique_id: unique_id
            }, null, null, function (docs) {
                var current = docs[0];
                db.query('find', 'userData', {
                    "user_product.unique_id": unique_id
                }, {
                    username: username,
                    password: 0
                }, null, function (user_res) {
                    console.log('user_res',user_res);
                    console.log('没有该商品', qty)

                    //没有该商品
                    if (user_res[0] == undefined) {
                        current.qty = 1;
                        db.query('update', 'userData', {
                            username: username
                        }, null, {
                            $addToSet: {
                                user_product: current
                            }
                        }, function (updata_result) {
                            db.query('find', 'userData', {
                                username: username
                            }, null, null, function (user_data) {
                                delete user_data[0].password;
                                res.send(user_data[0]);
                            })
                        });
                    } else {
                        console.log('update', qty)
                        db.query('update', 'userData', {
                            "user_product.unique_id": unique_id
                        }, null, {
                            $set: {
                                "user_product.$.qty": qty
                            }
                        }, function (updata_result) {
                            db.query('find', 'userData', {
                                username: username
                            }, null, null, function (user_data) {

                                delete user_data[0].password;

                                res.send(user_data);
                            })
                        });
                    }
                })
            })
        }
    }
})

app.listen(9999);