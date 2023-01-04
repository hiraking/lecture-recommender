import Head from "next/head";
import { useEffect, useState } from "react";
import { Header } from "src/components/header";

const Test = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <Header />
      <div>
        <h1>test</h1>
      </div>
      <div>
        <ul>
          {users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Test;
