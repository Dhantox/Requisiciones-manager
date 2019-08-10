import React, { useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import Search from '../../../components/Search';
import CurrencyExchanges from '../CurrencyExchangesTables';
import GoogleMapReact from 'google-map-react';

const displayModes = { TABLE: 'TABLE', MAP: 'MAP' };

export default () => {
  const [displayMode, setDisplayMode] = useState(displayModes.TABLE);
  return (
    <Grid>
      <h2>Casas de Cambio</h2>
      {displayMode === displayModes.TABLE && (
        <Icon name="map" onClick={() => setDisplayMode(displayModes.MAP)} />
      )}
      {displayMode === displayModes.MAP && (
        <Icon name="table" onClick={() => setDisplayMode(displayModes.TABLE)} />
      )}

      <Grid.Column width={16}>
        <Search />
      </Grid.Column>
      {displayMode === displayModes.TABLE && (
        <Grid.Column width={16}>
          <CurrencyExchanges
            currencyExchanges={[
              {
                id: 1,
                name: 'La casita musical',
                buy: 12.5,
                sell: 13.5,
                distance: '50km',
                last_update: '12/12/2012 12:05 PM'
              }
            ]}
          />
        </Grid.Column>
      )}

      {displayMode === displayModes.MAP && (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDVyw6fB8g3w5oePaq7t_dhO__zZE9cg2I'
            }}
            defaultCenter={{ lat: 31.866928, lng: -116.612346 }}
            defaultZoom={14}
          >
            <Icon
              onCloseClick={() => console.log('asdas')}
              name="home"
              lat={31.866856}
              lng={-116.618455}
              text="My Marker"
              color="red"
            />
            <Icon
              onCloseClick={() => console.log('asdas')}
              name="home"
              lat={31.869644}
              lng={-116.618916}
              text="My Marker"
              color="green"
            />
          </GoogleMapReact>
        </div>
      )}
    </Grid>
  );
};
