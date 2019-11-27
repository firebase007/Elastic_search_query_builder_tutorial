const express    = require("express");
const controller = require("./controller");
const routes     = express.Router();

routes.route("/search-all").get(controller.search);
routes.route("/search-by-year").get(controller.filterCarsByYearMade);
routes.route("/search-by-name").get(controller.filterCarsByName);
routes.route("/search-by-name-single").get(controller.filterCarByName);
routes.route("/search-by-multiple").get(controller.fetchMatchMultipleQuery);
routes.route("/seach-avg-query").get(controller.aggregateQuery);

module.exports = routes;
