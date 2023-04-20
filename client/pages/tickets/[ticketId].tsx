import { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import Image from "next/image";
import buildClient from "@/api/build-client";
import purchase from "../../public/purchase.jpg";
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
    <div className="px-4 w-full mx-auto max-w-[1280px] flex justify-between items-center md:my-10">
      <div className="w-1/2 flex flex-col items-center space-y-5 px-4">
        <h1 className="text-3xl">You are about to buy a ticket for:</h1>
        <h3 className="text-2xl italic text-gray-800">{ticket.title}</h3>
        <h4 className="text-xl">
          Price: <span className="italic text-gray-800">${ticket.price}</span>
        </h4>
        {errors}
        <button
          className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500"
          onClick={() => doRequest()}
        >
          Purchase
        </button>
      </div>
      <div className="w-1/2">
        <Image
          src={purchase}
          alt="Purchase image"
          placeholder="blur"
          className="brightness-50 md:brightness-75 rounded"
        />
      </div>
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
