const developmentConfig = {
  "apiKey": process.env.REACT_APP_FIREBASE_KEY,
  "authDomain": process.env.REACT_APP_FIREBASE_DOMAIN,
  "databaseURL": process.env.REACT_APP_FIREBASE_URL,
  "projectId": process.env.REACT_APP_FIREBASE_PROJECT_ID,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
}

const productionConfig = {
  "apiKey": process.env.FIREBASE_CONFIG_API_KEY,
  "authDomain": process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
  "databaseURL": process.env.FIREBASE_CONFIG_DATABASE_URL,
  "projectId": process.env.FIREBASE_CONFIG_PROJECT_ID,
  "storageBucket": process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
  "messagingSenderId": process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID
}

const config = developmentConfig; /*(process.env.NODE_ENV === "production") ? productionConfig : developmentConfig;*/
console.log(config);
export default config;
