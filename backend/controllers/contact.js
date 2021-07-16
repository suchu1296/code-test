const imageProcess = require('../util/imageProcess');
const Contact = require('../Contact/Contact');
const contact =  new Contact();
const createContact = async (req, res) =>{
    
    
    const id = contact.createId();
    try{
        const imageName = await imageProcess(req,id);
contact.create(req.body,id,imageName);
res.json({ success: true, message: 'Contact created successfully.' });

    }
    catch(error){
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
          });
    }
};

const getAllContact = async(req, res) =>{
    try{
       const data = await contact.getAll();
       res.json({ success: true, contact: data
        });
    }
    catch{
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
          }); 
        
    }
}

const getSingleContact = async(req, res) =>{
    try{
        const data = await contact.getSingle(req.params.id);
        //console.log(data);
        if (!data) {
          return res.json({
            success: false,
            message: 'Contact not found!',
          });
        }
    
        res.json({
          success: true,
          contact: data,
        });
    }
    catch{
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
          }); 
        
    }
}

const updatecontact = async(req, res) =>{
    try{
        const data = await contact.getSingle(req.params.id);
        if(data){
            contact.update(req.body,req.params.id);
        }

        res.json({ success: true, message: 'Contact created successfully.' });
        
    }
    catch{
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
          }); 
        
    }
}
module.exports = {
    createContact, getAllContact, getSingleContact, updatecontact
}
