import { Schema, model, Model, Document } from "mongoose";

// Describes the properties that are required to create a new Ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// Describers the properties that a Ticket Document has
interface TicketDoc extends Document {
  title: string;
  price: number;
  userId: string;
}

// Describes the properties that a Ticket Model has
interface TicketModel extends Model<TicketDoc> {
  build: (attrs: TicketAttrs) => TicketDoc;
}

const ticketSchema = new Schema<TicketAttrs>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
