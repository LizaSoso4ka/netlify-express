const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
const ips = {
	"ips": []
};

router.get("/", (req, res) => {
  const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ips["ips"].push(remoteAddress);
	
  res.sendFile(path.join(__dirname, '/app.html'));
});

  
router.get("/ip", (req, res) => {
  res.json(ips);
});


app.use(`/`, router);

module.exports = app;
module.exports.handler = serverless(app);
