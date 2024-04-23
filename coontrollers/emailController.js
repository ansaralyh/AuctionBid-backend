const Subscribe = require("../models/subscribeModel");

exports.createEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = new Subscribe({ email });
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// get all contacts

exports.getAllMails = async (req, res) => {
  try {
      const findAll = await Subscribe.find();
      if(!findAll){
          res.status(404).json({message: 'Query not found'});
      }
      res.status(200).json(findAll)
  } catch (error) {
      res.status(500).json(error)
  }
}

// get all tolat number of mails

exports.getTotalEmails = async (req, res) => {
  try {
    const totalEmails = await Subscribe.countDocuments();
    res.status(200).json({ total: totalEmails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
