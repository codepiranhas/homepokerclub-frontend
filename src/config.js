/* 
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*                                                             *
*              SETUP OF APP ACCORDING TO ENVIRONMENT          *
*                                                             *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*
*/
console.log('===> NODE_ENV @ KEYS: ', process.env.NODE_ENV);
console.log('===> REACT_APP_ENV @ KEYS: ', process.env.REACT_APP_ENV);

const development = {
  backendUrl: 'https://homepokerclub-development.herokuapp.com',
  s3BucketUrl: 'https://s3.amazonaws.com/homepokerclub',
}

const production = {
  backendUrl: 'https://homepokerclub-production.herokuapp.com',
  s3BucketUrl: 'https://s3.amazonaws.com/homepokerclub',
}

const config = process.env.REACT_APP_ENV === 'production'
  ? production
  : development


/**
* Overwrite config.backendUrl if custom input has been set from the console
*/
if (process.env.REACT_APP_ENV) {
  const input = process.env.REACT_APP_ENV.split(':');

  config.backendUrl = input[1]
    ? `http://localhost:${input[1]}`
    : `https://homepokerclub-${input[0]}.herokuapp.com`
}

/**
 * Common configuration goes here
 */
export default {
  COMMON_CONFIGURATION_EXAMPLE: 10,
  ...config
};
