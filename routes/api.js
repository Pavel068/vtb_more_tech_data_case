const express = require('express')
const router = express.Router()

const NewsController = require('../controllers/NewsController')
const SuggestionsController = require('../controllers/SuggestionsController')

router.get('/news', NewsController.index);
router.get('/suggestions', SuggestionsController.index);

module.exports = router
