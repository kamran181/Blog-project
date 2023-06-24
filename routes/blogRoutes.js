import express from "express";

const router = express.Router();

import { deleteBlog, getBlog, myBlogs, postBlog ,renderBlogs, getBlogById,} from "../controllers/blogController.js";

import { isLoggedIn } from "../middlewares/isLoggedin.js";

router.get('/blog/create', isLoggedIn, getBlog);

router.post('/blog/create', isLoggedIn, postBlog);

router.get('/',isLoggedIn, renderBlogs);

router.get('/myBlogs',isLoggedIn, myBlogs);

router.get('/delete/:id',isLoggedIn, deleteBlog);

router.get('/blog/edit/:id', isLoggedIn,getBlogById);



export default router