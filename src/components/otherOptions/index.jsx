import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";

export const OtherOptions = (props) => {
  const { stateArray, setStateArray, header, itemList } = props;

  const selectAll = useCallback(() => {
    setStateArray(
      Array(10)
        .fill()
        .map((_, i) => i + 1)
    );
  }, [setStateArray]);

  const unselectAll = useCallback(() => {
    setStateArray([]);
  }, [setStateArray]);

  const handleChange = useCallback(
    (id) => {
      if (stateArray.includes(id)) {
        setStateArray((prevArray) => prevArray.filter((i) => i !== id));
      } else {
        setStateArray((prevArray) => [...prevArray, id]);
      }
    },
    [stateArray, setStateArray]
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" sx={{ marginRight: "30px" }}>
          {header}
        </Typography>
        <div>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: "20px" }}
            onClick={selectAll}
          >
            全て選択
          </Button>
          <Button variant="contained" size="small" onClick={unselectAll}>
            全て解除
          </Button>
        </div>
      </Box>

      <Box>
        <FormGroup
          sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {itemList.slice(1).map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    value={item.id}
                    onChange={() => handleChange(item.id)}
                    checked={stateArray.includes(item.id)}
                  />
                }
                label={item.name}
                sx={{ width: "25%", margin: 0 }}
              />
            );
          })}
        </FormGroup>
      </Box>
    </div>
  );
};
