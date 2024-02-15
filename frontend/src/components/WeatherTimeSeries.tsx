import { Button } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useEffect, useState } from 'react';
import BasicSelect from './BasicSelect';
import BasicDateTimePicker from './DateTimePicker';
import { AverageType, WeatherType } from './models';
import { trpc } from './trpc';

interface TimeSeriesDataResponse {
  [WeatherType.temperature]: [number, number][];
  [WeatherType.humidity]: [number, number][];
  [WeatherType.pressure]: [number, number][];
}

const TimeSeriesChart: FC = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const [startDate, setStartDate] = useState<Date>(currentDate);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [averageType, setAverageType] = useState<string>(AverageType.daily);
  const [data, setData] = useState<TimeSeriesDataResponse>({ temperature: [], humidity: [], pressure: [] });
  const { mutateAsync } = trpc.getTimeSeries.useMutation();

  useEffect
  (() => {
    void handleQuery();
  }, []);

  const handleQuery = async () => {
    if (averageType) {
      const props = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        averageType: averageType as AverageType,
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
    <div style={ { minWidth: '800px' }}>
      <h2>Results</h2>
      <BasicSelect values={Object.values(AverageType)} title='Average' setResponse={setAverageType} />
      <BasicDateTimePicker selectedDate={startDate} setSelectedDate={setStartDate} />
      <BasicDateTimePicker selectedDate={endDate} setSelectedDate={setEndDate} />
      <Button variant="contained" onClick={handleQuery} disabled={!startDate || !endDate || !averageType}>
              Show
      </Button>
      {<HighchartsReact highcharts={Highcharts} options={options} />}
    </div>);
};

export default TimeSeriesChart;