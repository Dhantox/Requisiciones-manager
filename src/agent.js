import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import showNotificaction from './common/utils/notifications';

const cookies = new Cookies();

const API_ROOT = 'http://127.0.0.1:8000/api/';

export const mediaServer = process.env.REACT_APP_MEDIA_SERVER;

const requests = {
  get: url => {
    const promise = axios.get(`${API_ROOT}${url}`);
    promise.catch(e => {
      if (e.response && e.response.status == 401) {
        Auth.cleanCookies();
        Auth.removeHeaders();
        useDispatch({ type: 'LOGOUT' });
      } else {
        showNotificaction.error(
          'Error de conexion',
          'Compruebe su conexion a internet'
        );
      }
    });
    return promise;
  },
  post: (url, body) => {
    const promise = axios.post(`${API_ROOT}${url}`, body);
    promise.catch(e => {
      if (e.response && e.response.status == 401) {
        Auth.cleanCookies();
        Auth.removeHeaders();
        useDispatch({ type: 'LOGOUT' });
      } else {
        showNotificaction.error(
          'Error de conexion',
          'Compruebe su conexion a internet'
        );
      }
    });
    return promise;
  },
  put: (url, body) => {
    const promise = axios.put(`${API_ROOT}${url}`, body);
    promise.catch(e => {
      if (e.response && e.response.status == 401) {
        Auth.cleanCookies();
        Auth.removeHeaders();
        useDispatch({ type: 'LOGOUT' });
      } else {
        showNotificaction.error(
          'Error de conexion',
          'Compruebe su conexion a internet'
        );
      }
    });
    return promise;
  },
  delete: url => axios.delete(`${API_ROOT}${url}`)
};

export const CDN = {
  getUrl: imageUrl =>
    imageUrl.includes('http') || imageUrl.includes('base64')
      ? imageUrl
      : `${mediaServer}/${imageUrl}`
};

export const Auth = {
  login: credentials => requests.post('authentication/login/', credentials),
  signUp: userData => requests.post('authentication/signup/', userData),
  configHeaders: () => {
    const session_cookie = cookies.get('token');
    if (session_cookie !== undefined) {
      const token = `Token ${session_cookie}`;
      axios.defaults.headers.common['Authorization'] = token;
    }
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  },
  removeHeaders: () => {
    delete axios.defaults.headers.common.Authorization;
  },
  cleanCookies: () => {
    cookies.remove('csrftoken', { path: '/' });
    cookies.remove('token', { path: '/' });
  },
  configCookies: data => {
    cookies.set('csrftoken', data['csrf'], { path: '/' });
    cookies.set('token', data['token'], { path: '/' });
  },
  hasCookies: () => {
    const token = cookies.get('token');
    const csrfToken = cookies.get('csrftoken');
    if (token != null && csrfToken != null) {
      return true;
    }
    return false;
  },
  saveUser: user => {
    localStorage.user = JSON.stringify(user);
  },
  loadUser: () => JSON.parse(localStorage.user)
};
export const Usuarios = {
  all: () => requests.get('usuarios/usuarios/'),
  get: lessonId => requests.get(`lessons/lessons/${lessonId}/`),
  create: lesson => requests.post('usuarios/usuarios/', lesson),
  update: (lessonId, lesson) =>
    requests.put(`lessons/lessons/${lessonId}/`, lesson),
  withConcepts: lessonId =>
    requests.get(`lessons/lessons/${lessonId}/concepts/`),
  delete: lessonId => requests.delete(`lessons/lessons/${lessonId}/`),
  saveTrainingScore: (lessonId, conceptsScore) =>
    requests.post(`lessons/lessons/${lessonId}/training/`, {
      concepts: conceptsScore
    })
};

export const Clientes = {
  all: () => requests.get('clientes/clientes/'),
  get: lessonId => requests.get(`lessons/lessons/${lessonId}/`),
  create: lesson => requests.post('clientes/clientes/', lesson),
  update: (lessonId, lesson) =>
    requests.put(`lessons/lessons/${lessonId}/`, lesson),
  withConcepts: lessonId =>
    requests.get(`lessons/lessons/${lessonId}/concepts/`),
  delete: lessonId => requests.delete(`lessons/lessons/${lessonId}/`),
  saveTrainingScore: (lessonId, conceptsScore) =>
    requests.post(`lessons/lessons/${lessonId}/training/`, {
      concepts: conceptsScore
    })
};

export const Requisiciones = {
  all: () => requests.get('requisiciones/requisiciones/'),
  tipos: {
    all: () => requests.get('requisiciones/requisiciones/tipos/')
  },
  estatus: {
    all: () => requests.get('requisiciones/requisiciones/estatus/')
  },
  estados: {
    update: (requisicionId, nuevoEstado) =>
      requests.put(
        `requisiciones/requisiciones/${requisicionId}/estados/`,
        nuevoEstado
      ),
    get: requisicionId =>
      requests.get(`requisiciones/requisiciones/${requisicionId}/estados/`),
    all: () => requests.get('requisiciones/requisiciones/estados/'),
    categorias: {
      all: () => requests.get('requisiciones/requisiciones/categorias/')
    }
  },
  create: requisicion =>
    requests.post('requisiciones/requisiciones/', requisicion),
  cotizaciones: {
    create: (cotizacion, requisicionId) =>
      requests.post(
        `requisiciones/requisiciones/${requisicionId}/cotizaciones/`,
        cotizacion
      )
  },

  get: lessonId => requests.get(`lessons/lessons/${lessonId}/`),
  update: (lessonId, lesson) =>
    requests.put(`lessons/lessons/${lessonId}/`, lesson)
};
