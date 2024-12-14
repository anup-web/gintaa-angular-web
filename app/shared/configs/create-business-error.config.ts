export const createBusinessError =  {
  businessNameLegal: {
    required  : 'Business Name is required',
    minLength : 'Business Name must be minimum 3 character long',
    maxLength : 'Business Name should not be more than 255 characters long',
    pattern   : 'Business name is invalid'
  },
  businessPANNumber: {
    required  : 'PAN number is required',
    minLength : 'PAN number must be minimum 10 character long',
    pattern   : 'PAN number is invalid'
  },
  businessGSTNumber: {
    required  : 'GST number is required',
    minLength : 'GST number must be minimum 15 character long',
    pattern   : 'GST number is invalid'
  },
  businessCINNumber: {
    // required  : 'CIN number is required',
    minLength : 'CIN number must be minimum 21 character long',
    maxLength : 'CIN number should not be more than 21 characters long',
    pattern   : 'CIN number is invalid'
  }
}