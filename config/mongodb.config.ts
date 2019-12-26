export const mongoDBConfig = {
  key: getLocalKey(),
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
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
