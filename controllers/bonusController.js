const bonusService = require("../services/bonusService");

exports.getBonusState = async (tgUserId) => {
  return await bonusService.getBonusState(tgUserId);
};

exports.saveBonusState = async (tgUserId, state) => {
  await bonusService.saveBonusState(tgUserId, state);
};
