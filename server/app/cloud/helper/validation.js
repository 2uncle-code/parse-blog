import validator from 'validator';
import DOMPurify from 'dompurify';

export default  (req, rules) => {

    // const Clean=DOMPurify.sanitize;
    for (let rule in rules) {
        const many_rules = rules[rule].split('|');
        const name = rule;
        const value = req.object.get(name);
        
       // req.object.set(name,await Clean(value));
        many_rules.map(_rule => {
            
            const patt = /^max|min|size:[0-9]+$/;
            if (patt.test(_rule)) {
                const numberPatt=/^.*int|float.*$/;
                const numberType=numberPatt.test(rules[rule]);
                const action=_rule.split(':')[0];//方法
                const parm=_rule.split(':')[1];//参数
                const method=Methods[action];
                method(name,value,parm,numberType);

            } else {
                const method = Methods[_rule];
                method(name, value);
            }


        });
    }


}

const Methods = {
    required: (name, value) => {
        
        if (validator.isEmpty(value))
            throw name + '字段为必填项!'
    },
    email: (name, value) => {

        if (!validator.isEmail(value))
            throw name + '字段必须为正经email!'
    },
    phone: (name, value) => {
        if (!validator.isMobilePhone(value, 'zh-CN'))
            throw name + '字段必须为正经手机号哦!'
    },
    int: (name, value) => {
        if (!validator.isInt(value)) {
            throw name + '字段必须为正经整数哦!'
        }

    },

    float: (name, value) => {
        
        if (!validator.isFloat(value)) {
            throw name + '字段必须为浮点数哦!'
        }
    },
    max:  (name,value,max,type)=> {
    
        
        const result=Methods.caculate(Methods.compare.max,value,max,type);
        if (result) throw name + '字段不得超过' + max + '哦!'

    },
    min:(name,value,min,type)=>{
        const result=Methods.caculate(Methods.compare.min,value,min,type);
        if (result) throw name + '字段不得少于' + min + '哦!'
    },
    array: (name, value) => {
        if (!Array.isArray(value)) {
            throw name + '必须为数组哦!'
        }
    },

    size:  (name,value,size,type) =>{
        
        const result=Methods.caculate(Methods.compare.size,value,size,type);
        if (result) throw name + '字段必须等于' + size + '哦!'

    },
    /**
     * 参数：
     * action /最小，最大，等于
     * value  比较的值
     * target 目标值
     * type 目标值的类型
     *  */
    caculate:(action,value,target,type)=>{
        let pair=[value,target];
        pair[0]=type?parseFloat(pair[0]):pair[0].length;//检测目标值类型，属于可计算的float和int，还是字符串，数组等object
        if(action===Methods.compare.max){ //比较值小于等于目标值max
            return  pair[0]>pair[1];
        }else if(action===Methods.compare.min){ //比较值大于等于目标值min
            return pair[0]<pair[1];
        }else{
            return pair[0]===pair[1]; //比较值等于目标值size
        }

    },

    compare:{
        'max':'max',
        'min':'min',
        'size':'size'
    }

}


