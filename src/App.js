import './App.css';
import { Map, Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoidml0b3JmYWlsIiwiYSI6ImNsOHhyajNjYjA4aXIzdW56ZDN1NjI0ZjUifQ.dYaH3rrTcs8WwFHCHCSCRQ';

function App() {
  return (
    <div className="App">
      <div className='descri'>

      </div>
      <div className='Map'>
        <Map
          initialViewState={{
            latitude: 37.8,
            longitude: -122.4,
            zoom: 14
          }}
          style={{width: 800, height: 600}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}>
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map>
      </div>
    </div>
  );
}
export default App;
