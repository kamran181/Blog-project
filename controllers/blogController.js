import Blog from '../models/postSchema.js'
import User from '../models/userSchema.js'

export const getBlog = async (req, res) => {
    res.render('blogCreate', {blog :''});
}

export const postBlog = async (req, res) => {
    try {
        if(!req.body.hidden_id){
            const { title, description, imageUrl } = req.body;
            const blog = new Blog({
                title,
                description,
                imageUrl,
                user: req.session.user._id
            });
    
            await blog.save();
            req.flash('msg', 'Blog created successfully')
            res.redirect('/')
        } else{
            const updatedBlog = await Blog.findByIdAndUpdate({_id : req.body.hidden_id}, req.body, {new : true});
            req.flash('msg', 'Blog updated successfully')
            res.redirect('/myBlogs')
        }

      

    } catch (error) {
        console.log(error);
    }
}

export const renderBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('user');
        console.log('blogs', blogs);
        console.log("req", req.session.user._id);
        const user = await User.findById({_id : req.session.user._id})
        res.render('home', { blogs: blogs ,user : user});
          
    } catch (error) {
        console.log(error);
    }
}

export const myBlogs = async (req, res) => {
    try {

        const myBlogs = await Blog.find({user : req.session.user._id});
        console.log('myBlogs', myBlogs);
       res.render('myBlogs', {blogs : myBlogs})
        
    } catch (error) {
        console.log(error);
    }
}


export const deleteBlog = async (req,res)=>{
  try {
    await Blog.findByIdAndRemove({_id:req.params.id})
    req.flash('msg', 'Blog deleted successfully')
    res.redirect('/myBlogs');
    } catch (error) {
    console.log(error);
  }
}

export const getBlogById = async(req,res)=>{
    try {
        const blog = await Blog.findById({_id : req.params.id})  
        res.render('blogCreate',{blog : blog})    
    } catch (error) {
      console.log(error);  
    }
}


