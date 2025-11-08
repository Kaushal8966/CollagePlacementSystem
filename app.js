const express = require('express');
const app = express();
const web = require('./routes/web');
const connectDb = require('./database/dbcon');
const flash = require('connect-flash'); // for flash messages
const session = require('express-session'); // for alerts
const cookieParser = require('cookie-parser'); // for cookies
const setUserInfo = require('./middleware/setUserInfo');
require('dotenv').config();

// ✅ 1. Use dynamic port for Render (fallback for local testing)
const PORT = process.env.PORT || 4000;

// ✅ 2. Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ 3. Session setup
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

// ✅ 4. Flash messages
app.use(flash());

// ✅ 5. Custom middleware (user info)
app.use(setUserInfo);

// ✅ 6. Connect to database
connectDb();

// ✅ 7. Set EJS as view engine
app.set('view engine', 'ejs');

// ✅ 8. Serve static files (CSS, JS, images)
app.use(express.static('public'));

// ✅ 9. Routes
app.use('/', web);

// ✅ 10. Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
