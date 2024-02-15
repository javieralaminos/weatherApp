import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './App.css';
import TrpcProvider from './components/trpc';
import WeatherIngestion from './components/WeatherIgestion';
import TimeSeriesChart from './components/WeatherTimeSeries';

function App() {
  return (
    <TrpcProvider apiBaseUrl={'/trpc'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Weather App</h1>
        <WeatherIngestion />
        <TimeSeriesChart />
      </LocalizationProvider>
    </TrpcProvider>
  );
}

export default App;
