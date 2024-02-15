import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

export interface BasicSelectProps {
  title: string;
  values: string[];
  setResponse: Dispatch<SetStateAction<string | null>>;
}

export default function BasicSelect(props: BasicSelectProps) {
  const [averageType, setAverageType] = useState<string>('');


  const handleChange = (event: SelectChangeEvent) => {
    setAverageType(event.target.value as string);
    props.setResponse(event.target.value as string);
  };

  return (
    < >
      <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
        <InputLabel id="average-simple-select-label">{props.title}</InputLabel>
        <Select
          labelId="average-simple-select-label"
          id="average-simple-select"
          value={averageType}
          label="Average"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.values.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

}