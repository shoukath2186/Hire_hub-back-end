import multer from "multer";

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './assets'); // Specify the directory to save uploaded files
    // },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

export default storage