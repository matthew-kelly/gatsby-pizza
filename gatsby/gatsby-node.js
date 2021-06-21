import path from 'path';
import fetch from 'isomorphic-fetch';

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. fetch list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 2. loop over each beer
  beers.forEach((beer) => {
    // 3. create node for that beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      child: null,
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into the gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. turn each slicemaster into own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. figure out how many pages there are (based on total number) and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4. loop from 1 to n (number of pages) and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) =>
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when it is created
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  ); // creates empty array with a length of pageCount
}

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. loop over each pizza and create a page for each
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. get template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // 3. create page for each topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. pass topping data to Pizza.js
}

export async function createPages(params) {
  // create pages dynamically:
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
    // 3. Slicemasters
    turnSlicemastersIntoPages(params),
  ]);
}
