import React from 'react';
import { Grid, Label, Statistic } from 'semantic-ui-react';
import { FacebookIcon, TwitterIcon } from 'react-share';

export default () => {
  return (
    <Grid>
      <Grid.Row>
        <h2>La casita musical</h2>
        <Label>
          Ultima actualizacion
          <Label.Detail>12:12 pm</Label.Detail>
        </Label>
      </Grid.Row>
      <Grid.Row>
        <Statistic.Group size="tiny">
          <Statistic>
            <Statistic.Value>$18.41MXN</Statistic.Value>
            <Statistic.Label>Compra</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>$19.32MXN</Statistic.Value>
            <Statistic.Label>Venta</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Grid.Row>
      <FacebookIcon
        size={32}
        round={true}
        url="https://facebook.com/ElGatoCimarron/"
      />
      <TwitterIcon
        size={32}
        round={true}
        url="https://facebook.com/ElGatoCimarron/"
      />

      <Grid.Row>
        LA MONEDA CENTRO CAMBIARIO, Sirviendo a la comunidad ensenadense durante
        40 años CAMBIO DE CHEQUES Y COMPRA - VENTA DE DÓLARES TEL. (646)
        176-55-30 Reforma y Cortez Abierto todos los días. Cuarta y Espinoza
        Cerrado los domingos.
      </Grid.Row>
      <Grid.Row>
        <iframe
          title="google maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6777.252006585498!2d-116.61489679189684!3d31.86239093203604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d88d88aa81600f%3A0x9bf1b543a2aab551!2sLa+Casita+Musical!5e0!3m2!1sen!2smx!4v1565402074812!5m2!1sen!2smx"
          rel="noopener"
          width="400"
          height="300"
          frameBorder="0"
          allowFullScreen
        />
      </Grid.Row>
    </Grid>
  );
};
