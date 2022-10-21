const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tmpUpload, filename } = req.file;
    const { _id } = req.user;

    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tmpUpload, resultUpload);

    const avatar = await Jimp.read(resultUpload);
    avatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      status: "OK",
      code: 200,
      data: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
