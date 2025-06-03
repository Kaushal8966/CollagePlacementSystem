class HodController{

    static display = async(req,res)=>{

        try{
            res.render('hod/display') // folder (Hod) [inside] display
        } catch (error) {

            console.log(error)
        }
    }
}
module.exports = HodController