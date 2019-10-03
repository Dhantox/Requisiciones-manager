import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import Loader from 'react-loader-spinner';
import './App.css';
import { Link } from 'react-router-dom';
import { Icon, Grid, Menu, Image, Sidebar } from 'semantic-ui-react';
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
      <Menu secondary fluid className={'sidebars'} fixed={"top"}>
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
        <>
         <Grid.Column className={styles.largeMenuContainer} />
        <div
          className="ui vertical borderless fluid text menu"
          className={styles.navBarContainer}
        >
          <Image src={logo} size="large" />
          <div className={styles.navBar}>
          <div className={styles.paddingfix}>
                <div
                  className={`${
                    location === '/main/dashboard'
                      ? styles.selectedItem
                      : styles.item
                  }`}
                >
             
                  <Link to="dashboard"  >
                  <Grid >
                  <Grid.Row >
                    <Grid.Column>
                      <Icon name="pie graph" /> 
                    </Grid.Column>
                    <Grid.Column> 
                       Inicio
                    </Grid.Column>
                  </Grid.Row>
                     
                  </Grid>
                  </Link>
          
                </div>
              </div>
            <div className={styles.paddingfix}>
              <div
                className={`${
                  location === '/main/requisiciones'
                    ? styles.selectedItem
                    : styles.item
                } `}
              >
                <Link to="requisiciones">
                  <Grid className={styles.navGrid }>
                  <Grid.Row>
                    <Grid.Column>
                      <Icon name="file text" /> 
                    </Grid.Column>
                    <Grid.Column>
                       Requisiciones
                    </Grid.Column>
                  </Grid.Row>
                     
                  </Grid>
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
                  <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Icon name="box"/> 
                    </Grid.Column>
                    <Grid.Column>
                       Compras
                    </Grid.Column>
                  </Grid.Row>
                     
                  </Grid>
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
                  <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Icon name="user"/> 
                    </Grid.Column>
                    <Grid.Column>
                       Usuarios
                    </Grid.Column>
                  </Grid.Row>
                     
                  </Grid>
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
                  <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Icon name="truck" /> 
                    </Grid.Column>
                    <Grid.Column>
                       Proveedores
                    </Grid.Column>
                  </Grid.Row>
                  </Grid>
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
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Icon name="users"/> 
                    </Grid.Column>
                    <Grid.Column>
                       Clientes
                    </Grid.Column>
                  </Grid.Row>
                     
                  </Grid>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        <>
          <Grid.Column className={styles.ghost} />
          <Menu icon  inverted vertical className={`${styles.MenuContainer} ${styles.top} ${styles.menuFixed}`}>
          <Link to="/main/dashboard">
              <Menu.Item
                name="gamepad"
                active={activeItem === 'gamepad'}
                onClick={'gamepad'}
              >
                <Icon name="pie graph"/>
              </Menu.Item>
            </Link>
            <Link to="/main/requisiciones">
              <Menu.Item
                name="gamepad"
                active={activeItem === 'gamepad'}
                onClick={'gamepad'}
            
              >
                <Icon name="file"/>
              </Menu.Item>
            </Link>
            <Link to="/main/compras">
              <Menu.Item
                name="video camera"
                active={activeItem === 'video camera'}
                onClick={'video camera'}
              >
                <Icon name="box" />
              </Menu.Item>
            </Link>
            <Link to="/main/usuarios">
              <Menu.Item
                name="video play"
                active={activeItem === 'video play'}
                onClick={'video play'}
              >
                <Icon name="user" />
              </Menu.Item>
            </Link>
            <Link to="/main/proveedores">
              <Menu.Item
                name="video play"
                active={activeItem === 'video play'}
                onClick={'video play'}
              >
                <Icon name="truck" />
              </Menu.Item>
            </Link>
            <Link to="/main/clientes">
              <Menu.Item
                name="video play"
                active={activeItem === 'video play'}
                onClick={'video play'}
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
