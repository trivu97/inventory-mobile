export type NavigationType = {
  navigate: () => void,
  pop: () => void,
  goBack: () => void,
};

export type UserType = {
  fullName: String,
  token: String,
  isActive: Boolean,
  _id: String,
};

export type InventoryType = {
  name: String,
  address: String,
  describe: String,
  _id: String,
};

export type EmployeeType = {
  _id: String,
  fullname: String,
  username: String,
  gender: String,
  birthday: Date,
};

export type BillType = {
  inventory: InventoryType,
  employee: EmployeeType,
  _id: String,
  totalAmount: Number,
  type: Number,
  editable: Boolean,
  createdAt: Date,
  modifiedAt: Date,
};

export type BillDetailType = {
  bill: BillType,
  product: ProductType,
  price: Number,
  quantity: Number,
  note: String,
  _id: String,
};

export type ProductType = {
  _id: String,
  name: String,
  price: Number,
  describe: String,
};

export type InventoryDetailType = {
  _id: String,
  inventory: InventoryType,
  product: ProductType,
  quantity: Number,
  expiredDate: Date,
};
