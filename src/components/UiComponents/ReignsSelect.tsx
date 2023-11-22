import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  OutlinedInput,
  ListItemIcon,
  SxProps,
} from "@mui/material";

interface ReignsSelectProps {
  items: string[];
  label: string;
  sx?: SxProps;
  onChange: (selected: any) => void;
  multiple?: boolean;
  full?: boolean;
}

const ReignsSelect: React.FC<ReignsSelectProps> = ({
  items = ["item 1", "item 2", "item 3"],
  label,
  sx = {},
  onChange,
  multiple,
  full = true,
}) => {
  // handle multiselect
  const [selected, setSelected] = useState<string[]>([]);

  const handleMultiChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === items.length ? [] : items);
      return;
    }
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  //   handle single select
  const [value, setValue] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  useEffect(() => {
    multiple ? onChange(selected) : onChange(value);
  }, [selected, value]);

  return multiple ? (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={sx}
        multiple
        fullWidth={full}
        value={selected}
        onChange={handleMultiChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected.length == items.length ? "All" : selected.join(", ")
        }
      >
        <MenuItem value="all">
          <ListItemIcon>
            <Checkbox
              checked={items.length > 0 && selected.length === items.length}
              indeterminate={
                selected.length > 0 && selected.length < items.length
              }
            />
          </ListItemIcon>
          <ListItemText primary="Select All" />
        </MenuItem>
        {items.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox size="small" checked={selected.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={sx}
        fullWidth={full}
        label={label}
        onChange={handleChange}
        value={value}
      >
        {items.map((name) => (
          <MenuItem key={name} value={name}>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReignsSelect;
