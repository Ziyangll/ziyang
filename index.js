const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")

app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const homeContent = "jmnbhjknbhjknmbhjklnmbhjklmn,wedsfwd."
let posts = [];

app.get("/", function(req, res) {
	res.render("index")
});

app.get("/blog", function(req, res) {
	res.render("blog", 
		{
			startingContent: homeContent,
			posts: posts
		}
	)
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

app.get("/compose-ziyang", function(req, res) {
	res.render("compose")
});

app.post("/compose-ziyang", function(req, res) {
	const post = {
		title:req.body.newBlogTitle,
		content:req.body.newBlogBody
	};
	posts.push(post)

	res.redirect("/blog")
});


app.get("/posts/:title", function(req,res) {
	let requestTitle = _.lowerCase(req.params.title);
	
	posts.forEach(function (post) {
		if (_.lowerCase(post.title) === requestTitle) {
			res.render("post", {
				title:post.title,
				body:post.content
			});
		}
	});

});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
