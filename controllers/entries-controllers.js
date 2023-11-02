const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Entry = require("../models/entry");
const User = require("../models/user");
const HttpError = require("../models/http-error");

const createEntry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { type, amount, price } = req.body;
console.log(req.body);
  const createdEntry = new Entry({
    type,
    amount,
    price,
    user: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Creating entry failed, please try again.",
      500
    );
    return next(error);
  }

  if(!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdEntry.save({session: sess});
    user.entries.push(createdEntry);
    await user.save({session: sess});
    await sess.commitTransaction();
  } catch(err) {
    const error = new HttpError(
      "Creating entry failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ entry: createdEntry });
};

exports.createEntry = createEntry;
