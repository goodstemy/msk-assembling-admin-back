export const buildMongoURI = (username: String, password: String, dbName: String): string => {
  return `mongodb+srv://${username}:${password}@cluster0.dtwqt.mongodb.net/${dbName}?retryWrites=true&w=majority`;
};
