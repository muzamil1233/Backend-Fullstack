import mongoose from "mongoose";
import BagModel from "../Model/Bag.model.js"
import ProductModel from "../Model/Product.model.js";









export const AddBag = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity = 1, size = null, color = null } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ msg: "userId and productId are required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    console.log("🔍 Checking existing item using:", {
      userId: userObjectId,
      productId: productObjectId,
      size,
      color,
    });

    // ✅ Find existing item with same (product + size + color)
    const existingItem = await BagModel.findOne({
      userId: userObjectId,
      productId: productObjectId,
      size,
      color,
    });

    if (existingItem) {
      // console.log("✨ Item exists → updating quantity");

      existingItem.quantity += quantity;
      await existingItem.save();

      return res.status(200).json({
        message: "Quantity updated",
        item: existingItem,
      });
    }

    console.log("🆕 Creating new bag item");

    // ❗ Create new document if no match found
    const newItem = await BagModel.create({
      userId: userObjectId,
      productId: productObjectId,
      quantity,
      size,
      color,
      addedAt: new Date(),
    });

    return res.status(201).json({
      message: "Item added to bag",
      item: newItem,
    });

  } catch (error) {
    console.error("❌ Error adding to bag:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};







export const GetBagCount = async (req, res) => {
  try {
    const userId = req.user?.userId;
    // console.log("🔍 userId from authorize →", userId);


    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const count = await BagModel.countDocuments({ userId: userObjectId });

    // console.log("🧮 Count returned:", count);

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching bag count:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const GetBag = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const items = await BagModel.find({ userId: userObjectId })
      .populate("productId", "name price image")
      .sort({ addedAt: -1 });

    res.status(200).json({
      message: "Bag items fetched successfully",
      items,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching bag",
      error: error.message,
    });
  }
};





export const UpdateBagItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const updatedItem = await BagModel.findByIdAndUpdate(
      itemId,
      { quantity },
      { new: true } // return updated document
    ).populate("productId", "name price image");

    if (!updatedItem) {
      return res.status(404).json({ message: "Bag item not found" });
    }

    res.status(200).json({
      message: "Bag item quantity updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating bag item:", error);
    res.status(500).json({
      message: "Server error while updating bag item",
      error: error.message,
    });
  }
};




export const bagPatch =async (req,res)=>{
  try {
         const {itemId} = req.params ;
         const updatedData = req.body;

         const updatedItem = await BagModel.findByIdAndUpdate(
          itemId,
          updatedData,
          {new : true},
         ).populate("productId", "name price image");

         if(!updatedItem){
          res.status(404).json({msg :"bag item nit found "})
         }
          res.status(200).json({
      message: "Bag item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error patching bag item:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}




export const DeleteBagItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedItem = await BagModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Bag item not found" });
    }

    res.status(200).json({ message: "Item removed from bag successfully" });
  } catch (error) {
    console.error("Error deleting bag item:", error);
    res.status(500).json({
      message: "Server error while deleting bag item",
      error: error.message,
    });
  }
};

