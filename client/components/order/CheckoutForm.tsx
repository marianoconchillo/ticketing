import { useState } from "react";
import Router from "next/router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useRequest from "@/hooks/useRequest";
import Loading from "../ui/Loading";

interface Props {
  orderId: string;
}

const CheckoutForm = ({ orderId }: Props) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [processingErrors, setProcessingErrors] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId,
    },
    onSuccess: () => Router.push("/orders"),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setProcessing(true);
    setProcessingErrors("");

    const card = elements?.getElement(CardElement);

    if (!stripe || !card) {
      setProcessing(false);
      return;
    }

    const result = await stripe.createToken(card);

    if (result.error) {
      setProcessingErrors(result.error.message || "An error has occurred");
    } else {
      await doRequest({ token: result.token.id });
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container border rounded-sm max-w-sm p-3 flex flex-col space-y-5"
    >
      <p className="font-medium text-slate-900">Card Details</p>
      <CardElement />

      <button
        type="submit"
        className="w-full py-1.5 rounded text-white font-bold bg-indigo-500"
        disabled={!stripe}
      >
        {processing ? <Loading /> : `Pay With Card`}
      </button>
      {errors}
      {processingErrors}
    </form>
  );
};

export default CheckoutForm;
