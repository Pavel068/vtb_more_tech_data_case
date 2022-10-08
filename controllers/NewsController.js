const News = require('../models/News')
const KeywordsNews = require('../models/KeywordsNews')

exports.index = async (req, res) => {
    const data = await News.findAll({})
    res.status(200).json(data)
}