import buildClient from "@/api/build-client";
import { IOrder } from "@/interfaces/order";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  orders: IOrder[];
}

const OrderIndex: NextPage<Props> = ({ orders }: Props) => {
  return (
    <ul>
      {orders.map((order: IOrder) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = buildClient(ctx);
  const { data } = await client.get<IOrder>("/api/orders");

  return { props: { orders: data } };
};

export default OrderIndex;
