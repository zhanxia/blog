var server=require('./server');
var router=require('./route');
var requestHandlers=require('./requestHandlers');

var handler={};
handler['/']=requestHandlers.start;
handler['/start']=requestHandlers.start;
handler['/load']=requestHandlers.load;
handler['/show']=requestHandlers.show;

server.start(router.route,handler);