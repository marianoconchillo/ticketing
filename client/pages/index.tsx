import buildClient from "@/api/build-client";
import { ITicket } from "@/interfaces/ticket";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

interface Props {
  tickets: ITicket[];
}

const HomePage: NextPage<Props> = ({ tickets }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-3xl">Tickets</h1>
      <table className="table-auto text-left font-light">
        <thead className="border-b-2 border-t-2 font-medium">
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Price</th>
            <th className="py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            return (
              <tr key={ticket.id} className="border-b">
                <td className="py-2">{ticket.title}</td>
                <td className="py-2">{ticket.price}</td>
                <td>
                  <Link
                    href={`/tickets/${ticket.id}`}
                    className="tracking-wide text-teal-700"
                  >
                    View
                  </Link>
                </td>
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
  const { data } = await client.get("/api/tickets");
  return { props: { tickets: data } };
};

export default HomePage;
