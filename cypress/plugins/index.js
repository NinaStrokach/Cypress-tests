const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";


module.exports = (on, config) => {
    allureWriter(on, config);
    return config;
};