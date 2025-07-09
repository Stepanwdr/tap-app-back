import redis from "./redis";
import { Users } from "../../models";

export const startRedisScoreSync = (io) => {

  setInterval(async () => {
    try {
      const keys = await redis.keys("score:*");

      for (const key of keys) {
        const tgUserId = key.split(":")[1];
        const score = parseInt(await redis.get(key), 10);
        if (score) {
           await redis.del(key);
           await Users.increment("score", { by: score, where: { tgUserId } });
           const user = await Users.findOne({ where: { tgUserId } });

          if(user){
            // Отправляем актуальный счёт клиенту
            io.to(tgUserId).emit("scoreUpdated", { score: user.dataValues.score });
          }
        }
      }
      console.log("Сброс счёта из Redis в БД завершён");
    } catch (error) {
      console.error("Ошибка сброса счёта из Redis:", error);
    }
  }, 5000);
};
