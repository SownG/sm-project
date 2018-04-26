module.exports = {
  createDefaultAdminUser: async function (school: any ) {
    const adminRoleId = await sails.models.role.findOne({ name: 'Admin' })
    return {
      school: school.id,
      first_name: 'Admin',
      last_name: school.name,
      address: school.address,
      is_active: true,
      type: 'employee',
      email: school.email,
      phone: school.phone,
      dob: '0000-00-00',
      role: adminRoleId.id
    }
  }
}
