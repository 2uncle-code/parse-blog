const setQueryConfig = function(queryConfig){
    let _str = '?';
    for(let o in queryConfig){
        if(queryConfig[o] != -1){
            _str += o + '=' + queryConfig[o] + '&';
        }
    }
    _str = _str.substring(0, _str.length-1);
    return _str;
}