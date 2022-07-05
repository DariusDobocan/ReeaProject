const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const Surveys = mongoose.model('surveys');
const keys = require('../config/keys');




module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) =>{
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const sender ={
      email: 'dobocan.darius2002@gmail.com'
    };

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = keys.sendGridKey;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const survey = new Surveys({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });


    try{
    await survey.save();

    apiInstance.sendTransacEmail({
      sender,
      subject: survey.subject,
      to: survey.recipients,
      htmlContent: survey.body
    }).then(console.log).catch(console.log);

    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err){
    res.status(422).send(err);
  }
  });


};
