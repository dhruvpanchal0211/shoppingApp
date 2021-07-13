export const DELETE_PTODUCT = 'DELETE_PTODUCT';

export const deleteProduct = productID => {
  return {type: DELETE_PTODUCT, pid: productID};
};
