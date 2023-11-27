/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
  fetchMiddlewares,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {AttendanceController} from './api/attendanceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {GroupsController} from './api/groupsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {StudentsController} from './api/studentsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {TeachersController} from './api/teachersController';
import {iocContainer} from './ioc';
import type {IocContainer, IocContainerFactory} from '@tsoa/runtime';
import type {RequestHandler, Router} from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  AttendancePayload: {
    dataType: 'refObject',
    properties: {
      date: {dataType: 'datetime', required: true},
      present: {dataType: 'boolean', required: true},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IStudentAttendanceRecord: {
    dataType: 'refObject',
    properties: {
      date: {dataType: 'datetime', required: true},
      present: {dataType: 'boolean', required: true},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ID: {
    dataType: 'refAlias',
    type: {dataType: 'string', validators: {}},
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IStudent: {
    dataType: 'refObject',
    properties: {
      id: {dataType: 'string'},
      internalId: {dataType: 'string', required: true},
      name: {dataType: 'string', required: true},
      firstSurname: {dataType: 'string', required: true},
      secondSurname: {dataType: 'string'},
      profilePic: {dataType: 'string'},
      birthDate: {dataType: 'datetime', required: true},
      group: {ref: 'ID', required: true},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ITeacher: {
    dataType: 'refObject',
    properties: {
      id: {dataType: 'string'},
      internalId: {dataType: 'string', required: true},
      name: {dataType: 'string', required: true},
      firstSurname: {dataType: 'string', required: true},
      secondSurname: {dataType: 'string'},
      profilePic: {dataType: 'string'},
      groups: {dataType: 'array', array: {dataType: 'refAlias', ref: 'ID'}},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IGroup: {
    dataType: 'refObject',
    properties: {
      id: {dataType: 'string'},
      internalId: {dataType: 'string'},
      grade: {dataType: 'double', required: true},
      subGroup: {dataType: 'string', required: true},
      name: {dataType: 'string', required: true},
      maxStudents: {dataType: 'double', required: true},
      students: {dataType: 'array', array: {dataType: 'refObject', ref: 'IStudent'}},
      teachers: {dataType: 'array', array: {dataType: 'refObject', ref: 'ITeacher'}},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IStudentExtended: {
    dataType: 'refObject',
    properties: {
      group: {ref: 'IGroup', required: true},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ITeacherExtended: {
    dataType: 'refObject',
    properties: {
      id: {dataType: 'string'},
      internalId: {dataType: 'string', required: true},
      name: {dataType: 'string', required: true},
      firstSurname: {dataType: 'string', required: true},
      secondSurname: {dataType: 'string'},
      profilePic: {dataType: 'string'},
      groups: {dataType: 'array', array: {dataType: 'refObject', ref: 'IGroup'}},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.put(
    '/attendance/student/:id',
    ...fetchMiddlewares<RequestHandler>(AttendanceController),
    ...fetchMiddlewares<RequestHandler>(AttendanceController.prototype.setStudentAttendance),

    async function AttendanceController_setStudentAttendance(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
        data: {in: 'body', name: 'data', required: true, ref: 'AttendancePayload'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<AttendanceController>(AttendanceController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.setStudentAttendance.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/attendance/student/:id',
    ...fetchMiddlewares<RequestHandler>(AttendanceController),
    ...fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getStudentAttendance),

    async function AttendanceController_getStudentAttendance(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<AttendanceController>(AttendanceController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getStudentAttendance.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/groups',
    ...fetchMiddlewares<RequestHandler>(GroupsController),
    ...fetchMiddlewares<RequestHandler>(GroupsController.prototype.getGroups),

    async function GroupsController_getGroups(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<GroupsController>(GroupsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getGroups.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/groups/:id',
    ...fetchMiddlewares<RequestHandler>(GroupsController),
    ...fetchMiddlewares<RequestHandler>(GroupsController.prototype.getGroup),

    async function GroupsController_getGroup(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<GroupsController>(GroupsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getGroup.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/groups',
    ...fetchMiddlewares<RequestHandler>(GroupsController),
    ...fetchMiddlewares<RequestHandler>(GroupsController.prototype.createGroup),

    async function GroupsController_createGroup(request: any, response: any, next: any) {
      const args = {
        group: {in: 'body', name: 'group', required: true, ref: 'IGroup'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<GroupsController>(GroupsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.createGroup.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/groups/batch',
    ...fetchMiddlewares<RequestHandler>(GroupsController),
    ...fetchMiddlewares<RequestHandler>(GroupsController.prototype.batchRegistry),

    async function GroupsController_batchRegistry(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<GroupsController>(GroupsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.batchRegistry.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/groups/:id',
    ...fetchMiddlewares<RequestHandler>(GroupsController),
    ...fetchMiddlewares<RequestHandler>(GroupsController.prototype.updateGroup),

    async function GroupsController_updateGroup(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
        group: {in: 'body', name: 'group', required: true, ref: 'IGroup'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<GroupsController>(GroupsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.updateGroup.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/groups/:id',
    ...fetchMiddlewares<RequestHandler>(GroupsController),
    ...fetchMiddlewares<RequestHandler>(GroupsController.prototype.deleteGroup),

    async function GroupsController_deleteGroup(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<GroupsController>(GroupsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.deleteGroup.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/students',
    ...fetchMiddlewares<RequestHandler>(StudentsController),
    ...fetchMiddlewares<RequestHandler>(StudentsController.prototype.getStudents),

    async function StudentsController_getStudents(request: any, response: any, next: any) {
      const args = {
        extended: {in: 'query', name: 'extended', required: true, dataType: 'boolean'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<StudentsController>(StudentsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getStudents.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/students/:id',
    ...fetchMiddlewares<RequestHandler>(StudentsController),
    ...fetchMiddlewares<RequestHandler>(StudentsController.prototype.getStudent),

    async function StudentsController_getStudent(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<StudentsController>(StudentsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getStudent.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/students',
    ...fetchMiddlewares<RequestHandler>(StudentsController),
    ...fetchMiddlewares<RequestHandler>(StudentsController.prototype.registerStudent),

    async function StudentsController_registerStudent(request: any, response: any, next: any) {
      const args = {
        teacher: {in: 'body', name: 'teacher', required: true, ref: 'IStudent'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<StudentsController>(StudentsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.registerStudent.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/students/batch',
    ...fetchMiddlewares<RequestHandler>(StudentsController),
    ...fetchMiddlewares<RequestHandler>(StudentsController.prototype.batchRegistry),

    async function StudentsController_batchRegistry(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<StudentsController>(StudentsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.batchRegistry.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/students/:id',
    ...fetchMiddlewares<RequestHandler>(StudentsController),
    ...fetchMiddlewares<RequestHandler>(StudentsController.prototype.deleteStudent),

    async function StudentsController_deleteStudent(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<StudentsController>(StudentsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.deleteStudent.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/students/:id',
    ...fetchMiddlewares<RequestHandler>(StudentsController),
    ...fetchMiddlewares<RequestHandler>(StudentsController.prototype.updateStudent),

    async function StudentsController_updateStudent(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
        data: {in: 'body', name: 'data', required: true, ref: 'IStudent'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<StudentsController>(StudentsController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.updateStudent.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/teachers',
    ...fetchMiddlewares<RequestHandler>(TeachersController),
    ...fetchMiddlewares<RequestHandler>(TeachersController.prototype.getTeachers),

    async function TeachersController_getTeachers(request: any, response: any, next: any) {
      const args = {
        extended: {in: 'query', name: 'extended', dataType: 'boolean'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<TeachersController>(TeachersController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getTeachers.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/teachers/:id',
    ...fetchMiddlewares<RequestHandler>(TeachersController),
    ...fetchMiddlewares<RequestHandler>(TeachersController.prototype.getTeacher),

    async function TeachersController_getTeacher(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<TeachersController>(TeachersController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.getTeacher.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/teachers',
    ...fetchMiddlewares<RequestHandler>(TeachersController),
    ...fetchMiddlewares<RequestHandler>(TeachersController.prototype.registerTeacher),

    async function TeachersController_registerTeacher(request: any, response: any, next: any) {
      const args = {
        teacher: {in: 'body', name: 'teacher', required: true, ref: 'ITeacher'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<TeachersController>(TeachersController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.registerTeacher.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/teachers/batch',
    ...fetchMiddlewares<RequestHandler>(TeachersController),
    ...fetchMiddlewares<RequestHandler>(TeachersController.prototype.batchRegistry),

    async function TeachersController_batchRegistry(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<TeachersController>(TeachersController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.batchRegistry.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/teachers/:id',
    ...fetchMiddlewares<RequestHandler>(TeachersController),
    ...fetchMiddlewares<RequestHandler>(TeachersController.prototype.deleteTeacher),

    async function TeachersController_deleteTeacher(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<TeachersController>(TeachersController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.deleteTeacher.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/teachers/:id',
    ...fetchMiddlewares<RequestHandler>(TeachersController),
    ...fetchMiddlewares<RequestHandler>(TeachersController.prototype.updateTeacher),

    async function TeachersController_updateTeacher(request: any, response: any, next: any) {
      const args = {
        id: {in: 'path', name: 'id', required: true, dataType: 'string'},
        data: {in: 'body', name: 'data', required: true, ref: 'ITeacher'},
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === 'function'
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<TeachersController>(TeachersController);
        if (typeof controller['setStatus'] === 'function') {
          controller.setStatus(undefined);
        }

        const promise = controller.updateTeacher.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === 'function' &&
      data.readable &&
      typeof data._read === 'function'
    ) {
      response.status(statusCode || 200);
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map(key => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            {noImplicitAdditionalProperties: 'throw-on-extras'}
          );
        case 'queries':
          return validationService.ValidateParam(
            args[key],
            request.query,
            name,
            fieldErrors,
            undefined,
            {noImplicitAdditionalProperties: 'throw-on-extras'}
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            {noImplicitAdditionalProperties: 'throw-on-extras'}
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            {noImplicitAdditionalProperties: 'throw-on-extras'}
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            {noImplicitAdditionalProperties: 'throw-on-extras'}
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            'body.',
            {noImplicitAdditionalProperties: 'throw-on-extras'}
          );
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              {noImplicitAdditionalProperties: 'throw-on-extras'}
            );
          } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              {noImplicitAdditionalProperties: 'throw-on-extras'}
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              {noImplicitAdditionalProperties: 'throw-on-extras'}
            );
          }
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
