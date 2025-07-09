const redis = require("./redis/redis");

exports.getBonusState = async (tgUserId) => {
  return await redis.hgetall(`bonusGame:${tgUserId}`);
};

exports.saveBonusState = async (tgUserId, state) => {
  await redis.hset(`bonusGame:${tgUserId}`, state);
};
