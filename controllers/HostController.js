import mongoose from 'mongoose';
import Property from '../models/hostSetup.js';
import {uploadImage, uploadMultipleImages} from '../middlewares/cloudinary.js'



// User-host-struture
export const hostStructure = async (req, res) => {
    console.log("ethiiii")
    const { structures, id } = req.body
    console.log(structures)
    console.log(req.body);

    try {

        const response = new Property({
          
            owner: id,
            structure: structures,
            status:"strture updated"
        })

        await response.save()
        const host_id = response._id;
        const structure = response.structure
        res.status(200).json({ host_id,structure,status:response.status})


    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-floorplan
export const hostfloorPlan = async (req, res) => {

    const { guests, bedroom, bathroom, beds ,host } = req.body
    console.log(req.body);
    console.log(guests,"......................")
    
    
    try {
        const a = new mongoose.Types.ObjectId(host)
 
       await Property.findByIdAndUpdate(
            { _id:a},
            { $set: {"floorplan.guest" : guests, "floorplan.beds": beds,"floorplan.bathrooms":bathroom,"floorplan.bedrooms":bedroom,status:"floorPlan updated"} },
            {upsert:true},
            { new: true },
            (err, item) => {
              if (err) {
                console.error(err);
                res.status(500).send('Server error');
              } else if (!item) {
                res.status(404).send('Item not found');
              } else {
                console.log(item,"????????????????????????");
                res.status(200).json({item});
              }
            }
          );
   
//    const response =  await Property.updateOne({_id:a}, { $set: {"floorplan.guest" : guests, "floorplan.beds": beds,"floorplan.bathrooms":bathroom,"floorplan.bedrooms":bedroom} },{upsert:true}, { new: true })
//    console.log(response,"wqjrhygggggggggggggggggggggggggggggggggggggggggggg")
//    res.status(200).json({floorplan:response.floorplan})

    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-location
export const hostLocation = async (req, res) => {
    console.log("jhuftdtrd");
    const { location,host } = req.body
    console.log(req.body, "jhuftdtrd");

    try {
      
        const a = new mongoose.Types.ObjectId(host)
 
        await Property.findByIdAndUpdate(
             { _id:a},
             { $set: {location:location,status:"location updated"} },
             {upsert:true},
             { new: true },
             (err, item) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Server error');
               } else if (!item) {
                 res.status(404).send('Item not found');
               } else {
                 console.log(item,"????????????????????????");
                 res.status(200).json({item});
               }
             }
           );
  }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-title
export const hostTitle = async (req, res) => {

    const { title,host } = req.body
    console.log(req.body);

    try {

        const a = new mongoose.Types.ObjectId(host)
 
        await Property.findByIdAndUpdate(
             { _id:a},
             { $set: {title:title,status:"title updated"} },
             {upsert:true},
             { new: true },
             (err, item) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Server error');
               } else if (!item) {
                 res.status(404).send('Item not found');
               } else {
                 console.log(item,"????????????????????????");
                 res.status(200).json({item});
               }
             }
           );
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-Description
export const hostDescription = async (req, res) => {

    const { Desccription,host} = req.body
    console.log(req.body);

    try {
        const a = new mongoose.Types.ObjectId(host)
 
        await Property.findByIdAndUpdate(
             { _id:a},
             { $set: {description:Desccription,status:"decription updated"} },
             {upsert:true},
             { new: true },
             (err, item) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Server error');
               } else if (!item) {
                 res.status(404).send('Item not found');
               } else {
                 console.log(item,"????????????????????????");
                 res.status(200).json({item});
               }
             }
           );
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

// User-host-Description
export const hostAddDesc = async (req, res) => {

    const { AddDes,host } = req.body
    console.log(req.body);

    try {
    
        const a = new mongoose.Types.ObjectId(host)
 
        await Property.findByIdAndUpdate(
             { _id:a},
             { $set: {AdditionalDescription:AddDes,status:"additional decription updated"} },
             {upsert:true},
             { new: true },
             (err, item) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Server error');
               } else if (!item) {
                 res.status(404).send('Item not found');
               } else {
                 console.log(item,"????????????????????????");
                 res.status(200).json({item});
               }
             }
           );     
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-Amenities
export const hostAmenities = async (req, res) => {

    const { Amenities,host } = req.body
    console.log(req.body);

    try {
        const a = new mongoose.Types.ObjectId(host)
 
        await Property.findByIdAndUpdate(
             { _id:a},
             { $set: {amenities:Amenities,status:"Amenities updated"} },
             {upsert:true},
             { new: true },
             (err, item) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Server error');
               } else if (!item) {
                 res.status(404).send('Item not found');
               } else {
                 console.log(item,"????????????????????????");
                 res.status(200).json({item});
               }
             }
           );

    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-Images
export const hostImages = async (req, res) => {
  
    console.log("here...",)
    try {

    console.log(req.files);
    console.log("/.,.,.,.,.",req.body);
    const response = await uploadMultipleImages(req.body.formData)
    console.log("here...",response)
    const a = new mongoose.Types.ObjectId(req.body.host)
    const imageResponse =  await Property.updateOne({_id:a}, { $set: {images:response,status:"image updated"} },{upsert:true}, { new: true })
    console.log(imageResponse,"wqjrhygggggggggggggggggggggggggggggggggggggggggggg")
    res.status(200).json({message:"updated successfully"})
 
    // await Property.findByIdAndUpdate(
    //      { _id:a},
    //      { $set: {images:response,status:"image updated"} },
    //      {upsert:true},
    //      { new: true },
    //      (err, item) => {
    //        if (err) {
    //          console.error(err);
    //          res.status(500).send('Server error');
    //        } else if (!item) {
    //          res.status(404).send('Item not found');
    //        } else {
    //          console.log(item,"????????????????????????");
    //          res.status(200).json({item});
    //        }
    //      }
    //    );
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-Price
export const hostPrice = async (req, res) => {
    console.log("kn qj")

    const { Price ,host} = req.body
    console.log(req.body);

    try {
       const a = new mongoose.Types.ObjectId(host)
 
        await Property.findByIdAndUpdate(
             { _id:a},
             { $set: {price:Price,status:"price updated"} },
             {upsert:true},
             { new: true },
             (err, item) => {
               if (err) {
                 console.error(err);
                 res.status(500).send('Server error');
               } else if (!item) {
                 res.status(404).send('Item not found');
               } else {
                 console.log(item,"????????????????????????");
                 res.status(200).json({item});
               }
               console.log(item,">..........................................................................")
             }
           );
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// User-host-Verification method


export const HostVerify = async (req, res) => {
  console.log("kn qj------------------------------------1111111-----------------------------------")
 
  
  const {host,IdType} = req.body
  console.log(req.body,"..........",IdType);
  
  const frontImage = await uploadImage(req.body.image1)
  const backImage = await  uploadImage(req.body.image2)

  try {
     const a = new mongoose.Types.ObjectId(host)
   const response =  await Property.updateOne({_id:a}, { $set: {Id_front_Image:frontImage,Id_back_Image:backImage,IdType:IdType} },{upsert:true}, { new: true })
   console.log(response,"wqjrhygggggggggggggggggggggggggggggggggggggggggggg")
   res.status(200).json({message:"updated successfully"})
      
  }

  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}



// User-host-photoverification method


export const HostPhotoverify = async (req, res) => {
  console.log("kn qj------------------------------------1111111-----------------------------------")

  
  const {image1,host} = req.body
  console.log(req.body,"..........");
  
  const userSelfieimage = await uploadImage(image1)
  

  try {
     const a = new mongoose.Types.ObjectId(host)
   const response =  await Property.updateOne({_id:a}, { $set: {Host_Selfie:userSelfieimage,Verification_Status:"user Image updatted",Verification_list:"Verification Pending"} },{upsert:true}, { new: true })
   console.log(response,"wqjrhygggggggggggggggggggggggggggggggggggggggggggg")
   res.status(200).json({message:"updated successfully"})
      
  }

  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}
 

// User-host-details
export const getHostDetails = async (req, res) => {
    

    try {

      console.log(req.query)
      const a = new mongoose.Types.ObjectId(req.query.filter)
      const response = await Property.find({owner:a}).sort({createdAt:-1})
      console.log(response,":::::::::")
      res.status(200).json(response)
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

export const getHostVerification_list = async (req, res) => {
    
  console.log(" while creating host get status")
  try {
    console.log(req.query,"zsss")
    const {host} = req.query
    const a = new mongoose.Types.ObjectId(host)
    const response = await Property.findOne({_id:a});
    console.log(response.Verification_list,":::::::::")
    res.status(200).json(response.Verification_list)
  }

  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}

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


