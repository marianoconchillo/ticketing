import { Publisher, OrderCreatedEvent, Subjects } from "@mcticketingapp/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
