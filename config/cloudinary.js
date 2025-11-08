const cloudinary =  require ('cloudinary').v2 //v2 used for version
const { CloudinaryjStorage, CloudinaryStorage } = require('multer-storage-cloudinary')
cloudinary.config({
   cloud_name: "dnh1wtuia",
  api_key: "467166848797554",
  api_secret: "PFdsagx1qX70KXzvcYb1vxpkyow",
});
const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params:{
    folder:"userprofile",
    allowed_formats: [ 'jpeg','jpg','png'],
},
});
module.exports = {
    cloudinary,
    storage,
};