# React App with Global Session Timer
![Session Timer](https://www.aaronwht.com/images/content/member-session.gif)  
This React app implements a sliding global session timer.  

[YouTube Video](https://www.youtube.com/watch?v=EAilUy2ZprM). 

Included is a `server.js` Node.js file which runs on port `3030` and is hard-coded for simplicty.  The `server.js` file is provided to demonstrate a fully functional app out of the box.  

Run the app locally:    
`npm i` to install NPM packages.
`npm start` will start the React app.  

In a new terminal window run `node server.js` and the `dummy` server will start running.

Tampering with the `token` results in an invalidation as displayed below: 
![Session Timer](https://aaronwht.s3-us-west-2.amazonaws.com/images/content/jwt-tampered.gif)  

### Notes:
- The variable `timerLength` in `src/utils.ts` is hard-coded to `1200` seconds - 20 minutes of inactivity automatically signs a user out.
- `SessionExpirationModal.tsx` contains configuration settings for modal display.
- `ProtectedPage.tsx` calls the `extendSession` function - this extends (or slides) the user's expiration time.  Some use cases require user validation with every API request.
- The app creates two `localStorage` items; `token` and `member`.  Missing either one indicates tampering and signs the user out.
