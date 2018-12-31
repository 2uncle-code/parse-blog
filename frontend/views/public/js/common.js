/**
 * 
 * @param {Class Name} _class 
 * @param {Object Id} id 
 * 返回一个查询好到对象
 */
let getObjById = (_class, id) => {

    return getClassQuery(_class).get(id);
}

let getClassQuery = (_class) => {
    const OBJ = new Parse.Object(_class);
    const query = new Parse.Query(OBJ);
    return query;
}

let getClassObj=(_class)=>{
    const OBJ= Parse.Object.extend(_class);
    return new OBJ();

}


let getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}