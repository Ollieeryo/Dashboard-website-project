import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

type Option = {
  options: { label: string | number }[];
};

type Props = {
  label: string;
  placeholder: string;
  options: { label: string | number }[];
  handleSelect: (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: Option['options'][0] | null,
  ) => void;
};

export default function SelectGatewayId({ label, placeholder, options, handleSelect }: Props) {
  const [disabled, setDisable] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // force re-render when option change
    setKey((prevKey) => prevKey + 1);
    // handle option disable
    if (options) {
      if (options[0].label.toString().includes('No')) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [options]);

  return (
    <Autocomplete
      key={key}
      disabled={disabled}
      disablePortal
      id="GatewayId"
      onChange={handleSelect}
      options={options}
      getOptionLabel={(option) => option.label.toString()}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  );
}
