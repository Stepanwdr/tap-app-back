const bonusController = require("../controllers/bonusController");

const bonusSocket = (socket) => {
  socket.on("getBonusState", async ({ tgUserId }) => {
    const state = await bonusController.getBonusState(tgUserId);
    socket.emit("bonusState", state);
  });

  socket.on("saveBonusState", async ({ tgUserId, state }) => {
    await bonusController.saveBonusState(tgUserId, state);
    socket.emit("bonusSaved");
  });
};

export default bonusSocket