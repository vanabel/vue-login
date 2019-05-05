const express = require('express')

// creating an express instance
const app = express()
const publicRoot = 'dist'
app.use(express.static(publicRoot))

const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy
// Store the user data in cookie-session
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'Incorrect username or password' });
      }
    }
  )
)
// initialize
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'vuelogin',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize())
app.use(passport.session())
// Fake database
let users = [
  {
    id: 1,
    name: 'Jude',
    email: 'jude@email.com',
    password: 'jude'
  },
  {
    id: 2,
    name: 'Emma',
    email: 'emma@email.com',
    password: 'emma'
  }
]
//set up URLs for login/logout/user
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(next(err));
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ status: user, text: "Cannot login", info});
    }
    req.login(user, err => {
      res.send("Logged in");
    });
  })(req, res, next);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  console.log("Logged out");
  return res.send();
});

// The middleware filter
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("You are not authenticated");
  } else {
    return next();
  }
}
app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  });
  console.log([user, req.session]);
  res.send({ user: user });
});

// handle the user object: store the user id
passport.serializeUser((user, done) => {
  done(null, user.id);
})
// handle the user object from requrest: retrieve the user object from database
passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })
  done(null, user)
})
//start the serve
app.listen(3000, () => {
  console.log('NodeJs server listening on port 3000');
})
app.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot });
})
