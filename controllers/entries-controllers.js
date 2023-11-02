
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Entry = require("../models/entry");
const User = require("../models/user");
const HttpError = require("../models/http-error");

const createEntry = async (req, res, next) => {
  console.log(req.userData);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { type, price } = req.body;

  console.log(req.userData);
  res.status(201).json({ entry: null });

}

exports.createEntry = createEntry;
