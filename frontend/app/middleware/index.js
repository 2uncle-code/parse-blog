let checkLogin=(req, res, next)=> {
    
    if (!req.session.user) {
      
      return res.redirect('/user/login')
    }
    
    next()
  };

 let checkNotLogin=  (req, res, next)=> {
    
    if (req.session.user) {
      
      return res.redirect('/user/index')// back to user dashboard
    }
    next()
  };
  
export  {checkLogin,checkNotLogin};
