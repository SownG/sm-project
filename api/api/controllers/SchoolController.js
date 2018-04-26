/**
 * SchoolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
  * req.body format like: 
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

  create: async function (req, res) {
    ValidationService.registerRequest(req, res);
    
    const school = await School.create(req.body.school)
      .fetch()
      .intercept(err => {
        return res.serverError(err)
      });
      // create data for school's admin 
    const userData = await AuthService.createDefaultAdminUser(school);
   

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
    return res.serverError({ message: 'error' })
  }
};
