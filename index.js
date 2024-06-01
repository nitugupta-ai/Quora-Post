const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");  

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "ejs");                  //for setting ejs
app.set("views", path.join(__dirname, "views"));        // for setting views inroder to access it from different file location
app.use(express.static(path.join(__dirname, "public")));    // for setting public folder

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I loved coding"
    },
    {
        id: uuidv4(),
        username: "nitugupta",
        content: "I loved coding"
    },
    {
        id: uuidv4(),
        username: "ankitchaurasiya",
        content: "I loved marketing"
    },
];


// app.use((req,res) => {
//     res.send("This is main index.js file")
// })

app.get("/posts", (req,res) => {
    // res.send("Serving everything well!")
    res.render("index.ejs", { posts })
})

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
})

app.post('/posts', (req,res) => {
    let {username, content} =  req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    console.log(username, content);
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res) => {

    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    
    console.log("patch is working fine");
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req,res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts")
}
)

app.listen(port, () => {
    console.log("Server started");
})