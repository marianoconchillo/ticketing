import { useState } from "react";
import { NextPage } from "next";
import Router from "next/router";
import useRequest from "@/hooks/useRequest";
import Loading from "@/components/ui/Loading";

const NewTicket: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: () => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await doRequest();
    setIsLoading(false);
  };

  return (
    <form
      className="p-4 mx-auto border border-gray-200 rounded-md flex flex-col space-y-5 w-3/4 md:w-1/2 lg:w-1/3 "
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl text-center">Create a Ticket</h1>
      <label className="flex flex-col space-y-2" htmlFor="title-input">
        <span className="block">Title</span>
        <input
          type="text"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-sm focus:outline-none px-2 py-1"
        />
      </label>
      <label className="flex flex-col space-y-2" htmlFor="price-input">
        <span className="block">Price</span>
        <input
          type="number"
          id="price-input"
          onBlur={onBlur}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded-sm focus:outline-none px-2 py-1"
        />
      </label>
      {errors}
      <button
        type="submit"
        className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500 self-center"
      >
        {isLoading ? <Loading /> : `Submit`}
      </button>
    </form>
  );
};

export default NewTicket;
