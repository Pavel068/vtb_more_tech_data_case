const News = require('../models/News')
const KeywordsNews = require('../models/KeywordsNews')

exports.index = async (req, res) => {
    const role = req.query.role
    const data = await News.findAll({
        include: [{
            model: KeywordsNews,
            where: {
                keyword_name: role
            }
        }]
    })
    res.status(200).json(data)
}