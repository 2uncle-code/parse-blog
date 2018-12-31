import validator from "../helper/validation";

import {getObjById,userRoleRelation,getClassQuery,userRole} from '../helper/common';

export default class BaseObj {

    constructor(obj) {
        this.obj = obj;
 

        //常用方法
        this.getObjById=getObjById;
        this.userRoleRelation=userRoleRelation;
        this.userRole=userRole;
        this.getClassQuery=getClassQuery;
        
        //常用方法

        this.triggerInit();//Start Trigger!
        this.initFunc();//Start Functions
    };
    /**Parse Server trigger Start */
    triggerInit() {
        this.action('beforeSave');
        this.action('afterSave');
        this.action('beforeDelete');
        this.action('afterDelete');
        this.action('beforeFind');
    }
    beforeSave_rules() { };
    afterSave_rules() { };
    beforeDelete_rules() { };
    afterDelete_rules() { };
    beforeFind_rules() { };

    beforeSave(req) { return};
    afterSave(req) { return }
    beforeDelete(req) { return};
    afterDelete(req) { return};
    beforeFind(req) { return};

    action(method) {

        let _action = Parse.Cloud[method];
        let _rules = this[method + '_rules'];
        

        _action(this.obj, req => {
            if(_rules())validator(req, _rules());
            this[method](req);
        });

    }

    /**Parse Server trigger End */



    /**Parse Function Start */
    initFunc(){
        let funcs=this.registerFunc();
        for (let i in funcs)
        {
           
           this.defineFunc(funcs[i]);
        }
    }
    registerFunc() {

    }

    defineFunc(func) {
        Parse.Cloud.define(func, req => {
            return this[func](req);
        })

    }

    /**Parse Function End */



};

