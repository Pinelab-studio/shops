const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    roy_bio {
      title_nl
      title_en
      content_nl
      content_en
      image {
        id
        title
      }
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
