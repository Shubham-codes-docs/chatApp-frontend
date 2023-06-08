import { useContext } from "react";
import { useQuery } from "react-query";
import { client } from "../utils/clients";
import AuthContext from "../store/AuthContext";

const getUsers = () => {
  return client.get("/api/auth/get-users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const useGetUsers = () => {
  return useQuery(["get-contacts"], getUsers, {
    staleTime: 1000 * 60 * 1,
  });
};
