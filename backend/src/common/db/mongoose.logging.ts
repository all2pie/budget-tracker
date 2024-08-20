import { Schema } from 'mongoose';
import { Logger } from '../utils/logger/logger';

export const schemaNames = new Map<Schema, string>();

export function addLoggingToSchema(schema: Schema) {
  const modelName: string = schemaNames.get(schema);

  schema.pre('save', function (next) {
    Logger.db(`Pre-save: ${modelName}`, 'Schema Hook', {
      action: 'save',
      document: this.toObject({ getters: true }),
    });
    next();
  });

  schema.post('save', function (doc) {
    Logger.db(`Post-save: ${modelName}`, 'Schema Hook', {
      action: 'save',
      document: doc.toObject({ getters: true }),
    });
  });

  schema.pre('deleteOne', function (next) {
    Logger.db(`Pre-remove: ${modelName}`, 'Schema Hook', {
      action: 'remove',
      query: this.getQuery(),
    });
    next();
  });

  schema.post('deleteOne', function (doc) {
    Logger.db(`Post-remove: ${modelName}`, 'Schema Hook', {
      action: 'remove',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre(['findOneAndUpdate', 'updateOne'], function () {
    const query = this.getQuery();
    const update = this.getUpdate();
    Logger.db(`Pre-update: ${modelName}`, 'Schema Hook', {
      action: 'update',
      query,
      update: JSON.stringify(update),
    });
    this.setOptions({ new: true }); // Ensure the updated document is returned
  });

  schema.post(['findOneAndUpdate', 'updateOne'], function (doc) {
    Logger.db(`Post-update: ${modelName}`, 'Schema Hook', {
      action: 'update',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre('find', function () {
    Logger.db(`Pre-find: ${modelName}`, 'Schema Hook', {
      action: 'find',
      query: this.getQuery(),
    });
  });

  schema.post('find', function (docs) {
    Logger.db(`Post-find: ${modelName}`, 'Schema Hook', {
      action: 'find',
      documents: docs.map((doc: any) => doc.toObject({ getters: true })),
    });
  });

  schema.pre('findOne', function () {
    Logger.db(`Pre-findOne: ${modelName}`, 'Schema Hook', {
      action: 'findOne',
      query: this.getQuery(),
    });
  });

  schema.post('findOne', function (doc) {
    Logger.db(`Post-findOne: ${modelName}`, 'Schema Hook', {
      action: 'findOne',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre('updateMany', function () {
    Logger.db(`Pre-updateMany: ${modelName}`, 'Schema Hook', {
      action: 'updateMany',
      query: this.getQuery(),
      update: JSON.stringify(this.getUpdate()),
    });
  });

  schema.post('updateMany', function (result) {
    Logger.db(`Post-updateMany: ${modelName}`, 'Schema Hook', {
      action: 'updateMany',
      result,
    });
  });

  schema.pre('updateOne', function () {
    Logger.db(`Pre-updateOne: ${modelName}`, 'Schema Hook', {
      action: 'updateOne',
      query: this.getQuery(),
      update: JSON.stringify(this.getUpdate()),
    });
  });

  schema.post('updateOne', function (result) {
    Logger.db(`Post-updateOne: ${modelName}`, 'Schema Hook', {
      action: 'updateOne',
      result,
    });
  });

  return schema;
}
