import ezrouter from 'express-easy-router';
import userController from './controller/user';
import indexController from './controller/index';
import postController from './controller/post';
import categoryController from './controller/category';

const _user=new userController();
const _index=new indexController();
const _post=new postController();
const _category=new categoryController();

let router=(app)=>{

    
    ezrouter.get('/',_index.index);
    ezrouter.get('/register',_user.register);
    ezrouter.get('/dashboard',_user.dashBoard);
    ezrouter.get('/category',_category.getCatgeory);
    ezrouter.group('/post',()=>{
        ezrouter.get('/index',_post.index);
        ezrouter.get('/create',_post.create);
        ezrouter.get('/edit/:id',_post.edit);
        ezrouter.get('/show/:id',_post.show);
    });
    // 404 page
    ezrouter.get('*', function(req, res){
        res.render('error/404');
    });
    
    ezrouter.bind(app);
   
}

export default router;