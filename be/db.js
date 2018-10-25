const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'enjoy';

// Use connect method to connect to the server
// Redis

function query(type,tablename, params, key,updateParams,callback) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		const db = client.db(dbName);
		if(type=='find'){
			//查询
			db.collection(tablename).find(params).toArray(function(err, docs) {
				assert.equal(err, null);
				callback(docs);
				client.close();
			});
		}
		if(type=='write'){
			//写入
			db.collection(tablename).insert(
				params, function(err, result) {
			});
		}
		if(type=='update'){
			//更新
			db.collection(tablename).updateOne(params
                , { $set: updateParams }, function(err, result) {

            });  
		}
		if(type=='sort'){
			//排序
			db.collection(tablename).find(params).sort(key).toArray(function(err, docs) {
				assert.equal(err, null);
				callback(docs);
			});
		}
	});
}
console.log("开始使用mongodb");

module.exports = {
	query: query
}