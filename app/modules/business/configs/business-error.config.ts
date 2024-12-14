export const businessContactError =  {
  businessPhone: {
    // required  : 'Business Name is required',
    minLength : 'Phone Number must be minimum 10 character long',
    maxLength : 'Phone Number should not be more than 14 characters long',
    pattern   : 'Phone Number is invalid'
  },
  businessMobile: {
    // required  : 'Mobile number is required',
    minLength : 'Mobile Number must be minimum 10 character long',
    maxLength : 'Mobile Number should not be more than 14 characters long',
    pattern   : 'Mobile Number is invalid'
  },
  businessEmail: {
    // required  : 'GST number is required',
    minLength : 'Email must be minimum 4 character long',
    maxLength : 'Email should not be more than 100 characters long',
    email     : "Email is invalid",
    pattern   : 'Email is invalid'
  }
}

export const businessAddMemberError =  {
  businessRole: {
    required  : 'Please select business role',
  },
  name: {
    required  : 'Name is required',
    minLength : 'Name must be minimum 4 characters long',
    // maxLength : 'Name should not be more than 100 characters long',
    // pattern   : 'Name is invalid'
  },
  mobile: {
    required  : 'Phone number is required',
    minLength : 'Phone must be minimum 10 character long',
    maxLength : 'Phone should not be more than 13 characters long',
    pattern   : 'Phone is invalid'
  },
  email: {
    required  : 'Email is required',
    minLength : 'Email must be minimum 4 character long',
    maxLength : 'Email should not be more than 100 characters long',
    email     : "Email is invalid",
    pattern   : 'Email is invalid'
  }
}