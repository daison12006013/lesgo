import JwtService from 'Services/JwtService';
import ErrorException from 'Exceptions/ErrorException';
import config from 'Config/jwt';

const token = headers => {
  if (!headers.Authorization) {
    throw new ErrorException('Authorization Header is required!');
  }

  const parsed = headers.Authorization.split(' ');

  if (!parsed[1]) {
    throw new ErrorException('Missing token!');
  }

  return parsed[1];
};

const verifyJwtToken = () => {
  return {
    before: (handler, next) => {
      const { headers } = handler.event;

      try {
        const service = new JwtService(token(headers), config);

        // eslint-disable-next-line no-param-reassign
        handler.event.decodedJwt = service.validate().decoded;
      } catch (err) {
        err.code = 403;
        err.statusCode = 403;

        throw err;
      }

      next();
    },
  };
};

export default verifyJwtToken;
