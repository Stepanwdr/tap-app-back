import { Users } from '../models';
import validate from '../services/validate';

class UsersController {

  // Пользователь заходит через Telegram Mini App
  static authFromTelegram = async (req, res, next) => {
    try {
      const { tgUserId, firstName, username, score } = req.body;
      validate(req.body, {
        tgUserId: 'required|integer',
        firstName: 'string',
        username: 'string',
        score: 'integer'
      }).throw();

      let user = await Users.findOne({
        where: { tgUserId },
      });
      // Если первый вход — создаём
      if (!user) {
          user = await Users.create({
          tgUserId,
          firstName,
          username,
          score
        });
      }

      const data= {
          user:user.dataValues
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  };
  static changeScore = async (req, res, next) => {
    try {
      const { tgUserId, score } = req.body;

      // Ищем пользователя
      const user = await Users.findOne({ where: { tgUserId } });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      // Обновляем score
      user.score = score;
      await user.save();

      res.json({
        status: "ok",
        user,
      });
    } catch (e) {
      next(e);
    }
  };

}
export default UsersController;
