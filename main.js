var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var jade = require('jade');

var app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
	request('http://www.reddit.com', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			$ = cheerio.load(body);

			var links = $('.link').map(function(i, el) {
				return '<p><a href="' + $(this).find('a.title').attr('href') + '">' + $(this).find('a.title').text() + '</a></p>';
			}).join('');

			res.render('index', { links: links });
		}
	});
});

app.listen(3000);
