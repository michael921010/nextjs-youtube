const ramda = require("ramda");

const env = ramda.pick(["ENV", "YOUTUBE_API_KEY"])(process.env);

module.exports = {
  env,
};
