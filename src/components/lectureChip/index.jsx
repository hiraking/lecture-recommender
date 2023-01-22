const { Grid, Typography, IconButton } = require("@mui/material");
import CancelIcon from "@mui/icons-material/Cancel";
import { useCallback } from "react";

export const LectureChip = (props) => {
  const { id, title, lecturer, removeLecture } = props;

  const handleClick = useCallback(
    (id) => {
      removeLecture(id);
    },
    [removeLecture]
  );

  return (
    <div className="lecture-chip">
      <Grid container spacing={0} className="lecture-chip-container">
        <Grid item xs={8} className="lecture-chip-title">
          <Typography
            variant="subtitle1"
            align="left"
            className="lecture-chip-title-text"
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4} className="lecture-chip-lecturer">
          <Typography
            variant="subtitle1"
            className="lecture-chip-title-text"
            align="right"
          >
            {lecturer}
          </Typography>
        </Grid>
      </Grid>
      <div className="lecture-chip-delete">
        <IconButton aria-label="delete" onClick={() => handleClick(id)}>
          <CancelIcon className="lecture-chip-delete-btn" />
        </IconButton>
      </div>
    </div>
  );
};
