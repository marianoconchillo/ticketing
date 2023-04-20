import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { Link as LinkScroll } from "react-scroll";
import background from "../public/background.jpg";
import buildClient from "@/api/build-client";
import { ITicket } from "@/interfaces/ticket";
import Ticket from "@/components/ticket/Ticket";

interface Props {
  tickets: ITicket[];
}

const HomePage: NextPage<Props> = ({ tickets }) => {
  return (
    <div className="flex flex-col space-y-10 h-full">
      <div className="relative md:static md:flex justify-between items-center md:my-10 lg:px-5">
        <div className="z-10 w-2/3 absolute left-5 text-white flex flex-col space-y-5 translate-y-1/2 md:translate-y-0 md:static md:flex-2 md:flex md:flex-col md:items-center md:px-2 md:flex-1 lg:flex-2">
          <div className="md:bg-gradient-to-r md:from-cyan-500 md:to-blue-500 md:p-5 lg:w-3/4 rounded-lg">
            <h1 className="text-xl font-bold tracking-wider md:text-3xl ">
              The cheapest tickets on the internet
            </h1>
            <p className="text-sm font-medium mt-2 md:text-base">
              Sell or buy tickets. Zero hidden service fees. Because it should
              be this easy.
            </p>
          </div>
          <LinkScroll to="tickets-section" smooth={true} duration={600}>
            <button
              type="button"
              className="w-1/2 px-4 py-1.5 font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full  md:w-full"
            >
              Discover
            </button>
          </LinkScroll>
        </div>

        <div className="-z-10 md:flex-1">
          <Image
            src={background}
            alt="Background image"
            placeholder="blur"
            className="brightness-50 md:brightness-75 rounded"
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5">
        <h1 className="text-gray-800 text-3xl">Tickets</h1>
        <span className="w-1/2 border border-gray-300 rounded-full" />
      </div>

      <section
        id="tickets-section"
        className="px-4 w-full mx-auto max-w-[1280px] flex flex-wrap justify-between"
      >
        {tickets.map((ticket) => {
          return <Ticket ticket={ticket} key={ticket.id} />;
        })}
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/tickets");
  return { props: { tickets: data } };
};

export default HomePage;
