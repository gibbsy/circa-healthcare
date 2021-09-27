const client = require("@sanity/client");

const sanityClient = client({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: "j3kfzxis",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
});
const queryRoutes = `
*[_id=="pageWork"][0]{ 
  work[]->{slug, title, hero{asset->}, client->{name}, product,  problem, solution, deliverables, projectImages[]{title, caption, asset->}},
}`;
/* const routes = () => {
  return sanityClient.fetch(queryRoutes).then((routes) => {
    console.log(routes);
    return routes.work.map((route) => "/case-study/" + route.slug.current);
  });
}; */
async function dynamicRoutes() {
  const routes = await sanityClient.fetch(queryRoutes);
  const { work } = routes;
  const arr = work.map((project) => {
    return {
      route: `/case-study/${project.slug.current}`,
      payload: project,
    };
  });
  console.log(arr);
  return arr;
}
dynamicRoutes();
/**
 *  async routes() {
      const movies = (await sanity.fetch(`*[_type == "movie"]`)) || []
      return movies.map((movie) => {
        return {
          route: `/movies/${movie.slug.current}/`,
          payload: movie,
        }
      })
    }
 * 
 * generate: {
    routes: function () {
      return axios.get('https://your-wordpress-api/')
      .then((res) => {
        return res.data.map((page) => {
          let route = '/whatever/you/like/' + page.slug
        })
      })
    }
  }
*/
