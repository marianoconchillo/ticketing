import { NextPage } from "next";
import Link from "next/link";
import { ICurrentUser } from "@/interfaces/user";

interface Props {
  currentUser: ICurrentUser;
}

interface Links {
  label: string;
  href: string;
}

const Header: NextPage<Props> = ({ currentUser }) => {
  const links: (Links | false)[] = [
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders/" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ];

  return (
    <nav className="flex justify-between items-center py-8 px-10 bg-slate-50 shadow-sm">
      <Link href="/" className="text-xl tracking-wide text-teal-700">
        GitTix
      </Link>

      <div className="flex justify-end">
        <ul className="flex space-x-5">
          {links.map((link) => {
            return (
              link && (
                <li
                  key={link.href}
                  className="px-2 py-1.5 w-fit bg-teal-950 text-center text-white rounded"
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
