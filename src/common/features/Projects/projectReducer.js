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

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SELECT_PROJECT':
      return { ...state, selectedProject: payload };
    default:
      return state;
  }
};
