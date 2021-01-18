const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const firstNames = ['Aaron', 'Billy','Cam','Don','Eric','Frank','Gavin','Heather','Igor','Joanna','Kate','Lisa','Marvin','Nathanael','Oscar','Preston','Quin','Richard','Stacy','Tom','Ursula','Vicki','Will','Xin','Yari','Zach'];
const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez'];

// Hard-coded for demo purposes only - siteName and jwtSecretCode should be saved in environment variables
const siteName = 'your_site_name';
const jwtSecretCode = 'include_numbers_special_characters_here';

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

	// For demo purposes - would validate email and password against a database to retrieve firstName and lastName
	const randomFirstName = Math.floor(Math.random() * firstNames.length) + 1;
	const randomLastName = Math.floor(Math.random() * lastNames.length) + 1;

	// For Demo purposes - would pull from database
	const memberKey = Math.random();
	
	const payload = {
		memberKey,
		iss: siteName,
		exp: Math.floor(new Date().getTime() / 1000) + 1200, // 20 minutes from now
		iat: Date.now()
	}

	res.set({ token: `Bearer ${jwt.sign(payload, jwtSecretCode)}` });
  	return res.send({ error: false, memberKey, firstName: firstNames[randomFirstName], lastName: lastNames[randomLastName] })
})

app.get('/api', (req, res) => {
	if (req.headers.token === null || typeof req.headers.token === 'undefined' || req.headers.token.indexOf('Bearer ') < 0) {
		return res.send({ error: true, message: 'You are not authorized to view this content.' })
	}

	// parse token from header
	const token = req.headers.token.split(' ')[1];

	try {
		const validToken = jwt.verify(token, jwtSecretCode);
		const memberKey = validToken.memberKey;
		
		// May conduct database validation to ensure member is in good standing.

		const payload = {
			memberKey,
			iss: siteName, // Issuer
			exp: Math.floor(new Date().getTime() / 1000) + 1200, // Expiration Time - 20 minutes from now
			iat: Date.now() // Issued At
		}
	
		res.set({ token: `Bearer ${jwt.sign(payload, jwtSecretCode)}` });

		return res.send({ error: false, lastNames })
	} catch (err) {
		// token was tampered with
		return res.send({ error: true, message: 'Please sign in again.' })
	}
})

http.createServer(app).listen(3030)