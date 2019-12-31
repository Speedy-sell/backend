export const mongoDBConfig = {
  key: getLocalKey(),
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  /**
   * Why are we using these `options`?
   * Because if we didn't, the console keeps
   * complaining that we didn't use these options.
   * However, these options are optional
   */
  collectionName: {
    user: 'User',
    item: 'Item',
  },
};

function getRemoteKey() {
  const userName = `Nechar`;
  const password = `Rp9HiIAAIIf45wTF`;
  const collectionName = 'RootDB';
  const clusterName = 'cluster0-sumzs';
  const extraParams = 'retryWrites=true&w=majority';
  return `mongodb+srv://${userName}:${password}@${clusterName}.mongodb.net/${collectionName}?${extraParams}`;
}

function getLocalKey() {
  const collectionName = 'RootDB';
  return `mongodb://localhost:27017/${collectionName}`;
}
