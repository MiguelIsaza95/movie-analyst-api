// Get our dependencies
var express = require('express');
var app = express();
const { Client } = require('pg')
const  connection = {
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'prueba',
  password : process.env.DB_PASS || 'password',
  database : process.env.DB_NAME || 'movie_db',
  port     : 5432
}

const client = new Client(connection)
client.connect().catch(function(){
	  console.log("connection failed");
});

function getMovies(callback) {    
        connection.query("SELECT * FROM movie_db.moviereview",
            function (err, rows) {
                callback(err, rows); 
            }
        );    
}

function getReviewers(callback) {
	connection.query("SELECT * FROM movie_db.reviewer", 
		function(err, rows){
			callback(err, rows);
		}
	);
}

function getPublications(callback) {
        connection.query("SELECT * FROM movie_db.publication",
                function(err, rows){
                        callback(err, rows);
                }
        );
}

function getPending(callback) {
		connection.query("SELECT * FROM movie_db.pending", 
				function(err, rows){
						callback(err, rows);
				}
		);
}

//Testing endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
});

// Implement the movies API endpoint
app.get('/movies', function(req, res){
	getMovies(function(err, movies){
		if (err) throw err;
		res.json(movies);
	});
});

// Implement the reviewers API endpoint
app.get('/reviewers', function(req, res){
	getReviewers(function(err, authors){
		if(err) throw err;
		res.json(authors);
	});
});

// Implement the publications API endpoint
app.get('/publications', function(req, res){
		getPublications(function(err, publications){
		if(err) throw err;
		res.json(publications);
		});
});

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
	getPending(function(err, pending){
		if(err) throw err;
		res.json(pending);
	});
});

console.log("server listening through port: "+ process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
