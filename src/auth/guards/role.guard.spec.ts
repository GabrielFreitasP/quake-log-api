import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './role.guard';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, Reflector],
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should allow access when no roles are specified', () => {
      const mockExecutionContext: any = {
        getHandler: jest.fn(),
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({ user: { roles: 'admin' } }),
      };

      jest.spyOn(reflector, 'get').mockReturnValue(undefined);

      const canActivate = rolesGuard.canActivate(mockExecutionContext);

      expect(canActivate).toBe(true);
    });

    it('should allow access when roles match', () => {
      const mockExecutionContext: any = {
        getHandler: jest.fn(),
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({ user: { roles: 'admin' } }),
      };

      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

      const canActivate = rolesGuard.canActivate(mockExecutionContext);

      expect(canActivate).toBe(true);
    });

    it('should throw ForbiddenException when roles do not match', () => {
      const mockExecutionContext: any = {
        getHandler: jest.fn(),
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({ user: { roles: 'user' } }),
      };

      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);

      expect(() => rolesGuard.canActivate(mockExecutionContext)).toThrow(
        ForbiddenException,
      );
    });
  });
});
