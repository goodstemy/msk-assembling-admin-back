import {buildMongoURI} from "../tools";
import mongoose from "mongoose";

export interface MongoConfiguration {
  isDebug: Boolean,
  reconnectTimeout: Number,
}

let reconnectAttempts = 0;

export const connect = (cfg: MongoConfiguration) => {
  const MONGO_URI = buildMongoURI(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD, process.env.MONGO_DB_NAME);

  mongoose.set('debug', cfg.isDebug);
  mongoose
    .connect(MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(() => {
      console.log('Db init success');
    })
    .catch(err => {
      reconnectAttempts++;

      console.error(`Error on init db: ${err}`);
      console.log(`Reconnection attempt in ${+cfg.reconnectTimeout / 1000} seconds...`);

      setTimeout(() => {
        console.log(`Reconnect attempt #${reconnectAttempts}`);

        reconnect(cfg);
      }, +cfg.reconnectTimeout);
    });
};

const reconnect = (cfg: MongoConfiguration) => connect(cfg);
