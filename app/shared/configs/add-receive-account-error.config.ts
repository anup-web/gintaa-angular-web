export const addReceiveAccountError =  {
  paymentType: {
    required  : 'Payment type is required'
  },
  name: {
    required  : 'Bank name is required',
    minLength : 'Bank name must be minimum 4 characters long',
    maxLength : 'Bank name should not be more than 120 characters long',
  },
  accountNumber: {
    required  : 'Account number is required',
    minLength : 'Account number must be minimum 9 characters long',
    maxLength : 'Account number should not be more than 18 characters long',
    
  },
  ifsc: {
    required  : 'IFSC code is required',    
    minLength : 'IFSC code must be minimum 11 characters long',
    pattern   : 'IFSC code is invalid'
  },
  branch: {
    required  : 'Branch name is required',
    minLength : 'Branch name must be minimum 4 characters long',
  },
  upiId: {
    required  : 'UPI-Id is required'
  },
  number: {
    required  : 'Paytm number is required',
    minLength : 'Paytm number must be minimum 4 character long',
    maxLength : 'Paytm number should not be more than 20 characters long',
    pattern   : 'Paytm number is invalid'
  },
  nickName: {
    required  : 'Name is required',
    minLength : 'Name must be minimum 4 character long',
    pattern   : 'Invalid input'
  }

}