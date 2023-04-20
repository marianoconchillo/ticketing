import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { IOrder } from "@/interfaces/order";
import buildClient from "@/api/build-client";
import { ICurrentUser } from "@/interfaces/user";
import CheckoutForm from "@/components/order/CheckoutForm";
import Link from "next/link";

interface Props {
  order: IOrder;
  currentUser: ICurrentUser;
}

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

const OrderShow: NextPage<Props> = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - Date.now();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="container flex flex-col items-center space-y-5">
      {timeLeft >= 0 ? (
        <>
          <p className="italic">
            {timeLeft >= 0 && `Time to pay: ${timeLeft}`}
          </p>

          <Elements stripe={stripePromise}>
            <CheckoutForm orderId={order.id} />
          </Elements>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-red-700">Order Expired</h2>
          <Link href={`/`}>
            <button
              type="submit"
              className="px-3 py-1.5 rounded text-white font-bold bg-indigo-500"
            >
              See Tickets
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { orderId } = ctx.query;
  const client = buildClient(ctx);

  const { data } = await client.get<IOrder>(`/api/orders/${orderId}`);

  return { props: { order: data } };
};

export default OrderShow;
