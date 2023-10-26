import {inject} from 'inversify';
import {Body, Get, Path, Put, Route, Tags} from 'tsoa';
import {Controller} from '../controller';
import {AttendanceBackendAdapter} from '../domain/attendance-backend-adapter';
import {AttendancePayload} from '../interfaces/attendance';
import {IStudentAttendanceRecord} from '../interfaces/student';
import {provideSingleton} from '../ioc';

@Route('attendance')
@Tags('attendance')
@provideSingleton(AttendanceController)
export class AttendanceController extends Controller implements AttendanceBackendAdapter {
  constructor(
    @inject(AttendanceBackendAdapter) protected backendAdapter: AttendanceBackendAdapter
  ) {
    super();
  }

  @Put('student/{id}')
  setStudentAttendance(@Path() id: string, @Body() data: AttendancePayload): Promise<boolean> {
    return this.backendAdapter.setStudentAttendance(id, data);
  }

  @Get('student/{id}')
  getStudentAttendance(id: string): Promise<IStudentAttendanceRecord[]> {
    return this.backendAdapter.getStudentAttendance(id);
  }
}
