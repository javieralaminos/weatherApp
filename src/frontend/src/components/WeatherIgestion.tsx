
import { Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FunctionComponent, useState } from 'react';
import BasicMenu from './BasicMenu';
import { WeatherType } from './models';
import trpc from './trpc';

const WeatherIngestion: FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weatherValue, setWeatherValue] = useState<number | null>(null);
  const [weatherType, setWeatherType] = useState<string | null>(null);
  const { mutateAsync } = trpc.setWeather.useMutation();
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWeatherValue(value ? parseInt(value) : null);
  };

  const handleIngestion = async () => {
    console.log('Ingesting', selectedDate, weatherValue, weatherType);
    // await mutateAsync({
    //   date: selectedDate?.toISOString(),
    //   value: weatherValue,
    //   type: weatherType,
    // });
  };

  return (
    <>
      <h1>Weather Ingestion</h1>
      <DateTimePicker
        label="Select Date and Time"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <TextField
        label="Temperature"
        type="number"
        value={weatherValue}
        onChange={handleTemperatureChange}
      />
      <BasicMenu items={Object.values(WeatherType)} title='Type' setResponse={setWeatherType} />
      <Button variant="contained" onClick={handleIngestion}>
              Ingest
      </Button>
    </>
  );
};

export default WeatherIngestion;
