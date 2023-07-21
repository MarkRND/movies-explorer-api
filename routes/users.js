const router = require("express").Router();

const { getInfoUser, addUser, editUser } = require("../controllers/users");
const { validationEditUser } = require("../middlwares/celebrateJoi");

router.get("/me", getInfoUser);
router.post("/", addUser);
router.patch("/me", validationEditUser, editUser);

module.exports = router;
