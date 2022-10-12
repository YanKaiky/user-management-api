const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../../utils/jwt");
const createError = require("http-errors");

class AuthService {
  static async login(payload) {
    const { email, password } = payload;

    const user = await prisma.peoples.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw createError.NotFound("User not registered");

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword)
      throw createError.Unauthorized("Email address or password not valid");

    delete user.password;

    const token = {
      token: await jwt.signAccessToken(user)
    };

    return token;
  }
}

module.exports = AuthService;
