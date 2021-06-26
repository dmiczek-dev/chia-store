exports.validateUserRegister = function (payload) {
  emailRegExp = /\S+@\S+\.\S+/;
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false
  } else if ([payload.username, payload.password, payload.email].includes(undefined)) {
    return false
  } else if (payload.username.length < 3 || payload.password.length < 5 || !emailRegExp.test(payload.email)) {
    return false
  } else {
    return true;
  }
}

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

exports.validateCreateAccount = function (payload) {
  emailRegExp = /\S+@\S+\.\S+/;
  if (payload.constructor === Object && Object.keys(payload).length === 0) {
    return false
  } else if ([payload.username, payload.password, payload.email, payload.permissionId].includes(undefined)) {
    return false
  } else if (payload.username.length < 3 || payload.password.length < 5 || !emailRegExp.test(payload.email)) {
    return false
  } else {
    return true;
  }
}