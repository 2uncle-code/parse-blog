import baseController from "./base";

export default class indexController extends baseController{

    index(req,res){
        res.render('index');
    }
   
    


}