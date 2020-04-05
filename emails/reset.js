const keys = require('../keys');

module. exports = function(email) {
    return  {
        to: email,
        from: 'nodejs@study.com',
        subject: 'Reset password',
        text: 'Awesome sauce',
        html: `
            <h1>Your password is reset</h1>
            <p>please click below to write new password:</p>
            <hr />
            <p><a href="${keys.BASE_URL}/auth/password">Courses shop new password</a></p>
        `
    };
}