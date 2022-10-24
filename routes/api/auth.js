const express = require("express");

const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
