import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import { setEtlStartAndEndTime } from '@/features/data/etlDataSlice';

type Props = {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  setStartTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setEndTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
};

const TimeRangePicker = ({ startTime, endTime, setStartTime, setEndTime }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (startTime && endTime !== null) {
      const data = {
        etlStartTime: startTime?.format('HH:mm'),
        etlEndTime: endTime?.format('HH:mm'),
      };
      dispatch(setEtlStartAndEndTime(data));
    }
  }, [dispatch, endTime, startTime]);

  return (
    <div className="ml-4">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid grid-flow-col gap-4">
          <TimePicker
            className="w-[150px]"
            label="Start"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
          />
          <TimePicker
            className="w-[150px]"
            label="End"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default TimeRangePicker;
