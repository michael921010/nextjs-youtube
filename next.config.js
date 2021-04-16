const ramda = require("ramda");

const env = ramda.pick(["ENV", "YOUTUBE_API_KEY", "YOUTUBE_CLIENT_ID"])(
  process.env
);

module.exports = {
  env,
};
