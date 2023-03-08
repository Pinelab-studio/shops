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
    cryptherion_blogs {
      id
      date_created
      user_created {
        first_name
        last_name
        avatar {
          id
        }
      }
      title
      slug
      description
      featured_image {
        id
        title
      }
      content
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
