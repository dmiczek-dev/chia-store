const validateUserLogin = function (payload) {
    return !(payload?.username?.length < 3 || payload.password?.length < 5);
};
exports.validateUserLogin = (payload) => {
    validateUserLogin(payload);
};

exports.validateUserRegister = function (payload) {
    return validateUserLogin(payload) && validateEmail(payload.email);
};

exports.validateCreateAccount = function (payload) {
    return validateUserLogin(payload) && validateEmail(payload.email) && payload.hasOwnProperty('permissionId');
};

exports.validateAdminPermission = function (payload) {
    return payload?.permission === 'ADMIN';
};
exports.validateUserPermission = function (payload) {
    return payload?.permission === 'USER';
};

exports.validateCitizenOrder = function (payload) {
    if (payload === undefined) {
        return false;
    }
    return ![
        payload.firstname,
        payload.lastname,
        payload.plots,
        payload.price,
        payload.poolKey,
        payload.farmerKey,
        payload.city,
        payload.street].includes(undefined);
};

exports.validateCompanyOrder = function (payload) {
    if (payload === undefined) {
        return false;
    } else if ([
        payload.company,
        payload.NIP,
        payload.plots,
        payload.price,
        payload.poolKey,
        payload.farmerKey,
        payload.city,
        payload.street].includes(undefined)) {
        return false;
    } else return validateNIP(payload?.NIP);
};

function validateEmail (email) {
    const emailRegExp = /\S+@\S+\.\S+/;
    return emailRegExp.test(email);
}

function validateNIP (nip) {
    let nipWithoutDashes = nip.replace(/-/g, '');
    let reg = /^[0-9]{10}$/;
    if (!reg.test(nipWithoutDashes)) {
        return false;
    } else {
        const digits = ('' + nipWithoutDashes).split('');
        const checksum = (6 * parseInt(digits[0]) + 5 * parseInt(digits[1]) + 7 * parseInt(digits[2]) + 2 * parseInt(digits[3]) + 3 *
            parseInt(digits[4]) + 4 * parseInt(digits[5]) + 5 * parseInt(digits[6]) + 6 * parseInt(digits[7]) + 7 * parseInt(digits[8])) % 11;
        return (parseInt(digits[9]) === checksum);
    }
}
