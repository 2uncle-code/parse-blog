import BaseObj from "./BaseObj";

export class User extends BaseObj {


  beforeSave_rules() {
    return {
      email: 'required|email',

    }
  };

    
  registerFunc() {
    return [
      'checkEmail',
      'checkUserName',
      'signUp'

    ]
  }


  checkEmail(req) {
    
    return this.checkUser('email', req.params.email)
  }

  checkUserName(req) {
    return this.checkUser('username', req.params.username)
  }

  async checkUser(feild, value) {

    const query = new Parse.Query(Parse.User);
    query.equalTo(feild, value);

    return await query.first().then(e => {

      return e ? true : false;
    }).catch(err => {
      return false;
    });
  }

  async signUp(req) {
    let user = new Parse.User();
    const username = req.params.username;
    const password = req.params.password;
    const email = req.params.email;

    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    try {
      let _user = await user.signUp();
      return this.userRoleRelation('register', _user, 'add')
        .then(_role => {
          return { user: _user.get('sessionToken') };
        }, err => {
          _user.destroy();
          return err;
        });


    } catch (err) {
      return err;
    }

  }


}


export default User;