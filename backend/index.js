const express = require('express');
// const UserRoutes = require('./routes/user.routes');
// const MovieRoutes = require('./routes/movie.routes');
// const CategoryRoutes = require('./routes/category.routes');
// const SerieRoutes = require('./routes/serie.routes');
// const SeasonRoutes = require('./routes/season.routes');
// const OpinionRoutes = require('./routes/opinion.routes');
// const PostRoutes = require('./routes/post.routes');
// const CommentRoutes = require('./routes/comment.routes');
require('dotenv').config()
// require('./config/dbConfig');
// const { requireAuth } = require('./middlewares/auth.middleware');
const cors = require('cors');
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: "ail.o2switch.net",
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false,
//     },
//     sendMail: true
// })

// transporter.verify((err, success) => {
//     if (err) {
//         return console.log(err);
//     }
//     if (success) {
//         console.log("Server is ready to take our message")
//     }
// });

// transporter.sendMail( {
//     from: "contact@foxinema.fr",
//     to: "mehdi.raposo77@gmail.com",
//     subject: "E-mail de test",
//     text: "Ceci est un email de test",
//     html: "<p>Ceci est un email de test</p>"
// }
// );
const app = express();

// Middlewares
const corsOptions = {
    origin: "*",
    credentials: true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/profil', express.static('uploads/profil'))
// app.use('/movies', express.static('uploads/movies'))
// app.use('/series', express.static('uploads/series'))

// // Routes
// app.use('/user', UserRoutes);
// app.use('/movie', MovieRoutes);
// app.use('/category', CategoryRoutes);
// app.use('/serie', SerieRoutes);
// app.use('/season', SeasonRoutes);
// app.use('/opinion', OpinionRoutes);
// app.use('/post', PostRoutes);
// app.use('/comment', CommentRoutes);

// test url 
app.get('/', function (req, res) {
    res.set('Content-type', 'text/html; charset=utf-8');
    res.send('<h1>Api already running</h1>')
})

// JWT
// app.get('/jwtid', requireAuth, (req, res) => {
//     res.status(200).send(res.locals.user);
// });

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server started : ${process.env.PORT}`)
});