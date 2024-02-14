import { Button } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useState } from 'react';
import BasicDateTimePicker from './DateTimePicker';
import { WeatherType } from './models';
import { trpc } from './trpc';

interface TimeSeriesDataResponse {
  [WeatherType.temperature]: [number, number][];
  [WeatherType.humidity]: [number, number][];
  [WeatherType.pressure]: [number, number][];
}

const TimeSeriesChart: FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<TimeSeriesDataResponse>({ temperature: [], humidity: [], pressure: [] });
  const { mutateAsync, isLoading } = trpc.getTimeSeries.useMutation();

  const handleQuery = async () => {
    if (startDate && endDate) {
      const props = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      const response = await Promise.all([
        mutateAsync({ ...props, type: WeatherType.temperature }),
        mutateAsync({ ...props, type: WeatherType.humidity }),
        mutateAsync({ ...props, type: WeatherType.pressure }),
      ]);
      setData({
        temperature: response[0].timeSeries.map((d) => ([new Date(d.datetime).getTime(), d.value])),
        humidity: response[1].timeSeries.map((d) => ([new Date(d.datetime).getTime(), d.value])),
        pressure: response[2].timeSeries.map((d) => ([new Date(d.datetime).getTime(), d.value])),
      });
    }
  };
  const options: Highcharts.Options = {
    title: {
      text: 'Chart',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    series: [
      {
        type: 'line',
        data: data.temperature,
        name: 'Temperature',
      },
      {
        type: 'line',
        data: data.humidity,
        name: 'Humidity',
      },
      {
        type: 'line',
        data: data.pressure,
        name: 'Pressure',
      },
    ],
  };

  return (
    <>
      <h2>Results</h2>
      <BasicDateTimePicker selectedDate={startDate} setSelectedDate={setStartDate} />
      <BasicDateTimePicker selectedDate={endDate} setSelectedDate={setEndDate} />
      <Button variant="contained" onClick={handleQuery}>
              Show
      </Button>
      {!isLoading && <HighchartsReact highcharts={Highcharts} options={options} />}
    </>);
};

export default TimeSeriesChart;