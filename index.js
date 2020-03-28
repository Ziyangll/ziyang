const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
app = express();
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
// mongoose ----
mongoose.connect("mongodb+srv://dbAdmin:dbAdmin@cluster0-tmzur.mongodb.net/todo?retryWrites=true&w=majority",
	{
		useUnifiedTopology: true, 
		useNewUrlParser: true,
		useFindAndModify: false
	}
);
const itemSchema = {
	name: String
};
const Item = mongoose.model("Item", itemSchema);
const exampleItem0 = new Item({
	name: "Welcome to your todo list"
});
const exampleItem1 = new Item({
	name: "Created using Mongodb Atlas and Nodejs"
});
defaultItems = [exampleItem0, exampleItem1]
// ----
// date ----
let today = new Date();
today = today.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"});
// ----
// server ----
app.get("/", function(req, res) {
	res.render("index");
});
app.get("/todo", function(req, res) {

	Item.find({}, function(err, foundItems) {
		if (err) {
			console.log(err);
		}
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems ,function (err) {
				if (err){
					console.log(err);
				} else {
					console.log("Example items successfuly saved to database.");
				}
			});
		}
		res.render("list", {today:today, todoListItems: foundItems});
	});
});
app.post("/todo",(req, res) => {
	if (req.body.newItem.trim().length > 0) {
	const aNewItem = new Item({
		name: req.body.newItem
	});
	aNewItem.save(function (err) {
		if (err) {
			console.log(err);
		}
	})
	}
	res.redirect("/todo");
});
app.post("/delete", (req, res) => {
	Item.findByIdAndRemove( req.body.checkbox, function(err) {
		console.log(err);
	});
	res.redirect("/todo");
});
app.get("/resume", function(req, res) {
        res.render("resume")
});
app.get("/contact", function(req, res) {
        res.render("contact")
});
app.get("/projects", function(req, res) {
	res.render("projects")
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// ----
