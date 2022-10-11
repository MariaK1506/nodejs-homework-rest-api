const express = require("express");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { joiSchema, joiSchemaFavorite } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(joiSchemaFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
