import React, { useReducer } from 'react';

const ProjectContext = React.createContext();

const initialState = {
  projects: [
    {
      id: 6,
      name: 'Languages',
      children: [
        {
          id: 4,
          name: 'English'
        }
      ]
    },
    {
      id: 1,
      name: 'Tech',
      children: [
        {
          id: 5,
          name: 'Ruby'
        }
      ]
    }
  ],
  selectedProject: {}
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SELECT_PROJECT':
      return { ...state, selectedProject: action.value };
    default:
      throw new Error();
  }
};

const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProjectContext.Provider value={[state, dispatch]}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
