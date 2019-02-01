const ADMINS = {
    'lirang': 123456
};

exports.authenticate = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (ADMINS[username] && String(ADMINS[username]) === String(password)) {
        res.json({
            authorized: true
        });
    } else {
        res.json({
            authorized: false
        });
    }
};