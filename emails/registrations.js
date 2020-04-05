const keys = require('../keys');

module. exports = function(email) {
    return  {
        to: email,
        from: 'nodejs@study.com',
        subject: 'Create Account',
        text: 'Awesome sauce',
        html: `
            <h1>Your Account is create</h1>
            <p>please click below to login account:</p>
            <hr />
            <p><a href="${keys.BASE_URL}">Courses shop</a></p>
        `
    };
}