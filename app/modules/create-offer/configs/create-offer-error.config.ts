export const itemOfferError =  {
  name: {
    required: 'Name is required',
    minLength: 'Name must be minimum 10 characters long',
    maxLength: 'Name should not be more than 300 characters long',
    pattern: 'Only alphanumeric name is allowed'
  },
  description: {
    required: 'Description is required',
    minLength: 'Description must be minimum 10 characters long',
    maxLength: 'Description should not be more than 9000 characters long'
  },
  unitOfferValuation: {
    required: 'Offer value is required',
    pattern: 'Invalid input',
    minLength: 'Please enter valid value',
    maxLength: 'Offer value exceeded 10 chars',
    max: 'Maximum value exceeded'
  },
  quantity: {
    required: 'Quantity is required',
    pattern: 'Please enter valid quantity',
    min: 'Minimum quantity is 1',
    max: 'Maximum value exceeded',
    minLength: 'Please enter minimum 1 quantity',
    maxLength: 'Maximum quantity supported is 9999999',
  },
  location: {
    required: 'Location is required',
  },
  categoryId: {
    required: 'Category is required',
  },
  itemCondition: {
    required: 'Item Condition is required',
  },
  originCountry: {
    required: 'Origin Country is required',
  },
  exchangeMode: {
    required: 'Please set exchange mode'
  },
  unit: {
    required: 'Quantity unit is required',
  },
  price: {
    required: 'Price is required',
    pattern: 'Please enter valid price',
    minLength: 'Invalid minimum price',
    maxLength: 'Maximum price supported is 9999999999',
    min: 'Price cannot be 0',
  },
  auctionInfo: {
    basePrice: {
      required: 'Price is required',
      pattern: 'Please enter valid price',
      minLength: 'Invalid minimum price',
      maxLength: 'Maximum price supported is 9999999999',
      min: 'Base price cannot be 0',
    },
    buyOutPrice: {
      required: 'Price is required',
      pattern: 'Please enter valid price',
      minLength: 'Invalid minimum price',
      maxLength: 'Maximum price supported is 9999999999',
      min: 'Buyout price cannot be 0',
    },
    stepPrice: {
      required: 'Price is required',
      pattern: 'Please enter valid price',
      minLength: 'Invalid minimum price',
      maxLength: 'Maximum price supported is 9999999999',
      min: 'Step price cannot be 0',
    },
    endDate: {
      required: 'End date is required',
    }
  },
  productType: {
    required: 'Product type is required',
  },
  startDate: {
    required: 'Start date is required',
  },
  endDate: {
    required: 'End date is required',
  },
  taxClass: {
    required: 'Tax class is required',
    minLength: 'Invalid tax class',
    maxLength: 'Tax class can be maximum 15 chars long',
  },
  sku: {
    required: 'SKU  is required',
    minLength: 'Invalid SKU',
    maxLength: 'SKU can be maximum 15 chars long',
  },
  moq: {
    required: 'MOQ  is required',
    minLength: 'Invalid MOQ',
    maxLength: 'MOQ can be maximum 15 digit long',
  },
  hsnCode: {
    required: 'HSN Code is required',
    minLength: 'Invalid HSN Code',
    maxLength: 'HSN Code can be maximum 8 numbers',
    min: 'HSN Code can be minimum 4 numbers',
    max: 'Invalid HSN can be maximum 8 numbers',
    pattern: 'HSN Code can be 4/6/8 numbers'
  },
  dimensions: {
    length: {
      required: 'Length is required',
      pattern: 'Please enter valid length',
      minLength: 'Invalid minimum length',
      maxLength: 'Maximum length exceeded',
      min: 'Length cannot be 0',
    },
    breadth: {
      required: 'Width is required',
      pattern: 'Please enter valid width',
      minLength: 'Invalid minimum width',
      maxLength: 'Maximum width exceeded',
      min: 'width cannot be 0',
    },
    height: {
      required: 'Height is required',
      pattern: 'Please enter valid height',
      minLength: 'Invalid minimum height',
      maxLength: 'Maximum Height exceeded',
      min: 'Height cannot be 0',
    },
    weight: {
      required: 'Weight is required',
      pattern: 'Please enter valid Weight',
      minLength: 'Invalid minimum Weight',
      maxLength: 'Maximum weight is 90kg',
      min: 'Weight cannot be 0',
      max: 'Maximum weight is 90kg',
    },
  }
};

export const serviceOfferError =  {
  description: {
    required: 'Description is required',
    minLength: 'Description must be minimum 10 characters long',
    maxlength: 'Description should not be more than 9000 characters long'
  },
  price: {
    required: 'Price is required',
    pattern: 'Please enter valid price',
    minLength: 'Invalid minimum price',
    maxlength: 'Maximum price supported is 9999999999',
  },
  rate: {
    required: 'Please enter rate per hours.',
    pattern: 'Please enter valid rate',
    minLength: 'Please enter valid rate per hours.',
    maxLength: 'Maximum price supported is 9999999',
  },
  duration: {
    required: 'Please enter duration',
  },      
  location: {
    required: 'Location is required',
  },
  taxClass: {
    required: 'Tax class is required',
    minLength: 'Invalid tax class',
    maxLength: 'Tax class can be maximum 15 chars long',
  },
  hsnCode: {
    required: 'SAC Code is required',
    minLength: 'Invalid SAC Code',
    maxLength: 'SAC Code can be maximum 8 numbers',
    min: 'SAC Code can be minimum 4 numbers',
    max: 'Invalid SAC can be maximum 8 numbers',
    pattern: 'SAC Code can be 4/6/8 numbers'
  },
};

export const auctionInfoError = {
  basePrice: {
    required: 'Base Price is required',
  },
  buyOutPrice: {
    required: 'Buy Out Price is required',
  },
  endDate: {
    required: 'End Date is required',
  },
  stepPrice: {
    required: 'Step Price is required',
  },
  description: {
    required: 'Desire Description is required',
  },
  amount: {
    required: 'Desire Amount is required',
  }
};

export const wantReturnOffer = {
  description: {
    required: 'Description is required',
    minLength: 'Description must be minimum 100 characters long',
    maxLength: 'Description should not be more than 9000 characters long'
  }
};

export const mockErrorOnFields = {
  unitOfferValuation: true,
  location: true,
  categoryId: true,
  itemCondition: true,
};
