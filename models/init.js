const sequelize = require('../Sequelize')

const News = require('./News')
const KeywordsNews = require('./KeywordsNews')

News.hasMany(KeywordsNews, {
    foreignKey: 'new_id'
})
KeywordsNews.belongsTo(News, {
    foreignKey: 'new_id'
})

async function init(logging = false, alter = false) {
    await sequelize.sync({
        logging,
        alter,
        force: false
    });

    console.log('DB model has been sync!')
}

module.exports = { init }