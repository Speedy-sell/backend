const userName = `Nechar`;
const password = `Rp9HiIAAIIf45wTF`;
const collectionName = 'RootDB';
const clusterName = 'cluster0-sumzs';
const extraParams = 'retryWrites=true&w=majority';

export const mongoDBConfig = {
  key: `mongodb+srv://${userName}:${password}@${clusterName}.mongodb.net/${collectionName}?${extraParams}`,
};
