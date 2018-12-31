import nunjucks from 'nunjucks';


export default class vEngine{


    constructor(app,type)
    {
        
        this.ViewEnv=nunjucks.configure('views/page', {
            autoescape: true,
            express: app,
            watch:true
        });
        app.set('view engine', type);
        
    }

    addGlobal (name, value)  {
        this.ViewEnv.addGlobal(name, value);
    };
    
    addFilter (name, fn) {
        this.ViewEnv.addFilter(name, fn);
    } 
    
}




