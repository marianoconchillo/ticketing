import { OrderStatus } from "@mcticketingapp/common";
import { Document, Model, Schema, model } from "mongoose";

interface OrderAttrs {
  id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderDoc extends Document {
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderModel extends Model<OrderDoc> {
  build: (attrs: OrderAttrs) => OrderDoc;
}

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");

orderSchema.pre("save", function (done) {
  this.$where = {
    version: this.get("version") - 1,
  };
  done();
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
