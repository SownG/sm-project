/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    return res.ok("ok")
  },
  /**
   * req.body = {
   *  email_or_phone: 'email@gamil.com',
   *  password: '123456
   * }
   * @param  {} req
   * @param  {} res
   * @return login token
   */
  login: async function (req, res) {
    const emailOrPhone = req.param('email_or_phone');
    const password = req.param('password');

    ValidationService.loginRequest(req, res);
    const user = await User.findOne(
      {
        or: [{
          email: emailOrPhone
        }, {
          phone: emailOrPhone
        }]
      })
      .intercept(err => res.json(401, { message: 'invalid email/phone or password' }))
    if (user) {
      const recentPassword = await UserPassword
        .find({ user: user.id })
        .sort('created_at DESC')
        .limit(1)
        .intercept(err => res.serverError(err));

      UserPassword.comparePassword(password, recentPassword[0].password, function (err, valid) {
        if (err) {
          return res.status(403).json({ message: 'forbidden' });
        }
        if (!valid) {
          return res.status(401).json({ message: 'invalid email/phone or password' });
        } else {
          let token = JwtService.issue(user);
          return res.json({
            token: token
          });
        }
      })
    } else {
      return res.json(401, { message: 'invalid email/phone or password' })
    }
  },
};
