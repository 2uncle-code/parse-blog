
let rules = {
    auth: [         //只有已登录的用户才能访问
        'dashboard',
        'post/create',
        'post/edit',
        'post/index'
    ],
    visitor: [
        'register',
    ]
}

let url = document.URL;
let user = Parse.User.current();
let matchAuth, matchVistor = false;
rules.auth.map((path) => {
    let reg = new RegExp(path);
    if (reg.test(url)) {
        matchAuth = true;
        return;
    }
});

if (matchAuth) {
    if (!user) {
        location.href = '/';
        
    }

}


rules.visitor.map((path) => {
    let reg = new RegExp(path);
    if (reg.test(url)) {
        matchVistor = true;
        return;
    }
});
if (matchVistor) {
    if(user){
        location.href = '/';
    }

}

