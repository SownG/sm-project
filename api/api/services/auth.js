export async function formatDataRegister(params) {
  let userData = {};
  if (params.school) {
    let school = await School.create(params.school);

    userData.school_id = school.id;
    userData.first_name = 'admin';
    userData.last_name = school.name;
    userData.address = school.address;
    userData.is_active = true;
    userData.type = 'employee';
    userData.email = school.email;
    userData.phone = school.phone;
    userData.password = params.password;
    userData.job = "Admin School";
  } else {
    userData = params;
  }
  return userData;
}
