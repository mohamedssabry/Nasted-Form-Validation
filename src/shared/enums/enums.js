export const cmsItemStatusEnum = Object.freeze({
  current: 1,
  newItem: 2,
  modified: 3,
  deleted: 4,
});

export const cmsItemTypeEnum = Object.freeze({
  content: 1,
  contentAndURL: 2,
  product: 3,
  image: 4,
});

export const cmsLayoutTypeEnum = Object.freeze({
  header: 1,
  footer: 2,
  sideMenu: 3,
});

export const cmsPageTypeEnum = Object.freeze({
  home: 1,
  content: 2,
  product: 3,
});

export const feeMethodEnum = Object.freeze({
  value: 1,
  percentage: 2,
});

export const feeTypeEnum = Object.freeze({
  domainReservation: 1,
  buyTemplate: 2,
  fromShipping: 3,
});

export const mediaTypeEnum = Object.freeze({
  photo: 1,
});

export const minimumMonthlySalesEnum = Object.freeze({
  count: 1,
  value: 2,
});

export const paymentPatchStatusEnum = Object.freeze({
  newItem: 1,
  settled: 2,
  rejected: 3,
  canceled: 4,
});

export const paymentProviderStatusEnum = Object.freeze({
  newItem: 1,
  inProgress: 2,
  success: 3,
  failed: 4,
});

export const paymentTypeEnum = Object.freeze({
  online: 1,
  onReceipt: 2,
});

export const productStatusEnum = Object.freeze({
  active: 1,
  draft: 2,
});

export const requestActionStatusEnum = Object.freeze({
  initiate: 1,
  Approve: 2,
  paidToSystem: 3,
  paidToProvider: 4,
  CustomerComplaint: 5,
  AmountCollected: 6,
  Expire: 95,
  Return: 96,
  Reject: 97,
  Cancel: 98,
  Close: 99,
});

export const requestStatusEnum = Object.freeze({
  open: 1,
  close: 2,
});

export const requestTypeEnum = Object.freeze({
  initStore: 1,
  renewStore: 2,
  buyDomain: 3,
  buyCmsTemplate: 4,
  buyProduct: 5,
});

export const sortTypeEnum = Object.freeze({
  ascending: 1,
  descending: 2,
});

export const transactionStatusEnum = Object.freeze({
  insSafe: 1,
  pending: 2,
  paid: 3,
  rejected: 4,
  cancel: 5,
});

export const transactionTypeEnum = Object.freeze({
  inItem: 1,
  out: 2,
});

export const userRoleEnum = Object.freeze({
  superAdmin: 1,
  shippingCompanyAdmin: 2,
});

export const userTypeEnum = Object.freeze({
  systemUser: 1,
  admin: 2,
  user: 3,
  customer: 4,
  shippingCompany: 5,
});
