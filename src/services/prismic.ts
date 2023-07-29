import * as prismic from '@prismicio/client'

export const getPrismicClient = (config = {}) => {
  const client = prismic.createClient('https://blogfaith.cdn.prismic.io/api/v2', {
   accessToken: '',
  });

  return client
};
