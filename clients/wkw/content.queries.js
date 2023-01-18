const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    wkw_algemeen {
      banner
      telefoon
      email
      adres
      openingstijden
      nieuwsbrief
      banner_en
      openingstijden_en
      nieuwsbrief_en
    }
    wkw_home {
      intro
      intro_en
    }
    wkw_paginas {
      titel
      slug
      language
      content
    }
    wkw_blogs {
      titel
      slug
      language
      user_created {
        first_name
        last_name
      }
      date_created
      featured_image {
        id
        title
      }
      content
      short_description
      naam
    }
    wkw_reviews {
      vendure_product_id
      author_name
      date_created
      review_date
      message
      product_title
      rating
      response
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
