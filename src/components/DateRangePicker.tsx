import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';
import { zhTW, enUS, ja } from 'date-fns/locale';
import { useAppSelector } from '@/store/hook';

type DateRangePickerProps = {
  className?: React.HTMLAttributes<HTMLDivElement>;
  handleSelectDate: (dateFrom: Date | undefined, dateTo: Date | undefined) => void;
  handleDateUpdate: () => void;
};

type LanguageDict = {
  [key: string]: Locale;
};

const DateRangePicker = ({
  className,
  handleSelectDate,
  handleDateUpdate,
}: DateRangePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const language = useAppSelector((state) => state.auth.theme);

  const languageDict: LanguageDict = {
    zhTW: zhTW,
    enUS: enUS,
    jaJP: ja,
    default: zhTW,
  };

  const selectLanguage = languageDict[language];

  const currentYear = new Date().getFullYear();
  const today = new Date();

  // date > today can't be selected
  const isDateDisable = (date: Date) => {
    return date > today;
  };

  const handleDateRange = (range: string) => {
    switch (range) {
      case 'today':
        setDate({
          from: new Date(),
          to: new Date(),
        });
        break;

      case 'past7Days':
        setDate({
          from: subDays(new Date(), 6),
          to: new Date(),
        });
        break;

      default:
        setDate(undefined);
    }
  };

  const getDateFormat = (language: string) => {
    switch (language) {
      case 'zhTW':
        return 'yyyy年 LL月 dd日';
      case 'jaJP':
        return 'yyyy年 LL月 dd日';
      case 'enUS':
        return 'LLL dd, y';
      default:
        return 'yyyy年 LL月 dd日';
    }
  };

  const getPickADateText = (language: string) => {
    switch (language) {
      case 'zhTW':
        return '選擇日期';
      case 'jaJP':
        return '日付を選択';
      case 'enUS':
        return 'Pick a date';
      default:
        return '選擇日期';
    }
  };

  useEffect(() => {
    handleSelectDate(date?.from, date?.to);
  }, [date, handleSelectDate]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] h-[55px] justify-start text-left font-normal border-gray-400',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, getDateFormat(language))} -{' '}
                  {format(date.to, getDateFormat(language))}
                  {/* {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')} */}
                </>
              ) : (
                format(date.from, getDateFormat(language))
              )
            ) : (
              <span>{getPickADateText(language)}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="grid grid-flow-col gap-4 w-1/2 mt-4">
            <Button
              variant={'outline'}
              className="ml-4"
              onClick={() => handleDateRange('past7Days')}
            >
              Last 7 days
            </Button>

            <Button variant={'outline'} onClick={() => handleDateRange('today')}>
              Today
            </Button>
          </div>

          <Calendar
            locale={selectLanguage}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            toMonth={today}
            disabled={(date) => isDateDisable(date)}
            fromYear={currentYear}
          />

          <div className="w-full flex justify-end">
            <PopoverClose
              className="mb-4 mr-4 px-3 py-2  rounded-md bg-black text-white hover:bg-gray-800"
              onClick={handleDateUpdate}
            >
              Update
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
