const router = require("../routes/main")
const userHandler = require("../handlers/user.handler");


router.get("/users", userHandler.getUsers);
router.post("/users/create", userHandler.createUser);
router.get("/:roll", userHandler.getUserByroll);
