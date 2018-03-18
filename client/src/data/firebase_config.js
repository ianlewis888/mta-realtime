const developmentConfig = {
  "apiKey": process.env.REACT_APP_FIREBASE_KEY,
  "authDomain": process.env.REACT_APP_FIREBASE_DOMAIN,
  "databaseURL": process.env.REACT_APP_FIREBASE_URL,
  "projectId": process.env.REACT_APP_FIREBASE_PROJECT_ID,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
}

const productionConfig = {
  "apiKey": process.env.FIREBASE_KEY,
  "authDomain": process.env.FIREBASE_DOMAIN,
  "databaseURL": process.env.FIREBASE_URL,
  "projectId": process.env.FIREBASE_PROJECT_ID,
  "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
  "messagingSenderId": process.env.FIREBASE_MESSAGING_SENDER_ID
}

const config = (process.env.NODE_ENV === "production") ? productionConfig : developmentConfig;

export default config;
