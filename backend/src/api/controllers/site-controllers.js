const { deleteImgCloudinary } = require("../../middlewares/files-middleware");
const Site = require("../models/asistant-model");

const getAllSites = async (req, res, next) => {
  try {
    const allSites = await Site.find();
    return res.status(200).json(allSites);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getSiteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const site = await Site.findById(id);
    return res.status(200).json(site);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const postSite = async (req, res, next) => {
  try {
    const { name, ubication } = req.body;
    const newSite = new Site({
      name,
      ubication,
      routes: [],
      siteImg: req.file ? req.file.path : "no site image",
    });

    const savedSite = await newSite.save();
    return res.status(201).json({ message: "Posted", savedSite });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const editSite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingSite = await Site.findById(id);
    if (existingSite?.siteImg && req.file) {
      deleteImgCloudinary(existingSite.siteImg);
    }

    const updatedSite = await Site.findByIdAndUpdate(
      id,
      { name, siteImg: req.file ? req.file.path : "no route image" },
      { new: true }
    );
    return res.status(200).json(updatedSite);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteSiteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const site = await Site.findByIdAndDelete(id);
    if (site?.siteImg) {
      deleteImgCloudinary(site.siteImg);
    }
    return res.status(200).json({ message: "Site deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAllSites = async (req, res, next) => {
  try {
    const sites = await Site.find();
    for (const site of sites) {
      await Site.findByIdAndDelete(site._id);
      if (site.siteImg) {
        deleteImgCloudinary(site.siteImg);
      }
    }
    return res.status(200).json({ message: "All sites deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSites,
  getSiteById,
  postSite,
  editSite,
  deleteSiteById,
  deleteAllSites,
};
