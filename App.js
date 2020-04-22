// ########################################################################
// ########################## SERVER APLICATIE ############################
// ########################################################################

// PACHETE NECESARE
const express = require("express"); // express pentru rutare
const multer = require("multer"); // middleware pentru stocare fisier
const bodyParser = require("body-parser"); // curata req.body
const path = require("path"); // parsare cale fisier

// SETUP APP
const app = express();
const port = process.env.PORT || 3000; // configurare port

app.use(bodyParser.urlencoded({ extended: false })); // gestionare cereri HTML
app.use(bodyParser.json()); // in cazul in care sunt cereri sub forma de JSON
app.use("/", express.static(__dirname + "/public")); // incarcare fisiere html aflate in body

// configurare mod de stocare a fisierelor uploadare
var storage = multer.diskStorage({
  // destinatia fisierelor uploadate
  destination: function(req, file, cb) {
    cb(null, "./public/storage");
  },
  // redenumire fisier uploadat pentru a putea fi gestionat de parsere
  filename: function(req, file, cb) {
    cb(null, "clinica" + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

// incarcare pagina principala
app.get("/", function(req, res) {
  res.render("index");
});

// incarcare pagina de parsare XML la cererea de upload venita de la formularul din HTML
app.post("/uploadXml", upload.single("xml_file"), function(req, res) {
  res.redirect("parseXml.html");
});

// incarcare pagina de parsare JSON la cererea de upload venita de la formularul din HTML
app.post("/uploadJson", upload.single("json_file"), function(req, res) {
  res.redirect("parseJson.html");
});

// incarcare pagina de afisare XML cu foi de stil la cererea de upload venita de la formularul din HTML
app.post("/showXsl", upload.single("xsl_file"), function(req, res) {
  res.redirect("showXsl.html");
});

//pornire server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
