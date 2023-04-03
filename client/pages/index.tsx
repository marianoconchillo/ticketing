import { ICurrentUser } from "@/interfaces/user";
import { NextPage } from "next";

interface Props {
  currentUser: ICurrentUser;
}

const HomePage: NextPage<Props> = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are sign in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

export default HomePage;
