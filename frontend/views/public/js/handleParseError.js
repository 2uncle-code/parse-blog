
function handleParseError(obj, err) {
    switch (err.code) {
        case Parse.Error.INVALID_SESSION_TOKEN:
            Swal({
                position: 'top-end',
                type: 'error',
                title: '已超时，请重新登陆!',
                showConfirmButton: false,
                timer: 2500
            }).then(() => {
                Parse.User.logOut();
                location.reload();
            })

            break;

        default: behavior(obj, err)

    }
}

function behavior(obj, err) {
    switch (err.code) {
        case 101:
            if (obj != 'user') {
                location.href = '/404'
                break;
            }
        default:
            Swal({
                position: 'top-end',
                type: 'error',
                title: errTrans(obj, err),
                showConfirmButton: false,
                timer: 2500
            })

    }



}