import razorpay from "../config/razorpay.js";
import paymentModel from "../Model/payment.model.js";

export default addPayment = async (req,res)=>{
   try {
         const{userId , amount, description} = req.body;
         if(!userId || !amount){
            return res.status(400).json({
                success: false,
        message: "userId and amount are required", 
            })
         }
const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { description },
    };

    const order = await  razorpay.orders.create(options)
      const payment = await paymentModel.create({
      userId,
      amount,
      currency: "INR",
      status: "PENDING",
      provider: "RAZORPAY",
      orderId: order.id,
      receipt: order.receipt,
      description,
    });
     return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      payment,
    });


   } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
   }
}