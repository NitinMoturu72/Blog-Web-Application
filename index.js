import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DBHOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

async function getPosts() {
    const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
    return result.rows;
}

async function setPosts(newPost) {
    try {
        const result = await db.query("INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING id, title, content", [newPost.title, newPost.content]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function updatePosts(updatedPost) {
    try {
        await db.query("UPDATE posts SET title = $1, content = $2 WHERE id = $3", [updatedPost.title, updatedPost.content, updatedPost.id]);
    } catch (err) {
        console.error(err);
    }
}



// Static files.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


//Renders index.ejs as home page with the list of all titles.
app.get("/", async (req,res) => {
    const fetchedPosts = await getPosts();
    res.render("index.ejs", { posts: fetchedPosts });
});

// Creates a post into the array and renders the post that was just created.
app.post("/post", async (req,res) => {

    const post = {
                    title : req.body.title,
                    content : req.body.content
                };
    const createdPost = await setPosts(post);
    res.render("blog.ejs", {
                            postId: createdPost?.id,
                            postTitle: createdPost?.title ?? post.title,
                            postContent : createdPost?.content ?? post.content
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
app.post("/viewPost", async (req,res) =>{
    const viewPostId = req.body.blogId;
    const result = await db.query("SELECT * FROM posts WHERE id = $1 LIMIT 1", [viewPostId]);
    const posting = result.rows[0];

    if (!posting) {
        return res.status(404).render("blog.ejs");
    }

    res.render("blog.ejs", {
                            postId: posting.id,
                            postTitle: posting.title,
                            postContent : posting.content});
});

// Edit button redirects to the create.ejs file with current data, which is fetched using title, allowing you to edit that post.
app.post("/editPost", (req, res)=>{
    res.render("create.ejs", {post : req.body});
    // console.log(req.body);
});

// Update post button updates the posts array by finding the post using title and updates its content first eventually the title too. Also renders the blog.ejs using the updated data
app.post("/update", async (req,res) => {
    await updatePosts(req.body);
    res.render("blog.ejs", {
                            postId: req.body.id,
                            postTitle: req.body.title,
                             postContent : req.body.content
                            });

});

// Delete post button deletes from the posts array by filtering out the post with the given and redirects to the home page(index.ejs).
app.post("/deletePost", async (req, res)=>{
    await db.query("DELETE FROM posts WHERE id = $1", [req.body.id]);
    res.redirect("/");

});

// listens to the port we are running the server on
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
