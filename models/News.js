const Sequelize = require('sequelize')
const sequelize = require('../Sequelize')

const News = sequelize.define('news', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    url: {
        type: Sequelize.STRING(255),
        allowNull: false
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
    collate: 'utf8mb4_general_ci',
    indexes: [
        { fields: ['url'], unique: 'url' }
    ]
})

module.exports = News