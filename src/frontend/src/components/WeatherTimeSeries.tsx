import { Button } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useState } from 'react';
import BasicMenu from './BasicMenu';
import BasicDateTimePicker from './DateTimePicker';
import { WeatherType } from './models';
import { trpc } from './trpc';

interface TimeSeriesData {
  timestamp: number;
  value: number;
}

const TimeSeriesChart: FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<TimeSeriesData[]>([]);
  const [weatherType, setWeatherType] = useState<string | null>(null);
  const { mutateAsync, isLoading } = trpc.getTimeSeries.useMutation();

  const handleQuery = async () => {
    if (startDate && endDate && weatherType) {
      const response = await mutateAsync({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        type: weatherType as WeatherType,
      });
      setData(response.timeSeries.map((d) => ({
        timestamp: new Date(d.datetime).getTime(),
        value: d.value,
      })));
    }
  };
  const options: Highcharts.Options = {
    title: {
      text: 'Time Series Chart',
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
        data: data.map((d) => [d.timestamp, d.value]),
      },
    ],
  };

  return (
    <>
      <h1>Results</h1>
      <BasicMenu items={Object.values(WeatherType)} title='Type' setResponse={setWeatherType} />
      <BasicDateTimePicker selectedDate={startDate} setSelectedDate={setStartDate} />
      <BasicDateTimePicker selectedDate={endDate} setSelectedDate={setEndDate} />
      <Button variant="contained" onClick={handleQuery}>
              Show
      </Button>
      {!isLoading && <HighchartsReact highcharts={Highcharts} options={options} />}
    </>);
};

export default TimeSeriesChart;