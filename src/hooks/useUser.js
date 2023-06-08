import { useMutation, useQuery } from "react-query";
import { client } from "../utils/clients";

const addUser = (group) => {
  return client.post("/api/groups/add-group", group);
};

export const useAddUser = () => {
  return useMutation(addUser, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
