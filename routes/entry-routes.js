const express = require("express");

const entriesController = require("../controllers/entries-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.post('/', entriesController.createEntry),
module.exports = router;
