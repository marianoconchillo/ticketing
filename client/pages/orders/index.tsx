import buildClient from "@/api/build-client";
import { IOrder } from "@/interfaces/order";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  orders: IOrder[];
}

const OrderIndex: NextPage<Props> = ({ orders }: Props) => {
  return (
    <div className="w-full max-w-screen-md px-4 container mx-auto">
      <h2 className="text-2xl text-slate-900 mb-5">Your orders</h2>
      <table className="w-full text-left mx-auto">
        <thead className="border-b-4 text-lg text-slate-950">
          <tr>
            <th>Ticket</th>
            <th className="text-center">Price</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody className="font-light">
          {orders.map((order) => {
            return (
              <tr key={order.id} className="border-b-2 border-gray-100">
                <td className="py-1">{order.ticket.title}</td>
                <td className="py-1 text-center">${order.ticket.price}</td>
                <td className="py-1 text-center">{order.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = buildClient(ctx);
  const { data } = await client.get<IOrder>("/api/orders");

  return { props: { orders: data } };
};

export default OrderIndex;
