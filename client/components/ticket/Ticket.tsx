import Link from "next/link";
import { ITicket } from "@/interfaces/ticket";

interface Props {
  ticket: ITicket;
}

const Ticket = ({ ticket }: Props) => {
  return (
    <div className="block rounded-lg bg-gray-100 p-6 shadow-lg min-h-max mb-5 w-[45%] md:w-[30%]">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
        {ticket.title}
      </h5>
      <p className="mb-4 text-base text-neutral-600 ">${ticket.price}</p>
      <Link
        href={`/tickets/${ticket.id}`}
        className="inline-block rounded bg-gradient-to-r from-purple-600 to-blue-600 px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase leading-normal"
      >
        View
      </Link>
    </div>
  );
};

export default Ticket;
