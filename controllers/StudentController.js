class StudentController {

    static display = async(req,res)=>{
        try {
            res.render('students/display')  //folder (student) [insie] display.js
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = StudentController