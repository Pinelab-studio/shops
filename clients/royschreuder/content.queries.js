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
    roy_workshops {
      title_nl
      title_en
      content_nl
      content_en
      images {
        directus_files_id {
          id
        }
      }
    }
    roy_artwork {
      title
      image {
        title
        id
      }
      category
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
