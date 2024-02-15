
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export interface BasicDateTimePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const BasicDateTimePicker = (props: BasicDateTimePickerProps) => {
  const { selectedDate, setSelectedDate } = props;

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };


  return <DateTimePicker
    label="Select Date and Time"
    value={selectedDate}
    onChange={handleDateChange}
  />;
};

export default BasicDateTimePicker;
