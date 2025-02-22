import { dispatch } from 'lesgo/utils';

const pingQueue = input => {
  const payload = {
    data: input,
  };

  return dispatch(payload, 'pingQueue');
};

export default pingQueue;
