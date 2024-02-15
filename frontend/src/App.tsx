import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale/en-GB';

import './App.css';
import TrpcProvider from './components/trpc';
import WeatherIngestion from './components/WeatherIgestion';
import TimeSeriesChart from './components/WeatherTimeSeries';

const ApiEndpoint = '/trpc'; // API Gateway endpoint for local development change to http://localhost:4000/trpc

function App() {
  return (
    <TrpcProvider apiBaseUrl={ApiEndpoint}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <h1>Weather App</h1>
        <WeatherIngestion />
        <TimeSeriesChart />
      </LocalizationProvider>
    </TrpcProvider>
  );
}

export default App;
