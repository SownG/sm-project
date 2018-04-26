module.exports = {
  registerRequest: function (req, res) {
    if (req.body.password.length < 6) {
      return res.status(401).json({ message: 'Your password must be at least 6 characters!' });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({ message: 'Password doesn\'t match, What a shame!' });
    }
  },
  loginRequest: function (req, res) {
    if (req.body.password.length < 6) {
      return res.status(401).json({ message: 'Your password must be at least 6 characters!' });
    }
    if (!req.param('email_or_phone') || !req.param('password')) {
      return res.status(401).json({ message: 'Email/phone and password required' });
    }
  }
}
