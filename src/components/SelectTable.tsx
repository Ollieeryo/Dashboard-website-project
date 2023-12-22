import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';

type options = { label: string; description: string; gatewayId: number }[];

type Props = {
  label: string;
  placeholder: string;
  options: options;
  handleSelect: (_event: SyntheticEvent<Element, Event>, newValue: options[0] | null) => void;
  disable: boolean;
  key: number;
};

export default function SelectTable({
  label,
  placeholder,
  options,
  handleSelect,
  disable,
  key,
}: Props) {
  return (
    <Autocomplete
      key={key}
      disabled={disable}
      className="mr-4"
      id="Devices"
      disablePortal
      onChange={handleSelect}
      options={options}
      getOptionLabel={(option) => `${option.description} - ${option.label.toLowerCase()}`}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  );
}
