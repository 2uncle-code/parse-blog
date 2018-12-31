import baseController from "./base";

export default class userController extends baseController{

    

    register(req,res){
        res.render('user/register');
    }
    dashBoard(req,res){
        res.render('user/dashboard');
    }

    verify(req,res){
        res.send();
    }

}