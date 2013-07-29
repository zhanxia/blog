function route(handler,pathname,res,req){
	console.log('route for '+pathname);
	if(typeof handler[pathname]==='function'){
		return handler[pathname](res,req);
	}else{
		console.log('request is not exist');
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write('404 not found');
		res.end();
	}
}

exports.route=route;