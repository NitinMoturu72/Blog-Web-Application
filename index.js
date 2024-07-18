import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

// Static files.
app.use(express.static("public")); 

app.use(bodyParser.urlencoded({ extended: true }));


//Renders index.ejs as home page with the list of all titles.
app.get("/", (req,res) => {
    res.render("index.ejs", {titles : posts.map(eachPost=>eachPost.title) });
});

// Creates a post into the array and renders the post that was just created.
app.post("/post", (req,res) => {
    
    const post = {
                    title : req.body.title,
                    content : req.body.content
                };
    posts.push(post);
    // console.log(posts)
    // console.log(posts.map(eachPost=>eachPost.title));
    res.render("blog.ejs", {postTitle: post.title,
                            postContent : post.content
                            });

});

// Create button sends to the create.ejs file without any data, allowing you to create a new post.
app.get("/createPost", (req, res)=>{
    res.render("create.ejs");
});

// FAQ button redirects to the FAQ page(FAQ.ejs)
app.get("/FAQ", (req, res)=>{
    res.render("FAQ.ejs");
});

// About button redirects to the about page(about.ejs)
app.get("/about", (req,res)=>{
    res.render("about.ejs");
});

// Read blog button redirects to the blog.ejs file with current post data, which is fetched using title, allowing you to read that post.
app.post("/viewPost", (req,res) =>{
    const viewPostTitle = req.body.blogTitle;
    // console.log(viewPostTitle);
    const posting = posts.find(eachPost => eachPost.title === viewPostTitle);
    res.render("blog.ejs", {
                            postTitle: posting.title,
                            postContent : posting.content});
});

// Edit button redirects to the create.ejs file with current data, which is fetched using title, allowing you to edit that post.
app.post("/editPost", (req, res)=>{
    res.render("create.ejs", {post : req.body});
    // console.log(req.body);
});

// Update post button updates the posts array by finding the post using title and updates its content first eventually the title too. Also renders the blog.ejs using the updated data
app.post("/update", (req,res) => {
    posts.find(eachPost => eachPost.title === req.body.originalTitle).content = req.body.content;
    posts.find(eachPost => eachPost.title === req.body.originalTitle).title = req.body.title;
    // console.log(req.body);
    // console.log(posts);
    // console.log(posts.map(eachPost=>eachPost.title));
    res.render("blog.ejs", {postTitle: req.body.title,
                             postContent : req.body.content
                            });

});

// Delete post button deletes from the posts array by filtering out the post with the given and redirects to the home page(index.ejs).
app.post("/deletePost", (req, res)=>{
    posts = posts.filter(eachPost => eachPost.title !== req.body.title);
    console.log("Post has been deleted successfully");
    res.redirect("/");
    // console.log(req.body);

});

// listens to the port we are running the server on
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})