const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'enjoy';

// Use connect method to connect to the server
// Redis

function query(type,tablename, params, updateParams,callback) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		const db = client.db(dbName);
		if(type=='find'){
			//查
			db.collection(tablename).find(params).toArray(function(err, docs) {
				assert.equal(err, null);
				console.log("Found the following records");
				callback(docs);
				client.close();
			});
		}
		if(type=='write'){
			//console.log(params);
			//查
			db.collection(tablename).insert(
				params, function(err, result) {
			});
		}
		if(type=='update'){
			db.collection(tablename).updateOne(params
                , { $set: updateParams }, function(err, result) {
                console.log(result);
            });  
		}

		//关闭数据库
	});
}
console.log("开始使用mongodb");

module.exports = {
	query: query
}