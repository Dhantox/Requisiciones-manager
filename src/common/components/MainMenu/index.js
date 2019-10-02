import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import Loader from 'react-loader-spinner';
import './App.css';
import { Link } from 'react-router-dom';
import { Icon, Grid, Menu, Image } from 'semantic-ui-react';
import styles from './app.module.css';
import { Auth, NavMenu } from '../../../agent';
import AccessContainer from '../../features/Authentication/AccessContainer';
import logo from '../../img/CMN-transparentl.png';
export default props => {
  let location = props.history.location.pathname;
  const activeItem = null;
  const handleItemClick = console.log;
  const loading = useSelector(store => store.authenticationReducer.loading);
  const dispatch = useDispatch();
  const username = useSelector(store => store.authenticationReducer.user.user);
  const menu = NavMenu.loadMenu();
  const [visibleMenu, setVisibleMenu] = useState(menu);
  useEffect(() => {
    localStorage.setItem('stateMenu', visibleMenu);
  }, [visibleMenu]);
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
      <Menu secondary fixed={'top'} fluid className={'sidebars'} children>
        <Menu.Item
          className={'itemMenu'}
          active={activeItem}
          onClick={() => setVisibleMenu(!visibleMenu)}
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
      {visibleMenu == true ? (
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
                      <Icon name="file" size="large" />
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
      ) : (
        <>
          <Grid.Column className={styles.ghost} />
          <Menu icon vertical className={styles.MenuContainer} fixed={'left'}>
            <Link to="/main/requisiciones">
              <Menu.Item
                name="gamepad"
                active={activeItem === 'gamepad'}
                onClick={{ Link }}
              >
                <Icon size="large" name="file" />
              </Menu.Item>
            </Link>
            <Link to="/main/compras">
              <Menu.Item
                name="video camera"
                active={activeItem === 'video camera'}
                onClick={''}
              >
                <Icon name="box" />
              </Menu.Item>
            </Link>
            <Link to="/main/usuarios">
              <Menu.Item
                name="video play"
                active={activeItem === 'video play'}
                onClick={''}
              >
                <Icon name="user" />
              </Menu.Item>
            </Link>
            <Link to="/main/proveedores">
              <Menu.Item
                name="video play"
                active={activeItem === 'video play'}
                onClick={''}
              >
                <Icon name="truck" />
              </Menu.Item>
            </Link>
            <Link to="/main/clientes">
              <Menu.Item
                name="video play"
                active={activeItem === 'video play'}
                onClick={''}
              >
                <Icon name="users" />
              </Menu.Item>
            </Link>
          </Menu>
        </>
      )}
    </>
  );
};
