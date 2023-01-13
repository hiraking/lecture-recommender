const { Grid, Typography, IconButton } = require("@mui/material");
import CancelIcon from "@mui/icons-material/Cancel";
import { useCallback, useContext, useMemo } from "react";

export const LectureChip = (props) => {
  const { id, title, lecturer, removeLecture } = props;
  const textStyles = useMemo(() => {
    return {
      lineHeight: "40px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    };
  }, []);

  const handleClick = useCallback(
    (id) => {
      removeLecture(id);
    },
    [removeLecture]
  );

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#164152",
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "5px",
        borderRadius: "20px",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          padding: "0",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            borderRight: "2px solid white",
            padding: "0 10px",
          }}
        >
          <Typography variant="subtitle1" sx={textStyles} align="left">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "10px", paddingRight: "5px" }}>
          <Typography variant="subtitle1" sx={textStyles} align="right">
            {lecturer}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ width: "50px" }}>
        <IconButton aria-label="delete" onClick={() => handleClick(id)}>
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
};
