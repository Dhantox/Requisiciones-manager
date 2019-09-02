import React from 'react';
import { Input, Form, Grid, Button } from 'semantic-ui-react';

const Login = ({ onSuccess }) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <Form>
          <Form.Field>
            <label>Username</label>
            <Input></Input>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input></Input>
          </Form.Field>
          <Button type="button" onClick={onSuccess}>
            Login
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Login;
