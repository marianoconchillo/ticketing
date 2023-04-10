import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@mcticketingapp/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
