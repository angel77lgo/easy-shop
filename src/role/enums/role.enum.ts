export enum Role {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller',
}

export enum Action {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
}

export const ROLE_PERMISSIONS: Record<Role, Action[]> = {
  [Role.ADMIN]: [Action.READ, Action.CREATE, Action.UPDATE],
  [Role.BUYER]: [Action.READ, Action.CREATE, Action.UPDATE],
  [Role.SELLER]: [Action.READ, Action.CREATE, Action.UPDATE],
};
