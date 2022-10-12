require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dbInitialSetup = require("./dbInitialSetup");
const { User } = require("./models/index");

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.use(
  session({
    secret: "algunTextoSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (username, password, done) {
    // 1. Encontrar al usuario que se esta tratando de autenticar
    console.log({ username, password });
    // let user;
    // try {
    const user = await User.findOne({ where: { email: username } });

    // } catch (error) {
    //   // 2. Hubo algun error al hacerlo? Retornemos ese error
    //   return done(error);
    // }
    // 3. Pudiste encontrar un usuario? Si no pudiste, retornemos esa info
    if (!user) {
      return done(null, false, { message: "Credenciales incorrectas" });
    }
    // 4. Pudiste validar su contrasena? Si no pudiste, retornemos esa info
    if (password !== "1234") {
      return done(null, false, { message: "Credenciales incorrectas" });
    }
    // 5. Este usuario es quien dice ser. Vamos a autenticar su acceso
    return done(null, user);
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user); //req.user
    })
    .catch(() => {
      done(error, user);
    });
});

dbInitialSetup(); // Crea tablas e inserta datos de prueba.
routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
