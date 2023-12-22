import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';
import SiteList from '../types/siteList';

type Props = {
  label: string;
  site: SiteList[];
  handleSelect: (_event: SyntheticEvent<Element, Event>, newValue: SiteList | null) => void;
};

const OneSiteSelect = ({ label, site, handleSelect }: Props) => {
  return (
    <Autocomplete
      className="mr-4"
      disablePortal
      id="OneSite"
      options={site}
      onChange={handleSelect}
      getOptionLabel={(option) => `${option.siteId} - ${option.name}`}
      sx={{ width: 450 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default OneSiteSelect;
