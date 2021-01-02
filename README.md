# React App with Global Session Timer
![Session Timer](https://www.aaronwht.com/images/content/member-session.gif)
This React app implements a sliding global session timer.  

Included is a dummy Node.js server which runs on port `3030` - this is hard-coded for simplicty.  The `server.js` file doesn't conduct authentication and is only provided so users have a working demo.

Run the app locally:    
`npm i` to install NPM packages.
`npm start` will start the React app.  

In a new terminal window run `node server.js` and the `dummy` server will start running.

### Notes:
- The variable `timerLength` in `src/utils.ts` is hard-coded to `1200` seconds - 20 minutes of inactivity automatically signs a user out.
- `SessionExpirationModal.tsx` contains configuration settings for modal display.
- `PrivatePage.tsx` calls the `extendSession` function - this extends (or slides) the user's expiration time.  Some use cases require user validation with every API request.
- The app creates two `localStorage` items; `token` and `member`.  Missing either one indicates tampering and signs the user out. 