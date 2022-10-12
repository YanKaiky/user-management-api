const createError = require("http-errors");
const DashboardService = require("../services/dashboard.service");

class DashboardController {
  static getValues = async (_, response, message) => {
    try {
      const dashboard = await DashboardService.getValues();

      response.status(200).json(dashboard);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = DashboardController;
