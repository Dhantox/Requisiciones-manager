import React, { useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';

const Login = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e, { value, name }) => {
    const newCredentials = { ...credentials };
    newCredentials[name] = value;
    setCredentials(newCredentials);
  };

  return (
    <Grid.Row>
      <Grid.Column>
        <Form>
          <Form.Field>
            <Form.Input
              fluid
              label="Username"
              name="username"
              onChange={handleChange}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            ></Form.Input>
          </Form.Field>
          <Button
            color="blue"
            type="button"
            onClick={() => onSuccess(credentials)}
          >
            Iniciar Sesion
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Login;
