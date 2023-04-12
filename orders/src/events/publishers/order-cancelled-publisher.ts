import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@mcticketingapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
