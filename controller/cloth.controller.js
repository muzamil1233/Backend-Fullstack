import mongoose from "mongoose";
import Clothes from "../Model/clothes.model.js";
// import Clothes from "../Model/clothes.models.js"

export const AddClothes = async (req, res) => {
  try {
    const {
      name,
      category,
      type,
      size,
      color,
      material,
      price,
      stock,
      brand,
      description,
      isFeatured,
    } = req.body;

    let imageUrls = [];

    // If frontend sends any image URLs (optional)
    if (req.body.images) {
      if (Array.isArray(req.body.images)) imageUrls = req.body.images;
      else imageUrls = [req.body.images];
    }

    // Add uploaded files (local)
    if (req.files && req.files.length > 0) {
      // const localPaths = req.files.map((file) => `/uploads/${file.filename}`);
      const localPaths = req.files.map((file) => file.path);
      imageUrls = [...imageUrls, ...localPaths]; // merge
    }

    const clothes = new Clothes({
      name,
      category,
      type,
      size,
      color,
      material,
      price,
      stock,
      brand,
      description,
      images: imageUrls, // ✅ actually save the image URLs
      isFeatured,
    });

    await clothes.save();

    return res.status(200).json({
      msg: "added succesfully",
      data: clothes, // ✅ return the saved data with images
    });
  } catch (error) {
    console.error("Error at AddClothes:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const deleteClothes = async(req,res)=>{
    try {
        const{id} = req.params;
        if(!id){
            res.status(500).json({
               msg : "id is required"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(500).json({
                msg: "Invalid project ID format" 
            })
        }
        const cloths = await Clothes.findByIdAndDelete(id);
        if(!cloths){
            res.status(404).json({
                msg : "project not found"
            })
        }
        return res.status(200).json({
            msg : "cloth deleted succesfully "
        })
    } catch (error) {
        console.error("Error deleting clothes:", error);
    return res.status(500).json({ msg: "Server error" });
    }
}


export const editCloth = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🧾 Edit request received for ID:", id);

    if (!id) return res.status(400).json({ msg: "ID is required" });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid ID format" });

    // ✅ Start with existing images sent from frontend
    let imageUrls = [];

    // if (req.body.existingImages) {
    //   imageUrls = Array.isArray(req.body.existingImages)
    //     ? req.body.existingImages
    //     : [req.body.existingImages];
    // }

    // ✅ Add newly uploaded images on top
    if (req.files && req.files.length > 0) {
      // const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      const newImages = req.files.map((file) => file.path);
      imageUrls = [...imageUrls, ...newImages];
    }

    // ✅ Remove existingImages from body to avoid saving it as a field
    const { existingImages, ...restBody } = req.body;

    const updateData = {
      ...restBody,
      images: imageUrls,
    };

    const updatedCloth = await Clothes.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCloth) return res.status(404).json({ msg: "Cloth not found" });

    console.log("✅ Cloth updated:", updatedCloth);

    return res.status(200).json({
      msg: "Clothes updated successfully",
      data: updatedCloth,
    });

  } catch (error) {
    console.error("❌ Error updating clothes:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};


export const getCloth = async (req,res)=>{
    try {
        const cloth = await Clothes.find()
        res.status(200).json(cloth)
    } catch (error) {
        console.error("Error at GetClothes:", error);
    res.status(500).json({ msg: "Server error" });
    }
}
export const GetClothByType= async(req,res)=>{
    try {
        const{type} = req.params;
        const cloth = await Clothes.find({ type: { $regex: `^${type}$`, $options: 'i' } });
        if(!Clothes || Clothes.length === 0) {
             return res.status(404).json({ msg: `No clothes found of type ${type}` });
        }
        res.status(200).json(cloth)
    } catch (error) {
    console.error("Error at GetClothesById:", error);
    res.status(500).json({ msg: "Server error" });
    }
}
export const getClothById = async (req, res) => {
  try {
    const { id } = req.params;
    const cloth = await Clothes.findById(id);

    if (!cloth) {
      return res.status(404).json({ msg: `No cloth found with id ${id}` });
    }

    res.status(200).json(cloth);
  } catch (error) {
    console.error("Error at getClothById:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const GetClothbyCatogory= async(req,res)=>{
     try {
         const {category} = req.params;
         const cloth = await Clothes.find({
  category: { $regex: `^${category.trim()}$`, $options: 'i' }
});

        if (!cloth || cloth.length === 0) {
  return res.status(404).json({ msg: `No Clothes of type ${category}` });
}
         res.status(200).json(cloth);

     } catch (error) {
    console.error("Error at GetClothesById:", error);
    res.status(500).json({ msg: "Server error" });
     }
}


export const searchClothes = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ msg: "Search name is required" });
    }

    const results = await Clothes.find({
      name: { $regex: name, $options: "i" }, // case-insensitive
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
