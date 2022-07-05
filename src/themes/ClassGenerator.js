import { makeStyles } from "@mui/styles";

export const padding = (pad) => {
  const padding = makeStyles({
    root: {
      padding: pad,
    },
  });

  return padding();
};
