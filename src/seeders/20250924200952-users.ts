'use strict';

import { or, QueryInterface } from 'sequelize';
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Para PostgreSQL
    await queryInterface.sequelize.query(`
    INSERT INTO "Organization" (id, "organizationName", document, "createdAt", "updatedAt")
    VALUES (
      'e741b560-8594-4019-8bb9-0e394abf119f',
      'AdminOrg',
      '123456789',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  `);

    const hashedPassword = hashPassword(process.env.ADMIN_PASSWORD);

    await queryInterface.sequelize.query(`
    INSERT INTO "User" (id, "firstName", "lastName", email, password, "roleId", "organizationId", "createdAt", "updatedAt")
    VALUES (
      '554a7a5b-593f-43b5-82f8-f93d9a1b049e',
      'admin',
      'admin',
      'admin@admin.com',
      '${hashedPassword}',
      '9963ef3e-a3ea-468c-be5b-19e2476b0a0a',
      'e741b560-8594-4019-8bb9-0e394abf119f',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('User', {}, {});
    await queryInterface.bulkDelete('Organization', {}, {});
  },
};
