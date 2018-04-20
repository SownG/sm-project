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
  login: function (req, res) {
    const emailOrPhone = req.param('email_or_phone');
    const password = req.param('password');

    if (!username || !password) {
      return res.json(401, { err: 'Email/phone and password required' });
    }

    Users.findOne({ 
      or: {
        email: emailOrPhone,
        phone: emailOrPhone
      }
     }, function (err, user) {
      if (!user) {
        return res.json(401, { err: 'invalid email or password' });
      }

      Users.comparePassword(password, user.password, function (err, valid) {
        if (err) {
          return res.json(403, { err: 'forbidden' });
        }

        if (!valid) {
          return res.json(401, { err: 'invalid email or password' });
        } else {
          res.json({
            user: user,
            token: jwToken.issue({ id: user.id })
          });
        }
      });
    })
  },
  register: async function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, { err: 'Password doesn\'t match, What a shame!' });
    }
    let userData = {};
    if (req.body.school) {
      let schoolData = {};
      let school = await School.create(req.body.school).fetch();

      userData.school_id = school.id;
      userData.first_name = 'admin';
      userData.last_name = school.name;
      userData.address = school.address;
      userData.is_active = true;
      userData.type = 'employee';
      userData.email = school.email;
      userData.phone = school.phone;
      userData.password = req.body.password;
      userData.job = "Admin School";
      userData.dob = '0000-00-00';
      userData.role_id = 1
    } else {
      userData = req.body;
    }

    const user = await User.create(userData).fetch(); 
    if (user) {
      // NOTE: payload is { id: user.id}
      return res.ok({ user: user, token: jwToken.issue({ id: user.id }) }) ;
    } 
    return res.serverError({message: 'error'})
  }
};
