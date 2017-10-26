var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// var jadd = require('jade');
var pug = require('pug');

var app = express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
res.send("Hello World" + path.join(__dirname,'views'));
});


app.get('/render',function(req,res){
		res.render('index');
});



app.get('/about-us',function(req,res){

		res.send('This is about us page');
		//res.render('about-us');
});


app.get('/contact-us',function(req,res){
	//res.send('This is contact us page');
		res.render('contact-us');
});
app.post('/contact-us',function(req,res){

		var transport = nodemailer.createTransport({
			service:'Gmail',
			auth:{
				user:'abhishekmoore@gmail.com',
				pass:''//password
			}
		});	

		var mailOptions = {
			from:'Abhishek More<abhishekmoore@gmail.com>',
			to:'abhishekmoore@gmail.com',
			subject:'Contact us form submisssion',
			text:'User has contacted you',
			html:'<p> first name is '+ req.body.first_name + ' ' + req.body.last_name +''+'his email is'+req.body.email + ' wriitten message is  ' + '</p>'
		};
		transport.sendMail(mailOptions,function(error,info){
			if(error){
				console.log(error);
				res.redirect('/render');	
			}else{
				console.log('Message Sent'+ info.response);
				res.redirect('/render');
			}

		});
				//	res.send(req.body.first_name);
		//res.render('contact-us');
});



app.listen(80);

console.log("Connected at port 80 successfully");