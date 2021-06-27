exports.validateUserLogin = function (payload) {
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false
  } else if ([payload.username, payload.password].includes(undefined)) {
    return false
  } else if (payload.username.length < 3 || payload.password.length < 5) {
    return false
  } else {
    return true;
  }
}

exports.validateUserRegister = function (payload) {
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false
  } else if ([payload.username, payload.password, payload.email].includes(undefined)) {
    return false
  } else if (payload.username.length < 3 || payload.password.length < 5 || validateEmail(payload.email)) {
    return false
  } else {
    return true;
  }
}

exports.validateCreateAccount = function (payload) {
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false
  } else if ([payload.username, payload.password, payload.email, payload.permissionId].includes(undefined)) {
    return false
  } else if (payload.username.length < 3 || payload.password.length < 5 || validateEmail(payload.email)) {
    return false
  } else {
    return true;
  }
}

exports.validateAdminPermission = function (payload) {
  if (payload.permission === 'ADMIN') {
    return true;
  } else {
    return false;
  }
}

exports.validateUserPermission = function (payload) {
  if (payload.permission === 'USER') {
    return true;
  } else {
    return false;
  }
}

exports.validateCitizenOrder = function (payload) {
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false;
  } else if ([payload.firstname, payload.lastname, payload.plots, payload.price, payload.poolKey, payload.farmerKey, payload.city, payload.street].includes(undefined)) {
    return false;
  } else {
    return true;
  }
}

exports.validateCompanyOrder = function (payload) {
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false;
  } else if ([payload.company, payload.NIP, payload.plots, payload.price, payload.poolKey, payload.farmerKey, payload.city, payload.street].includes(undefined)) {
    return false;
  } else if (!validateNIP(payload.NIP)) {
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  emailRegExp = /\S+@\S+\.\S+/;
  if (!emailRegExp.test(email)) {
    return false;
  } else {
    return true;
  }
}

function validateNIP(NIP) {
  let nipWithoutDashes = nip.replace(/-/g, "");
  let reg = /^[0-9]{10}$/;
  if (!reg.test(nipWithoutDashes)) {
    return false;
  } else {
    var digits = ("" + nipWithoutDashes).split("");
    var checksum = (6 * parseInt(digits[0]) + 5 * parseInt(digits[1]) + 7 * parseInt(digits[2]) + 2 * parseInt(digits[3]) + 3 * parseInt(digits[4]) + 4 * parseInt(digits[5]) + 5 * parseInt(digits[6]) + 6 * parseInt(digits[7]) + 7 * parseInt(digits[8])) % 11;

    return (parseInt(digits[9]) == checksum);
  }
}