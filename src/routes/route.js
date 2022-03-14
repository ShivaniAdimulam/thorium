const express = require('express');
const router = express.Router();
const blogController= require("../controllers/blogController")


router.post("/authors",blogController.createAuthor)

router.post("/blogs",blogController.createBlog)

router.get("/blogs",blogController.getBlogsData)

router.put("/blogs/:blogId",blogController.updateBlogs)

router.delete("/blogs/:blogId",blogController.deletePath)

router.delete("/blogs",blogController.deleteBlog)


module.exports=router;