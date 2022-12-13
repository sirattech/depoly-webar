
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")
var storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, '/Upload')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' && ext !== ".mkv") {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadvideo", (req, res) => {
   console.log("uploadvideo", req.body);
    upload(req, res, err => {
   console.log("uploadvideo", req.body);
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});



module.exports = router;
