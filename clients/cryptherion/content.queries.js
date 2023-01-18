const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    cryptherion_algemeen {
      telefoon
      email
      adres
      algemene_voorwaarden
      privacy_beleid
      highlighted_product
      banner
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
