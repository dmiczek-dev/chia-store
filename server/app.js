if (process.env.NODE_ENV === 'production') {
    require('./dist')
} else {
    // require('nodemon')({ script: 'dev.js' })
    // require('@babel/register')
    require('./src')
}
