const name = `Nechar`;
const password = `6rrjC4wKBeUlAY6b`;
const collectionName = 'OpenSourceCollection';
const extraParams = 'retryWrites=true&w=majority';

export const mongoDBConfig = {
  key: `mongodb+srv://${name}:${password}@opensourcecluster-hv03t.mongodb.net/${collectionName}`,
};
