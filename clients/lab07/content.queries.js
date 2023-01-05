const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    lab07_projects {
      title
      description
      images {
        directus_files_id {
          id
          title
        }
      }
    }
    lab07_general {
      kvk
      instagram_url
      email_address
      about_page
      about_image1 {
        id
        title
      }
      about_image2 {
        id
        title
      }
      contact_page
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
