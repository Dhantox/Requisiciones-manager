import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Requisiciones } from '../../../agent';

const RequisicionesTotales = props => {
  let dic;
  if (props.data != undefined || props.data != null) {
    dic = props.data[0];
  }
  return (
    <Card.Group centered itemsPerRow={4}>
      <Card color={'green'}>
        <Card.Content textAlign={'center'}>
          <Card.Header textAlign={'center'}>Aceptadas</Card.Header>{' '}
          <Button color={'green'} compact>
            {dic && dic.aceptadas}{' '}
          </Button>
        </Card.Content>
      </Card>
      <Card color={'blue'}>
        <Card.Content textAlign={'center'}>
          <Card.Header textAlign={'center'}>Cotizadas</Card.Header>
          <Button color={'blue'} compact>
            {dic && dic.cotizadas}{' '}
          </Button>
        </Card.Content>
      </Card>
      <Card color={'yellow'}>
        <Card.Content textAlign={'center'}>
          <Card.Header textAlign={'center'}>Pendientes</Card.Header>
          <Button color={'yellow'} compact>
            {dic && dic.espera}{' '}
          </Button>
        </Card.Content>
      </Card>
      <Card color={'red'}>
        <Card.Content textAlign={'center'}>
          <Card.Header textAlign={'center'}>Rechazadas</Card.Header>
          <Button color={'red'} compact>
            {dic && dic.rechazadas}{' '}
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};
export default RequisicionesTotales;
