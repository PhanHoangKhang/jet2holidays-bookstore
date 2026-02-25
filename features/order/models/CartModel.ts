import mongoose, { Model, Schema, Types } from "mongoose";

export interface CartItem {
  bookId: string
  quantity: number
}

interface Cart {
    userId: Types.ObjectId
    items: CartItem[]
}

const CartSchema = new Schema<Cart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        items: [
            {
                bookId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Book',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            }
        ]
    },
    {timestamps: true}
)

const Cart: Model<Cart> = mongoose.models.Cart ||
  mongoose.model<Cart>("Cart", CartSchema);

export default Cart