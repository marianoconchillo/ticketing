import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@mcticketingapp/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
