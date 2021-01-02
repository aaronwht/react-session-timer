const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const firstNames = ['Aaron', 'Billy','Cam','Don','Eric','Frank','Gavin','Heather','Igor','Joanna','Kate','Lisa','Marvin','Nathanael','Oscar','Preston','Quin','Richard','Stacy','Tom','Ursula','Vicki','Will','Xin','Yari','Zach'];
const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez'];

// Must EXPLICITLY expose token header
app.use(cors({ exposedHeaders: ['*', 'token'] }));
app.options('*', cors())
app.use(bodyParser.json())
app.post('/', (req, res) => {
	if (req.body.email === null || typeof req.body.email === 'undefined') {
		return res.send({ error: true, message: 'Please enter an Email'})
	}

	if (req.body.password === null || typeof req.body.password === 'undefined') {
		return res.send({ error: true, message: 'Please enter a Password'})
	}

	const randomFirstName = Math.floor(Math.random() * firstNames.length) + 1;
	const randomLastName = Math.floor(Math.random() * lastNames.length) + 1;

	res.set({ token: `Bearer ${Math.random()}` });
  	return res.send({ error: false, memberKey: Math.random(), firstName: firstNames[randomFirstName], lastName: lastNames[randomLastName] })
})

app.get('/api', (req, res) => {
	res.set({ token: `Bearer ${Math.random()}` });
  	return res.send({ error: false, lastNames })
})


http.createServer(app).listen(3030)