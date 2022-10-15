require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const CitiesService = require("./cities.service");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

class UsersService {
  static createUser = async (payload) => {
    payload.birth_date = new Date(payload.birth_date).toISOString()

    payload.password = bcrypt.hashSync(payload.password, 8);

    const city = await CitiesService.getCityByGuid(payload.city_guid);

    if (!city) throw createError.NotFound("CITY_NOT_FOUND");

    const user = await prisma.users.create({ data: payload });

    this.removePassword(user);

    return user;
  };

  static getAllUsers = async () => {
    const users = await prisma.users.findMany();

    const payload = []

    for (const user of users) {
      this.removePassword(user);

      const city = await CitiesService.getCityByGuid(user.city_guid);

      if (!city) throw createError.NotFound("CITY_NOT_FOUND");

      const data = {
        ...user,
        city: city.name,
      }

      payload.push(data)
    }

    sortName(payload);

    return payload;
  };

  static getUsersByCity = async (city_guid) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid: city_guid,
      },
    });

    if (!city) throw createError.NotFound("CITY_NOT_FOUND");

    const users = await prisma.users.findMany({
      where: {
        city_guid,
      }
    })

    for (const user of users) this.removePassword(user);

    return users;
  };

  static getUserByGuid = async (guid) => {
    const user = await prisma.users.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!user) throw createError.NotFound("USER_NOT_FOUND");

    const city = await CitiesService.getCityByGuid(user.city_guid);

    if (!city) throw createError.NotFound("CITY_NOT_FOUND");

    const data = {
      ...user,
      city: city.name,
    }

    return data;
  };

  static updateUser = async (payload, guid) => {
    const user = await prisma.users.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!user) throw createError.NotFound("USER_NOT_FOUND");

    if (payload.birth_date) payload.birth_date = new Date(payload.birth_date).toISOString()

    if (payload.city_guid) {
      const city = await CitiesService.getCityByGuid(payload.city_guid);

      if (!city) throw createError.NotFound("CITY_NOT_FOUND");
    }

    const updateUser = await prisma.users.update({
      where: {
        guid: guid,
      },
      data: payload,
    });

    this.removePassword(updateUser);

    return updateUser;
  };

  static deleteUser = async (guid) => {
    const user = await prisma.users.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!user) throw createError.NotFound("USER_NOT_FOUND");

    await prisma.users.delete({
      where: {
        guid: guid,
      },
    });
  };

  static removePassword = async (user) => delete user.password;
}

module.exports = UsersService;
