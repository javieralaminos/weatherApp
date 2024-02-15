import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale/en-GB';

import './App.css';
import TrpcProvider from './components/trpc';
import WeatherIngestion from './components/WeatherIgestion';
import TimeSeriesChart from './components/WeatherTimeSeries';

const ApiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/trpc' : '/trpc';

function App() {
  return (
    <TrpcProvider apiBaseUrl={ApiEndpoint}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <div style={{
          flex: 1,
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px',
        }}>
          <h1>Weather App</h1>
          <WeatherIngestion />
          <TimeSeriesChart />
        </div>
      </LocalizationProvider>
    </TrpcProvider>
  );
}

export default App;
