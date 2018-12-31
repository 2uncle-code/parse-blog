/**
 * 
 * @param {角色，字符串} role 
 * @param {用户列表，数组或单个用户} users
 * @param {执行操作，绑定用户到角色，从角色移除[add,remove]} action 
 */
let userRoleRelation = async (role, users, action) => {

    const query = new Parse.Query(Parse.Role);
    query.equalTo("name", role);
    let _role = await query.first({ useMasterKey: true });
    _role.getUsers()[action](users);
    return _role.save(null, { useMasterKey: true })
}

/**
 * 
 * @param {Class Name} _class 
 * @param {Object Id} id 
 * 返回一个查询好到对象
 */
let getObjById = (_class, id) => {

    return getClassQuery(_class).get(id);
}
/**
 * 
 * @param {传入一个类} _class 
 */
let getClassQuery = (_class) => {
    const OBJ = new Parse.Object(_class);
    const query = new Parse.Query(OBJ);
    return query;
}
/**
 * 
 * @param {角色} role 
 * @param {*用户} _user 
 * 判断用户是否属于对应角色，返回true false
 */
let userRole = async (role, _user) => {
    const query = new Parse.Query(Parse.Role);
    query.equalTo("name", role);
    let _role = await query.first({ useMasterKey: true });
    let users = await _role.getUsers().query().find();

    let result = false
    for (let i in users) {
        if (users[i].id === _user.id) {
            result = true;
            break;
        }
        
    }
    return result;
    
}

export { userRoleRelation, getObjById, getClassQuery, userRole }