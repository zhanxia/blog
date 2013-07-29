var exec=require('child_process').exec;
var querystring=require('querystring');
var fs=require('fs');
var formidable=require('formidable');

function start(res){
	console.log('start');
	var body= 
    '<form action="/load" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="load">'+
    '<input type="submit" value="上传" />'+
    '</form>';
	exec('ls-lah',
		function(err,stdout,stderr){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(body);
		res.end();
	});
}

function load(res,req){
	console.log('load');

	var form=new formidable.IncomingForm();
	form.uploadDir='tmp';
	console.log('about to parse');
	form.parse(req,function(err,fields,files){
		if(err){
			throw err;
		}
		console.log('parse done');
		fs.renameSync(files.load.path,"./" + form.uploadDir + "/test.jpg");
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('展示上传图片:</br>');
		res.write('<img src="/show"/>');
		res.end();
	});
}

function show(res,req){
	console.log('show');
	fs.readFile('./tmp/test.jpg','binary',function(err,file){
		if(err){
			res.writeHead(500,{'Content-Type':'text/html'});
			res.write(err+'\n');
			res.end();
		}else{

			res.writeHead('200',{'Content-Type':'image/jpg'});
			res.write(file,'binary');
			res.end();
		}
	});
}

exports.start=start;
exports.load=load;
exports.show=show;