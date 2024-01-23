require("dotenv").config();

if (!process.env.APP_MODE) {
  console.error("APP_MODE is not defined in the environment variables");
  process.exit(1);
}

const logBaseUrl = (req, res, next) => {
  let baseURL;

  if (process.env.APP_MODE === "development") {
    baseURL = process.env.BASE_URL;
  } else {
    baseURL = `${req.protocol}://${req.hostname}`;
  }

  console.log(`Base URL: ${baseURL}`);
  next();
};

module.exports = logBaseUrl;
