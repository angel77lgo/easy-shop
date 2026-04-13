import { PermissionsGuard } from './permissions.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Action, Role } from '../enums/role.enum';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new PermissionsGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if no permissions are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    const context = {
      getHandler: () => {},
      getClass: () => {},
    } as any;
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return false if user is not present', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Action.READ]);
    const context = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as any;
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return true if user has required permissions', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Action.READ]);
    const context = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            role: {
              name: Role.ADMIN,
            },
          },
        }),
      }),
    } as any;
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return false if user does not have required permissions', () => {
    // Assuming a role that doesn't have READ permission, but currently all roles have it.
    // Let's mock a scenario where we need a permission that the role doesn't have.
    // Since our ROLE_PERMISSIONS are hardcoded, we can't easily change them for the test without mocking the import.
    // However, we can test that it checks the array correctly.
    
    // Let's assume we need a permission that is NOT in the user's role permissions.
    // But wait, our enum Action only has READ, CREATE, UPDATE and all roles have all of them.
    // To properly test this failure case, I should probably add a restricted role or action to the enum/mapping for testing purposes,
    // or just trust the logic.
    // Actually, I can mock the ROLE_PERMISSIONS import if I really wanted to, but that's complex in Jest without extra setup.
    // Alternatively, I can just rely on the fact that if I ask for an action that IS in the list it works.
    // If I ask for an action that is NOT in the list (if I could cast it), it should fail.
    
    // Let's try to pass a permission that doesn't exist in the enum by casting.
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['DELETE' as Action]);
    const context = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            role: {
              name: Role.BUYER,
            },
          },
        }),
      }),
    } as any;
    expect(guard.canActivate(context)).toBe(false);
  });
});
