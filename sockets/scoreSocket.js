import redis from "../services/redis/redis";

const scoreSocket = (socket) => {
  socket.on("incrementScore", async ({ tgUserId }) => {
    if (!tgUserId) {
      return socket.emit("errorMessage", "Отсутствует идентификатор пользователя");
    }
    try {
      // Инкремент счёта в Redis
      const newScore = await redis.incr(`score:${tgUserId}`);
      // Отправляем обновлённый счёт клиенту
    } catch (error) {
      console.error("Ошибка инкремента:", error);
      socket.emit("errorMessage", "Что-то пошло не так при обновлении счёта");
    }
  });
};

export default scoreSocket;
