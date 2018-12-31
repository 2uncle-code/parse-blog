import baseController from "./base";

export default class postController extends baseController{

    index(req,res){
        res.render('post/index');
    }

    create(req,res){
        res.render('post/create');
    }
    
    edit(req,res){
        
        res.render('post/create',{id:req.params.id});
    }
    show(req,res){
        res.render('post/show',{id:req.params.id});
    }

}