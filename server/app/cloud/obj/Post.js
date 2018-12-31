import BaseObj from "./BaseObj";



export class Post extends BaseObj {

    beforeSave_rules() {
        return {
            name: 'required',
            content: 'required'
        }
    };

    registerFunc() {
        return [
            'postView',
            
        ]
    }

    beforeSave(req)
    {
       
        if (!req.object.getACL()) {  //在创建对象的时候设置权限，再次修改的时候不变
            let postACL = new Parse.ACL(req.user);
            postACL.setPublicReadAccess(true);
            req.object.setACL(postACL);
            
          }
       
    }

    

    async postView(req) {
        
        let post=await this.getObjById('Post',req.params.postId);
        post.increment("view");
        return await  post.save(null, { useMasterKey: true })
            .then(_p => {
                return _p.id;
            }).catch(err => {
                return err;
            });



    }


}


export default Post;