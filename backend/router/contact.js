const express = require('express');
const router = express.Router();

const uploads = require('../middleware/multer');
const {createContact, getAllContact, getSingleContact, updatecontact} = require('../controllers/contact');





router.post(
    '/create',uploads.single('thumbnail'), createContact);

router.get('/contacts',getAllContact);

router.get('/contact/single/:id', getSingleContact);

router.get('/contact/update/:id', updatecontact);


    

module.exports = router;