/**
 *  article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
    // Query by slug
    async findOne(ctx) {
      // thanks to the custom route we have now a slug variable
      // instead of the default id
      const { slug } = ctx.params;
      const entity = await strapi.db.query('api::article.article').findOne({
        where: { slug }
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(sanitizedEntity);
    },
  }));