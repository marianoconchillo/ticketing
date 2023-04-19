import { NextPage } from "next";
import useRequest from "@/hooks/useRequest";
import Router from "next/router";
import { useState } from "react";

const NewTicket: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");

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
    await doRequest();
  };

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
      <h1 className="text-3xl">Create a Ticket</h1>
      <label className="block" htmlFor="title-input">
        <span className="block">Title</span>
        <input
          type="text"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md focus:outline-none px-2"
        />
      </label>
      <label className="block" htmlFor="price-input">
        <span className="block">Price</span>
        <input
          type="number"
          id="price-input"
          onBlur={onBlur}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded-md focus:outline-none px-2"
        />
      </label>
      {errors}
      <button
        type="submit"
        className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default NewTicket;
