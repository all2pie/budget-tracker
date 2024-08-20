import { Schema } from 'mongoose';
import { Logger } from '../utils/logger/logger';

export const schemaNames = new Map<Schema, string>();

export function addLoggingToSchema(schema: Schema) {
  const modelName: string = schemaNames.get(schema);

  schema.pre('save', function (next) {
    Logger.db(`${modelName}`, 'Pre-save', {
      action: 'save',
      document: this.toObject({ getters: true }),
    });
    next();
  });

  schema.post('save', function (doc) {
    Logger.db(`${modelName}`, 'Post-save', {
      action: 'save',
      document: doc.toObject({ getters: true }),
    });
  });

  schema.pre('deleteOne', function (next) {
    Logger.db(`${modelName}`, 'Pre-remove', {
      action: 'remove',
      query: this.getQuery(),
    });
    next();
  });

  schema.post('deleteOne', function (doc) {
    Logger.db(`${modelName}`, 'Post-remove', {
      action: 'remove',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre('deleteMany', function (next) {
    Logger.db(`${modelName}`, 'Pre-deleteMany', {
      action: 'deleteMany',
      query: this.getQuery(),
    });
    next();
  });

  schema.post('deleteMany', function (result) {
    Logger.db(`${modelName}`, 'Post-deleteMany', {
      action: 'deleteMany',
      result,
    });
  });

  schema.pre('findOneAndDelete', function () {
    Logger.db(`${modelName}`, 'Pre-findOneAndDelete', {
      action: 'findOneAndDelete',
      query: this.getQuery(),
    });
  });

  schema.post('findOneAndDelete', function (doc) {
    Logger.db(`${modelName}`, 'Post-findOneAndDelete', {
      action: 'findOneAndDelete',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre(['findOneAndUpdate', 'updateOne'], function () {
    const query = this.getQuery();
    const update = this.getUpdate();
    Logger.db(`${modelName}`, 'Pre-update', {
      action: 'update',
      query,
      update: JSON.stringify(update, null, 2),
    });
  });

  schema.post(['findOneAndUpdate', 'updateOne'], function (doc) {
    Logger.db(`${modelName}`, 'Post-update', {
      action: 'update',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre('find', function () {
    const queryOptions = this.getOptions();
    Logger.db(`${modelName}`, 'Pre-find', {
      action: 'find',
      query: this.getQuery(),
      options: {
        skip: queryOptions.skip,
        limit: queryOptions.limit,
        select: queryOptions.select,
      },
    });
  });

  schema.post('find', function (docs) {
    Logger.db(`${modelName}`, 'Post-find', {
      action: 'find',
      documents: docs.map((doc: any) => doc.toObject({ getters: true })),
    });
  });

  schema.pre('findOne', function () {
    Logger.db(`${modelName}`, 'Pre-findOne', {
      action: 'findOne',
      query: this.getQuery(),
    });
  });

  schema.post('findOne', function (doc) {
    Logger.db(`${modelName}`, 'Post-findOne', {
      action: 'findOne',
      document: doc ? doc.toObject({ getters: true }) : null,
    });
  });

  schema.pre('updateMany', function () {
    Logger.db(`${modelName}`, 'Pre-updateMany', {
      action: 'updateMany',
      query: this.getQuery(),
      update: JSON.stringify(this.getUpdate(), null, 2),
    });
  });

  schema.post('updateMany', function (result) {
    Logger.db(`${modelName}`, 'Post-updateMany', {
      action: 'updateMany',
      result,
    });
  });

  schema.pre('updateOne', function () {
    Logger.db(`${modelName}`, 'Pre-updateOne', {
      action: 'updateOne',
      query: this.getQuery(),
      update: JSON.stringify(this.getUpdate(), null, 2),
    });
  });

  schema.post('updateOne', function (result) {
    Logger.db(`${modelName}`, 'Post-updateOne', {
      action: 'updateOne',
      result,
    });
  });

  return schema;
}
