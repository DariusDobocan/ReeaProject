const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');
const keys = require('../config/keys');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.emailKey,
    pass: keys.emailPsw
  }
});


module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/yes', (req, res) =>{
    res.send('Thanks for voting!');
  });

  app.get('/api/surveys/no', (req, res) =>{
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Surveys({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ( email.trim())),
      _user: req.user.id,
      dateSent: Date.now()
    });
      const mailOptions = {
      from: keys.emailKey,
      to: survey.recipients,
      subject: survey.subject,
      html: surveyTemplate(survey)
    };

    try{
    await survey.save();

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (err){
    res.status(422).send(err);
  }
  });


};
// const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');
// const requireCredits = require('../middlewares/requireCredits');
// const Mailer = require('../services/Mailer');
// const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
//
// const Surveys = mongoose.model('surveys');
//
// module.exports = app => {
//   app.get('/api/surveys/thanks', (req, res) =>{
//     res.send('Thanks for voting!');
//   });
//
//   app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
//     const { title, subject, body, recipients } = req.body;
//
//     const survey = new Surveys({
//       title,
//       subject,
//       body,
//       recipients: recipients.split(',').map(email => ({ email: email.trim() })),
//       _user: req.user.id,
//       dateSent: Date.now()
//     });
//
//     const mailer = new Mailer(survey, surveyTemplate(survey));
//
//     try{
//     await survey.save();
//     req.user.credits -= 1;
//     const user = await req.user.save();
//     await mailer.send();
//
//     res.send(user);
//   } catch (err){
//     res.status(422).send(err);
//   }
//   });
//
//
// };
