/*************************************************************/
// change hostname to your computer's IP address if you want to use the app over the network
const hostname = '127.0.0.1'; 
const port = 8080;
/*************************************************************/

var http = require('http');
var fs = require('fs');
var url = require('url');

var datetime = new Date();
var time = datetime.getTime();

// Save start time of the app. This reference time for timestamps. 
fs.writeFile('./data/starttime.txt', String(time),{ flag: 'w+' }, err => {});

// Write start time logfile also in human readable format
fs.writeFile('./data/log.txt', 'Start time '+myDateTime(datetime)+' (app started)\n',{ flag: 'a+' }, err => {});

// start the web server
http.createServer(function (request, res) {
  
	var pathname = url.parse(request.url).pathname;
  
	// show index.html  
	if ( pathname == "/" ) {
		showPage(res);		
	} else
	
	// api interface
	if ( pathname.substring(1,4) == "api" ) {
		
		if ( pathname.substring(1,10) == "api/start" ) {
			resetTime();
		} 
		else {
			addTimeStamp(res, pathname);
		}
		
	} else
	
	if ( pathname == "/reset" ) {
		resetTime();
		res.writeHead(303, {'Location': '/'}); 
		res.end();
			
	} else
  
	// browsers are looking for favicon.ico - this is just to respond that it does not exist (it is actually in ./html/header.html as base64 encoded image).
	if (pathname=="/favicon.ico") {
		res.writeHead(204); 
		res.end();
	}
	
}).listen(port,hostname, () => {
	console.log('\nProalvo Timestamps v0.1  is running at');
	console.log('\x1b[33m%s\x1b[0m', `http://${hostname}:${port}/`);
	console.log('\nUse following URL to add timestamps from external applications');
	console.log('\x1b[33m%s\x1b[0m', `http://${hostname}:${port}/api/<optional text>`);
	console.log('\nDocumentation and latest software version is available at');
	console.log('\x1b[33m%s\x1b[0m', `https://github.com/proalvo/timestamps`);
	console.log('\nPress Ctrl+C to stop the application');
});

// show index.html
function showPage(res) {
	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'}); 

	var html = fs.readFileSync('./html/header.html', { encoding: 'utf8', flag: 'r' });
	res.write(html); 
	
	html = fs.readFileSync('./data/log.txt', { encoding: 'utf8', flag: 'r' }, (err)=> {
		if (err) {
			console.log('Error on line 76');
			console.error(err);
			return;
		}	
	}
	);
	res.write(html); 

	html = fs.readFileSync('./html/footer.html', { encoding: 'utf8', flag: 'r' });
	res.write(html); 
	
	res.end();			
	return;
}

// Set start time of the stream. This can be called by UI and API.
function resetTime() {

	datetime = new Date();
	currenttime = datetime.getTime();
	
	fs.writeFile('./data/starttime.txt', String(currenttime), (err) => {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'});
			console.log('Error at line 89');
			console.error(err);
			return;
		}
		
	});			
	
	fs.writeFile('./data/log.txt', 'Start time '+myDateTime(datetime)+'\n',{ encoding: "utf8"}, (err) => {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'});
			console.error(err);
			return;
		}
		
	});		

}

// Add a new timestamp. This is called by API.
function addTimeStamp(res, pathname) {
	
	var starttime=0;
	
	datetime = new Date();
	currenttime = datetime.getTime();
	
	fs.readFile('./data/starttime.txt', 'utf8', function(err, starttime) {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'});
			console.log('Error at line 119');
			console.error(err);
			return;
		}
		// convert epoch time to timestamp
		var milliseconds = Number(currenttime)-Number(starttime);
		
		var hours = Math.floor( milliseconds/1000/60/60 );
		
		var minutes = Math.floor( milliseconds/1000/60 ) - hours*60;
					
		if ( minutes < 10 ) {
			var minutesString = '0'+String(minutes);		
		} 
		else {
			minutesString = String(minutes);	
		}
		
		var seconds = Math.floor( milliseconds/1000 ) - minutes*60 - hours*3600;
		
		if ( seconds < 10 ) {
			var secondsString = '0'+String(seconds);		
		} 
		else {
			secondsString = String(seconds);	
		}
		
		var data;
		
		if (hours > 0 ) {
			data = String(hours)+':'+minutesString+':'+secondsString;
		}
		else 			{	
			data = minutesString+':'+secondsString;
		}
		if ( pathname.substring(1,10) != "api/start" && pathname.substring(5) != "") {
			data = data+' '+decodeURI(pathname.substring(5));	
		} 
		else {
			data = data+' Chapter';	
		}

		fs.writeFile('./data/log.txt', data +'\n',{ flag: 'a+' }, function(err) {
			if (err) {
				res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'});
				console.error(err);
				return;
			} 
		});
		
		res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
		res.write('200 OK');
		res.end();
	});		
			
	return;

}

// Provide date&time in my own format.
// This is called when app starts and by /api/start
function myDateTime(datetime) {
	var mydatetime=datetime.getFullYear()+'-';
	
	// note: getMonth return 0..11
	if (datetime.getMonth()+1 <10) {
		mydatetime+='0'+String(datetime.getMonth()+1)+'-';
	}
	else { 
		mydatetime+=String(datetime.getMonth()+1)+'-';
	}
	
	if (datetime.getDate()<10) {
		
		mydatetime+='0'+datetime.getDate()+' ';
	}
	else { 
		mydatetime+= datetime.getDate()+' ';
	}
	
	if ( datetime.getHours() < 10) {
		mydatetime+='0'+datetime.getHours()+':';
	}
	else {
		mydatetime+=datetime.getHours()+':';	
	}
	
	if ( datetime.getMinutes() < 10) {
		mydatetime+='0'+datetime.getMinutes()+':';
	}
	else {
		mydatetime+=datetime.getMinutes()+':';	
	}
	
	if ( datetime.getSeconds() < 10) {
		mydatetime+='0'+datetime.getSeconds();
	}
	else {
		mydatetime+=datetime.getSeconds();	
	}
		
	return String(mydatetime);
}
