
import { Button, TextField } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import BasicSelect from './BasicSelect';
import BasicDateTimePicker from './DateTimePicker';
import { WeatherType } from './models';
import { trpc } from './trpc';

const WeatherIngestion: FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weatherValue, setWeatherValue] = useState<number | null>(null);
  const [weatherType, setWeatherType] = useState<string | null>(null);
  const { mutateAsync } = trpc.setWeather.useMutation();

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
    <div>
      <h2>Weather Ingestion</h2>
      <BasicSelect values={Object.values(WeatherType)} title='Type' setResponse={setWeatherType} />
      <BasicDateTimePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TextField
        label={weatherType || ''}
        type="number"
        inputMode="numeric"
        value={weatherValue}
        onChange={(event) => {
          const inputValue = Number(event.target.value);
          setWeatherValue(inputValue);
        }}
      />
      <Button variant="contained" onClick={handleIngestion} disabled={!selectedDate || !weatherValue || !weatherType}>
              Ingest
      </Button>
    </div>
  );
};

export default WeatherIngestion;
