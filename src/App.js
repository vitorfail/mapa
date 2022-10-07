import './App.css';
import  ReactMapGL, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Bola1 from './icons/bola1.png'
import Bola2 from './icons/bola2.png'
import Bola3 from './icons/bola3.png'
import Bola4 from './icons/bola4.png'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoidml0b3JmYWlsIiwiYSI6ImNsOHhyajNjYjA4aXIzdW56ZDN1NjI0ZjUifQ.dYaH3rrTcs8WwFHCHCSCRQ';
const dados = [[3, 38], [7, 39], [4, 38], [2, 40]]
const imagens = [Bola1, Bola2, Bola3, Bola4]


function App() {
  return (
    <div className="App">
      <div className='descri'>

      </div>
      <div className='Map'>
        <ReactMapGL
          initialViewState={{
            latitude: -3.71839,
            longitude: -38.5434,
            zoom: 6
          }}

          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}>
            {dados.map((item, index) =>(
                <Marker key={index} latitude={item[0]*-1} longitude={item[1]*-1} anchor="bottom" >
                <div className='img'></div>
              </Marker>

            ))}
      </ReactMapGL>
      </div>
    </div>
  );
}
export default App;
