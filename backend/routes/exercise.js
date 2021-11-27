const  express = require('express')
const router = express.Router();

const {
    getAllExercise,
    createExercise,
    getsingleExercise,
    updateExercise,
    deleteExercise,

} = require('../controller/exercise')
    

router.route('/').get(getAllExercise).post(createExercise);
router.route('/update/:id').get(getsingleExercise).patch(updateExercise)
router.route('/:id').delete(deleteExercise)

module.exports = router