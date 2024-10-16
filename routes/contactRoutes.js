const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController"); // Ensure this path is correct
const ValidateToken=require("../middleware/validateTokenHandler")
const router = express.Router();

// Define routes
router.get("/", getContacts); // Get all contacts
router.post("/", createContact); // Create a new contact
router.get("/:id", getContact); // Get a specific contact by ID
router.put("/:id", updateContact); // Update a contact by ID
router.delete("/:id", deleteContact); // Delete a contact by ID

module.exports = router;
