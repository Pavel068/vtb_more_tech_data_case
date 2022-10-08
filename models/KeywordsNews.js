const Sequelize = require('sequelize')
const sequelize = require('../Sequelize')

const KeywordsNews = sequelize.define('keywords_news', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    keyword_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    new_id: {
        type: Sequelize.INTEGER(),
        allowNull: true
    },
    created_at: {
        name: 'created_at',
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    updated_at: {
        name: 'updated_at',
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    }
}, {
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
})

module.exports = KeywordsNews