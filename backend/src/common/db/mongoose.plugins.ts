export function newDocumentOnUpdate(schema) {
  schema.pre(
    ['update', 'findOneAndUpdate', 'updateOne', 'updateMany'],
    function (next) {
      this.setOptions({ new: true, runValidators: true });
      next();
    },
  );
}

export function addIdField(schema) {
  schema.virtual('id').get(function () {
    return this._id.toHexString();
  });

  schema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
    },
  });
  schema.set('toObject', {
    getters: true,
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
    },
  });
}
