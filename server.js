var http=require('http');
var url=require('url');

function start(route,handler){
	function onRequest(req,res){
		var pathname=url.parse(req.url).pathname;
		console.log('request '+pathname+' received');
		route(handler,pathname,res,req);
		
	}
	http.createServer(onRequest).listen(80);
	console.log('server start');
}

exports.start=start;