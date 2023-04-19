import { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import buildClient from "@/api/build-client";
import useRequest from "@/hooks/useRequest";
import { ITicket } from "@/interfaces/ticket";
import { IOrder } from "@/interfaces/order";

interface Props {
  ticket: ITicket;
}

const TicketShow: NextPage<Props> = ({ ticket }) => {
  const { doRequest, errors } = useRequest<{ ticketId: string }, IOrder>({
    url: "/api/orders",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess(data) {
      data && Router.push(`/orders/${data.id}`);
    },
  });

  return (
    <div>
      <h1 className="text-3xl">{ticket.title}</h1>
      <h4 className="text-xl">Price: {ticket.price}</h4>
      {errors}
      <button
        className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500"
        onClick={() => doRequest()}
      >
        Purchase
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ticketId } = ctx.query;
  const client = buildClient(ctx);

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { props: { ticket: data } };
};

export default TicketShow;
