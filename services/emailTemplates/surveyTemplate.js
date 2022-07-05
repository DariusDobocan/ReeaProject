const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Please enter your imput!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="${keys.redirectDomain}/api/surveys/yes">Yes</a>
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="${keys.redirectDomain}/api/surveys/no">No</a>
        </div>
      </body>
    </html>
  `;
};
