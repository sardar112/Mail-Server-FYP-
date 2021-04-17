const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: 'uploads/profile/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-'+ Date.now() + file.originalname);
    }
    
});



// const imageFilter = function(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };


//let upload = multer({ storage: storage, fileFilter:filter.imageFilter, limits:{ fileSize: 5000000}});



module.exports=multer({ storage });



