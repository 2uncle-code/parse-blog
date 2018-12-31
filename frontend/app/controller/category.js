import baseController from "./base";

export default class categoryController extends baseController{

    getCatgeory(req,res){
        res.render('category/index');
    }

    


}