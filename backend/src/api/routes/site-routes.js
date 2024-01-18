const express = require("express");
const {
  getAllSites,
  getSiteById,
  postSite,
  editSite,
  deleteAllSites,
  deleteSiteById,
} = require("../controllers/site-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { isAdmin } = require("../../middlewares/admin-middleware");
const { upload } = require("../../middlewares/files-middleware");

const siteRouter = express.Router();
siteRouter.get("/", getAllSites);
siteRouter.get("/:id", getSiteById);
siteRouter.post("/", upload.single("siteImg"), postSite);
siteRouter.put("/:id", upload.single("siteImg"), editSite);
siteRouter.delete("/:id", deleteSiteById);
siteRouter.delete("/", deleteAllSites);

module.exports = { siteRouter };
