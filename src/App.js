import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import Loader from 'react-loader-spinner';
import './App.css';
import { Link } from 'react-router-dom';
import { Icon, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import styles from './app.module.css';
import { Auth } from './agent';
import AccessContainer from './common/features/Authentication/AccessContainer';

export default props => {
  let location = props.history.location.pathname;
  const loading = useSelector(store => store.authenticationReducer.loading);
  const dispatch = useDispatch();
  const username = useSelector(store => store.authenticationReducer.user.user);
  return (
    <>
      <ReactNotification></ReactNotification>
      <div className={styles.loader}>
        <Loader
          type="ThreeDots"
          color="#2185d0"
          height={100}
          width={100}
          visible={loading}
        />
      </div>
      <div class="sidebar">
        <Grid columns={2} verticalAlign={'middle'}>
          <Grid.Row>
            <Grid.Column>
              <h2>LOGO</h2>
            </Grid.Column>
            <Grid.Column>
              <Grid columns={3} divided>
                <Grid.Row>
                  <Grid.Column></Grid.Column>
                  <Grid.Column width={6}>
                    <p>{username}</p>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <p
                      onClick={() => {
                        Auth.cleanCookies();
                        dispatch({ type: 'LOGOUT' });
                      }}
                      name="triangle down"
                    >
                      Cerrar sesión
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div
        class="ui vertical borderless fluid text menu"
        className={styles.navBarContainer}
      >
        <div className={styles.navBar}>
          <div className={styles.paddingfix}>
            <div
              className={`${
                location === '/main/requisiciones'
                  ? styles.selectedItem
                  : styles.item
              } `}
            >
              <Link to="requisiciones">
                <div class="ui grid">
                  <div class="two wide column">
                    <Icon name="file alternate outline" size="large" />
                  </div>
                  <div class="two wide column">
                    <p>Requisiciones</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <AccessContainer access={['vendedor']}>
            <div className={styles.paddingfix}>
              <div
                className={`${
                  location === '/main/usuarios'
                    ? styles.selectedItem
                    : styles.item
                }`}
              >
                <Link to="usuarios">
                  <div class="ui grid">
                    <div class="two wide column">
                      <Icon name="user" size="large" />
                    </div>
                    <div class="two wide column">
                      <p>Usuarios</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </AccessContainer>
          <div className={styles.paddingfix}>
            <div
              className={`${
                location === '/main/clientes'
                  ? styles.selectedItem
                  : styles.item
              }`}
            >
              <Link to="clientes">
                <div class="ui grid">
                  <div class="two wide column">
                    <Icon name="users" size="large" />
                  </div>
                  <div class="two wide column">
                    <p>Clientes</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
