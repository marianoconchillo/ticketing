import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@mcticketingapp/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
