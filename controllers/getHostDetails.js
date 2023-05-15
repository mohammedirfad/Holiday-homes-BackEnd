

// User-host-details
export const getHostDetails = async (req, res) => {
    

    try {

      const response = await Property.find({}).sort({createdAt:-1})
      console.log(response,":::::::::")
      res.status(200).json(response)
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

// User-host-single-details
export const getSingledata = async (req, res) => {
    
  console.log(req.query)

  try {

    const {host} = req.query;
    
    const response = await Property.findOne({_id:host}).populate("owner")
    console.log(response,":::::::::")
    res.status(200).json(response)
  }

  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}