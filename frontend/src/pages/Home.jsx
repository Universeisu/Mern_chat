import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-xl mb-2"> User Online Now! </h2>
      <h2 className="text-xl mb-2"> {onlineUsers.length}</h2>
    </div>
  );
};

export default Home;
