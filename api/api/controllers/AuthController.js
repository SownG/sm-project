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
   * @return user infomation and login token
   */
  login: async function (req, res) {
    const emailOrPhone = req.param('email_or_phone');
    const password = req.param('password');

    if (!emailOrPhone || !password) {
      return res.status(401).json({ message: 'email/phone and password required' });
    }

    const user = await User.findOne(
      {
        or: [{
          email: emailOrPhone
        }, {
          phone: emailOrPhone
        }]
      })
      .intercept(err => res.json(401, { message: 'invalid email/phone or password' }))

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
        // If user is admin, token's expiration are 5 hours
        let token = JwtService.issue(user);
        return res.json({
          user: user,
          token: token
        });
      }
    });
  },

  
  /**
   * param.body format like: 
   * {
   *  school: {
   *   name: 'Buu chinh vien thong',
   *   email: 'school@email.com',
   *   phone: '1234567890',
   *   address: 'Tran Phu, Ha Dong, Ha Noi'
   *  },
   *  password: '123@123',
   *  confirmPassword: '123@123'
   * }
   * @param  {} req
   * @param  {} res
   * @return user infomation
   */

  register: async function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, { err: 'Password doesn\'t match, What a shame!' });
    }
    let userData = {};
    if (req.body.school) {
      let schoolData = {};
      let school = await School.create(req.body.school)
        .fetch()
        .intercept(err => {
          return res.serverError(err)
        });
      // create data for school's admin 
      userData = await AuthService.createDefaultAdminUser(school);
    } else {
      userData = req.body;
    }

    // Create user record
    const user = await User.create(userData)
      .fetch()
      .intercept(err => {
        return res.serverError(err)
      });
    
    // Create user - password record
    const savePassword = await UserPassword.create({
      user: user.id,
      password: req.body.password
    }).intercept(err => {
      return res.serverError(err)
    });

    if (user) {
      return res.ok(user);
    } 
    return res.serverError({message: 'error'})
  }
};
