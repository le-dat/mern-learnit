const AuthRouter = require("./auth");
const PostRouter = require("./post");

function router(app) {
  app.use("/api/auth", AuthRouter);
  app.use("/api/post", PostRouter);
}
module.exports = router;
