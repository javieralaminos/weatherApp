import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale/en-GB';

import './App.css';
import TrpcProvider from './components/trpc';
import WeatherIngestion from './components/WeatherIgestion';
import TimeSeriesChart from './components/WeatherTimeSeries';

function App() {
  return (
    <>
      <TrpcProvider apiBaseUrl={'http://localhost:4000/trpc/'}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>

          <p>
            <WeatherIngestion />
          </p>
          <p>
            <TimeSeriesChart />
          </p>
        </LocalizationProvider>
      </TrpcProvider>
    </>

  );
}

export default App;
