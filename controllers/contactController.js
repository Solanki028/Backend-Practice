const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

 
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id :req.user.id});
  res.status(200).json(contacts);
});
 
 
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.body.id 
  });

  res.status(201).json(contact);
});

  
const getContact = asyncHandler(async (req, res) => {

    const contact=await Contact.findById(req.params.id )
if(!contact){
    res.status(404)
    throw new Error("Contact not found")
}

  res.status(200).json(contact)   
  });


  const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // ensures the updated document is returned
    );
    
    res.status(200).json(updatedContact);
});

  

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Contact deleted successfully", contact });
});


// Exporting the functions
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
  