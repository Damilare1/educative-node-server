import { Router } from "express"
import adminRoutes from './admin/index.js'
import inputOptions from './input_options/index.js'
import inputTypes from './input_types/index.js'
import surveyQuestions from './survey_questions/index.js'
import surveyResponses from "./survey_responses/index.js";
import surveys from './surveys/index.js'

const router = Router()

router.use('/admin', adminRoutes)
router.use('/input_options', inputOptions)
router.use('/input_types', inputTypes)
router.use('/survey_questions', surveyQuestions)
router.use('/survey_responses', surveyResponses)
router.use('/surveys', surveys)

export default router

