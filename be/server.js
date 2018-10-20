var express = require('express');
var request = require('request');
var app = express();

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
    request('https://s1.ricebook.com/cdn/home/djEvYXJ0aWNsZS9pbl9saXN0Lmpzb24/Y2l0eT0yMTYmdHlwZT1NQUdBWklORSZwYWdlPTAmbWQ1PTRiMmYyZWYwMDMyZmE2NTc2OGJkNDIwMjNhMDc4OWM2JjIwMTgxMDIwMTEwMA==.json,function(err,response,body',function(err,response,body){
        if(err){
            throw err;
        }
        //console.log(body);
        res.send(body)
    })
})

app.get('/getcarrecommendmsg',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    request('https://open.seriousapps.cn/cart/cart_recommend_product.json?city_id=216&device_token=54a4nwjy-ugjh-zfn0-1bqp-yzpx9954lyz8&lat=23.17624131944444&lng=113.3380867513021',function(err,response,body){
        if(err){
            throw err;
        }
        //console.log(body);
        res.send(body)
    })
})

app.listen(9999);