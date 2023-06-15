import * as prismic from '@prismicio/client'

export const getPrismicClient = (config = {}) => {
  const client = prismic.createClient('https://blogfaith.cdn.prismic.io/api/v2', {
   accessToken: 'MC5aSW5mWWhVQUFDa0EtbWZX.77-9F--_vWkych_vv71uee-_ve-_ve-_vQfvv70UKycR77-977-9QO-_vTbvv71V77-9N--_ve-_vXzvv70',
  });

  return client
};