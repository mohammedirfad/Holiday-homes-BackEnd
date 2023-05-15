import mongoose from 'mongoose';
import validator from 'validator';

const propertySchema =new mongoose.Schema({

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    structure:{
        type:String,
       
    },
    floorplan: {
        guest: {
          type: Number,
         
        },
        beds: {
          type: Number,
          
        },
        bathrooms: {
          type: Number,
         
        },
        bedrooms:{
            type: Number,
        }
      },
      location:{
        type: String,
        
      },

      title: {
        type: String,
        
        validate: {
          validator: function(value) {
            return value.length <= 100;
          },
          message: 'Title cannot be longer than 100 characters'
        }
      },

    description: {
        type: String,
        
     },
     
    AdditionalDescription: {
        type: String,
    },
    amenities :{
        type: Array
    },
    images:{
        type: Array
    },
    price: {
        type: Number
    },
    status:{
        type:String
    },
    IdType:{
      type:String
    },
    Id_front_Image:{
      type:Array
    },
    Id_back_Image:{
      type:Array
    },
    Host_Selfie:{
      type:String
    },
    Verification_Status:{
      type:String
    },
    Verification_list:{
      type:String,
      default:"Required to publish"
    },
    PropertyList:{
      type:String,
      default:"Pending/unlisted"
    },
    selectedDate:{
      type:Date,
      default: new Date()
    },
    block:{
      type:Boolean,
      
    },
    BlockReason:{
      type:String
    }
    


},
{timestamps: true}
)

export default mongoose.model('Property', propertySchema);