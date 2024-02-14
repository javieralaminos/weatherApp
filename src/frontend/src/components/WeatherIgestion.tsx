
import { Button, TextField } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import BasicMenu from './BasicMenu';
import BasicDateTimePicker from './DateTimePicker';
import { WeatherType } from './models';
import { trpc } from './trpc';

const WeatherIngestion: FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weatherValue, setWeatherValue] = useState<number | null>(null);
  const [weatherType, setWeatherType] = useState<string | null>(null);
  const { mutateAsync } = trpc.setWeather.useMutation();

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWeatherValue(value ? parseInt(value) : null);
  };

  const handleIngestion = async () => {
    if (selectedDate && weatherValue && weatherType) {
      await mutateAsync({
        datetime: selectedDate.toISOString(),
        value: weatherValue,
        type: weatherType as WeatherType,
      });
    }
  };

  return (
    <>
      <h1>Weather Ingestion</h1>
      <BasicMenu items={Object.values(WeatherType)} title='Type' setResponse={setWeatherType} />
      <BasicDateTimePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TextField
        label={weatherType || ''}
        type="number"
        value={weatherValue}
        onChange={handleTemperatureChange}
      />
      <Button variant="contained" onClick={handleIngestion}>
              Ingest
      </Button>
    </>
  );
};

export default WeatherIngestion;
