import { Model } from 'mongoose';

export async function seedData<M>(
  model: Model<M>,
  data: any[],
  uniqueKey: string,
) {
  const ops = [];

  for (const doc of data) {
    ops.push({
      updateOne: {
        filter: { [uniqueKey]: doc[uniqueKey] },
        update: { $set: doc },
        upsert: true,
      },
    });
  }

  await model.bulkWrite(ops);
}
