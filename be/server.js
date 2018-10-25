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
  
    db.query('sort','magazineData',{},{"begin_at":-1},null,function(docs){
        var page=req.query.page*1;
        var qty=req.query.qty*1;
        var newDocs=docs.slice((page-1)*qty,qty);
        console.log(page,qty);

        var obj={
            group_section:{desc: "· 一点关于吃喝的人生经验 ·"},
            tabs:newDocs
            }
            res.send(obj);
    });    
})

app.get('/getcarrecommendmsg',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    db.query('find','hotSale',{},null,null,function(docs){
        var newArr=docs.slice(0,10);
        res.send(newArr);
    })
})

app.get('/getproduct',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");

        db.query('find','detailProduct',{},null,null,function(docs){
            res.send(docs);
    }); 
})

app.get('/hotsale',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    db.query('find','detailProduct',{},null,null,function(docs){
        /*docs.forEach(function(item){
            request(`https://open.seriousapps.cn/product/info/product_detail.json?city_id=216&product_id=${item.product_id}&sub_product_id=${item.sub_product_id}`,function(err,response,body){
                    if(err){
                        throw err;
                    }
                    var current=JSON.parse(body);
                    if(current.error_code){
                    }else{
                        db.query('write','detailProduct',current);
                    }
                
            })
        })*/
        res.send(docs);       
    })
})

app.get('/detail',function(req,res){
    res.append("Access-Control-Allow-Origin", "*");
    //db.query('find','detailProduct',{},null,null,function(docs){
        //docs.forEach(function(item){
            var product_id=req.query.product_id;
            var sub_product_id=req.query.sub_product_id;
            request(`https://api.ricebook.com/product/info/product_detail.json?product_id=${product_id}&sub_product_id=${sub_product_id}`,function(err,response,body){
                    if(err){
                        throw err;
                    }
                    res.send(body);          
            })
        //})
    //})
})



app.listen(9999);