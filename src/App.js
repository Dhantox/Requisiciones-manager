import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import Loader from 'react-loader-spinner';
import './App.css';
import { Link } from 'react-router-dom';
import { Icon, Grid, Menu, Image } from 'semantic-ui-react';
import styles from './app.module.css';
import { Auth } from './agent';
import AccessContainer from './common/features/Authentication/AccessContainer';
import logo from './common/img/CMNVisa.png';
export default props => {
  let location = props.history.location.pathname;
  const activeItem = null;
  const handleItemClick = console.log;
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
      <Menu color={'blue'} secondary fixed={'top'} fluid className={'sidebars'}>
        <Menu.Item
          className={'itemMenu'}
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <Icon name="bars" size="large"></Icon>
        </Menu.Item>
        <Menu.Item />
        <Menu.Item />
        <Menu.Menu position="right">
          <Menu.Item name={username} className={'itemMenu'}></Menu.Item>
          <Menu.Item
            className={'itemMenu'}
            name="Cerrar sesion"
            active={activeItem === 'logout'}
            onClick={() => {
              Auth.cleanCookies();
              dispatch({ type: 'LOGOUT' });
            }}
          />
        </Menu.Menu>
      </Menu>

      <div
        className="ui vertical borderless fluid text menu"
        className={styles.navBarContainer}
      >
        <Image src={logo} size="large" />
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
                <div className="ui grid">
                  <div className="two wide column">
                    <Icon name="file alternate outline" size="large" />
                  </div>
                  <div className="two wide column">
                    <p>Requisiciones</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <AccessContainer access={['compras', 'admin']}>
            <div className={styles.paddingfix}>
              <div
                className={`${
                  location === '/main/compras'
                    ? styles.selectedItem
                    : styles.item
                } `}
              >
                <Link to="compras">
                  <div className="ui grid">
                    <div className="two wide column">
                      <Icon name="box" size="large" />
                    </div>
                    <div className="two wide column">
                      <p>Compras</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </AccessContainer>
          <AccessContainer access={['admin']}>
            <div className={styles.paddingfix}>
              <div
                className={`${
                  location === '/main/usuarios'
                    ? styles.selectedItem
                    : styles.item
                }`}
              >
                <Link to="usuarios">
                  <div className="ui grid">
                    <div className="two wide column">
                      <Icon name="user" size="large" />
                    </div>
                    <div className="two wide column">
                      <p>Usuarios</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.paddingfix}>
              <div
                className={`${
                  location === '/main/proveedores'
                    ? styles.selectedItem
                    : styles.item
                }`}
              >
                <Link to="proveedores">
                  <div className="ui grid">
                    <div className="two wide column">
                      <Icon name="truck" size="large" />
                    </div>
                    <div className="two wide column">
                      <p>Proveeedores</p>
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
                <div className="ui grid">
                  <div className="two wide column">
                    <Icon name="users" size="large" />
                  </div>
                  <div className="two wide column">
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
