import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          articleBySlug(slug: String!): Article
        }
      `,
      resolversConfig: {
        "Query.articleBySlug": {
          auth: false,
        },
      },
      resolvers: {
        Query: {
          articleBySlug: {
            resolve: async (parent, args, ) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const { slug } = args;
              const entity = await strapi.db
                .query("api::article.article")
                .findOne({
                  where: { slug },
                  populate: ['*']
                });
              return entity;
            },
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
