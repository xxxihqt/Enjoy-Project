var express = require('express');
var request = require('request');
var app = express();
var db = require('./db.js');

app.get('/gethomemsg',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    request('https://s1.ricebook.com/cdn/home/djEvaG9tZS9pbl9wYWdlLmpzb24/Y2l0eT0yMTYmaXNfbmV3PXRydWUmaXNfbmV3X2xvY2FsPXRydWUmaXNfbmV3X2FydGljbGVfaWNvbj1mYWxzZSZpc19uZXdfb3BlcmF0aW9uX3R5cGU9dHJ1ZSZpc19uZXdfZWRpdGlvbl9uZXd1c2VyX21vZHVsZT10cnVlJmVkaXRpb249ZnJlZSYyMDE4MTAxODE0NDI=.json',function(err,response,body){
        if(err){
            throw err;
        }
        //console.log(body);
        res.send(body)
    })
})

app.get('/gethotmsg',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    request('https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC92Mi9pbl90YWIuanNvbj90eXBlPTIwNCZjaXR5PTIxNiZpc19uZXdfbG9jYWw9dHJ1ZSYyMDE4MTAxOTE3NTA=.json',function(err,response,body){
        if(err){
            throw err;
        }
        //console.log(body);
        res.send(body)
    })
})

app.get('/getmagazinemsg',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");

    db.query('find','magazineData',{},null,function(docs){
        //console.log(docs.length);
        var obj={
        group_section:{desc: "· 一点关于吃喝的人生经验 ·"},
        tabs:docs
        }
        res.send(obj);
    })
        /*for(let i=0;i<11;i++){
            request(`https:/\/open.seriousapps.cn/hub/home/v1/article/list.json?city=216&page=${i}`,function(err,response,body){
                if(err){
                    //throw err;
               }
                db.query('write','magazineData',JSON.parse(body).tabs);
                //res.send(body)
            })
       } */    
})

app.get('/getcarrecommendmsg',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    request('https://open.seriousapps.cn/cart/cart_recommend_product.json?city_id=216&device_token=54a4nwjy-ugjh-zfn0-1bqp-yzpx9954lyz8&lat=23.17624131944444&lng=113.3380867513021',function(err,response,body){
        if(err){
            throw err;
        }
        //console.log(body);
        res.send(body);
    })
})

app.get('/getproduct',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");

        db.query('find','detailProduct',{},null,function(docs){
            res.send(docs);
    }); 
})

app.get('/hotsale',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    db.query('find','hotSale',{},null,function(docs){
        docs.forEach(function(item){
            request(`https://open.seriousapps.cn/product/info/product_detail.json?city_id=216&product_id=${item.product_id}&sub_product_id=${item.sub_product_id}`,function(err,response,body){
                    if(err){
                        throw err;
                    }
                    var current=JSON.parse(body);
                    console.log(current);
                    if(current.error_code){
                        console.log(666);
                        //console.log(current.error_code) ;
                    }else{
                        //console.log(666);
                        //db.query('write','hotSale',JSON.parse(body).result);
                        db.query('write','detailProduct',current);
                    }
                
                    //res.send(docs);
            })
       
        })
    })
})

app.listen(9999);