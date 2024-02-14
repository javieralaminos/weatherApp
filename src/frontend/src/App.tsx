import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale/en-GB';

import './App.css';
import WeatherIngestion from './components/WeatherIgestion';

function App() {
  return (
    <>
      {/* <TrpcProvider dashboardApiBaseUrl={envConfig.dashboardApiBaseUrl}> */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>


        <WeatherIngestion />
      </LocalizationProvider>
      {/* </TrpcProvider> */}
    </>

  );
}

export default App;
