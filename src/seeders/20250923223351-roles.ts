'use strict';

import { QueryInterface, QueryTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const roles = [
      {
        id: '9963ef3e-a3ea-468c-be5b-19e2476b0a0a',
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '0f36d513-7a0e-4441-8aab-5e0e590cddcc',
        name: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '749260f2-a100-49a0-a91a-e8e5493b3cb2',
        name: 'seller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const role of roles) {
      const [existingRole] = await queryInterface.sequelize.query(
        `SELECT id FROM "Role" WHERE id = '${role.id}'`,
        { type: QueryTypes.SELECT },
      );

      if (!existingRole) {
        await queryInterface.bulkInsert('Role', [role]);
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Role', {}, {});
  },
};
