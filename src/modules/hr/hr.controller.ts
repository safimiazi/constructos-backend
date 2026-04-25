import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HrService } from './hr.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { ApplicantStage } from './entities/job-posting.entity';

@ApiTags('HR')
@ApiBearerAuth()
@Controller('hr')
export class HrController {
  constructor(private readonly svc: HrService) {}

  // Employees
  @Get('employees') findEmployees(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findEmployees(u.tenantId!, q); }
  @Post('employees') createEmployee(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createEmployee(u.tenantId!, u.sub, dto); }
  @Get('employees/:id') findEmployee(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findEmployee(u.tenantId!, id); }
  @Patch('employees/:id') updateEmployee(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateEmployee(u.tenantId!, id, dto); }
  @Delete('employees/:id') @HttpCode(HttpStatus.NO_CONTENT) removeEmployee(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeEmployee(u.tenantId!, id); }

  // Departments
  @Get('departments') findDepts(@CurrentUser() u: JwtPayload) { return this.svc.findDepartments(u.tenantId!); }
  @Post('departments') createDept(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createDepartment(u.tenantId!, u.sub, dto); }
  @Patch('departments/:id') updateDept(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateDepartment(u.tenantId!, id, dto); }
  @Delete('departments/:id') @HttpCode(HttpStatus.NO_CONTENT) removeDept(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeDepartment(u.tenantId!, id); }

  // Attendance
  @Get('attendance') findAttendance(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findAttendance(u.tenantId!, q); }
  @Get('attendance/summary') getAttSummary(@CurrentUser() u: JwtPayload, @Query('month') month: string) { return this.svc.getAttendanceSummary(u.tenantId!, month); }
  @Post('attendance') createAttendance(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createAttendance(u.tenantId!, u.sub, dto); }
  @Post('attendance/clock-in') clockIn(@CurrentUser() u: JwtPayload, @Body() dto: { employeeId: string; location?: string }) { return this.svc.clockIn(u.tenantId!, dto.employeeId, u.sub, dto.location); }
  @Post('attendance/clock-out') clockOut(@CurrentUser() u: JwtPayload, @Body() dto: { employeeId: string; location?: string }) { return this.svc.clockOut(u.tenantId!, dto.employeeId, dto.location); }
  @Patch('attendance/:id') updateAttendance(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateAttendance(u.tenantId!, id, dto); }

  // Leave Types
  @Get('leave-types') findLeaveTypes(@CurrentUser() u: JwtPayload) { return this.svc.findLeaveTypes(u.tenantId!); }
  @Post('leave-types') createLeaveType(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createLeaveType(u.tenantId!, u.sub, dto); }
  @Patch('leave-types/:id') updateLeaveType(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateLeaveType(u.tenantId!, id, dto); }

  // Leave
  @Get('leaves') findLeaves(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findLeaves(u.tenantId!, q); }  @Post('leaves') createLeave(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createLeave(u.tenantId!, u.sub, dto); }
  @Patch('leaves/:id/approve') approveLeave(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.approveLeave(u.tenantId!, id, u.sub); }
  @Patch('leaves/:id/reject') rejectLeave(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: { reason: string }) { return this.svc.rejectLeave(u.tenantId!, id, dto.reason); }

  // Payroll
  @Get('payroll/runs') findPayrollRuns(@CurrentUser() u: JwtPayload) { return this.svc.findPayrollRuns(u.tenantId!); }
  @Post('payroll/runs') createPayrollRun(@CurrentUser() u: JwtPayload, @Body() dto: { payPeriod: string }) { return this.svc.createPayrollRun(u.tenantId!, u.sub, dto.payPeriod); }
  @Get('payroll/runs/:id/items') getPayrollItems(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getPayrollItems(u.tenantId!, id); }
  @Patch('payroll/items/:id') updatePayrollItem(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updatePayrollItem(u.tenantId!, id, dto); }
  @Patch('payroll/runs/:id/approve') approvePayrollRun(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.approvePayrollRun(u.tenantId!, id, u.sub); }

  // Recruitment
  @Get('jobs') findJobs(@CurrentUser() u: JwtPayload) { return this.svc.findJobs(u.tenantId!); }
  @Post('jobs') createJob(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createJob(u.tenantId!, u.sub, dto); }
  @Patch('jobs/:id') updateJob(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateJob(u.tenantId!, id, dto); }
  @Get('jobs/:id/applicants') findApplicants(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findApplicants(u.tenantId!, id); }
  @Post('jobs/:id/applicants') createApplicant(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createApplicant(u.tenantId!, u.sub, { ...dto, jobId: id }); }
  @Patch('applicants/:id/stage') moveStage(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: { stage: ApplicantStage }) { return this.svc.moveApplicantStage(u.tenantId!, id, dto.stage); }
}
