export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
  DEFAULT = 'default'
}

export const ROLES = {
  ROLE_USER: RoleType.USER,
  ROLE_ADMIN: RoleType.ADMIN,
  ROLE_DEFAULT: RoleType.DEFAULT
} as const;