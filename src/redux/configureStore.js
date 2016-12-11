/**
 * Created by ad on 11.12.2016.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
} else {
    module.exports = require('./configureStore.dev');
}