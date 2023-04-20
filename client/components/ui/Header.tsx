import { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ICurrentUser } from "@/interfaces/user";

interface Props {
  currentUser: ICurrentUser;
}

interface Links {
  label: string;
  href: string;
}

const Header: NextPage<Props> = ({ currentUser }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const links: (Links | false)[] = [
    !currentUser && { label: "SIGN IN", href: "/auth/signin" },
    !currentUser && { label: "SIGN UP", href: "/auth/signup" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders/" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ];

  const renderLinks = () => {
    return links.map((link) => {
      return (
        link && (
          <li
            key={link.href}
            className={`px-4 py-2 font-medium text-gray-600 hover:text-gray-900 transition duration-150 ease-out hover:ease-in ${
              link.href === activeLink && `border-b-2`
            }`}
          >
            <Link
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setShowMenu(false);
              }}
            >
              {link.label}
            </Link>
          </li>
        )
      );
    });
  };

  return (
    <nav className="h-24 w-full px-4 shadow-sm">
      <div className="flex justify-between items-center max-w-[1280px] h-full mx-auto">
        <Link href="/" onClick={() => setActiveLink("")}>
          <Image
            src="/ticketing.png"
            alt="Ticketing logo"
            priority
            width={80}
            height={80}
          />
        </Link>
        <div
          className="inline-block w-5 cursor-pointer md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FontAwesomeIcon icon={!showMenu ? faBars : faXmark} size="lg" />
        </div>

        {/* Mobile Header */}
        <ul
          className={
            showMenu
              ? `z-20 flex flex-col items-center py-4 bg-slate-50 fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-100 ease-in-out duration-500 md:hidden`
              : `ease-in-out duration-500 fixed left-[-100%]`
          }
        >
          {renderLinks()}
        </ul>

        {/* Desktop Header */}
        <ul className="hidden md:flex space-x-5">{renderLinks()}</ul>
      </div>
    </nav>
  );
};

export default Header;
