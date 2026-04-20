"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Applicant = exports.JobPosting = exports.ApplicantStage = exports.JobStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var JobStatus;
(function (JobStatus) {
    JobStatus["OPEN"] = "open";
    JobStatus["CLOSED"] = "closed";
    JobStatus["ON_HOLD"] = "on_hold";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var ApplicantStage;
(function (ApplicantStage) {
    ApplicantStage["APPLIED"] = "applied";
    ApplicantStage["SCREENING"] = "screening";
    ApplicantStage["INTERVIEW"] = "interview";
    ApplicantStage["OFFERED"] = "offered";
    ApplicantStage["HIRED"] = "hired";
    ApplicantStage["REJECTED"] = "rejected";
})(ApplicantStage || (exports.ApplicantStage = ApplicantStage = {}));
let JobPosting = class JobPosting extends base_entity_1.TenantBaseEntity {
    title;
    departmentId;
    description;
    status;
    deadline;
    vacancies;
};
exports.JobPosting = JobPosting;
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], JobPosting.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], JobPosting.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JobPosting.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: JobStatus, default: JobStatus.OPEN }),
    __metadata("design:type", String)
], JobPosting.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], JobPosting.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vacancies', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], JobPosting.prototype, "vacancies", void 0);
exports.JobPosting = JobPosting = __decorate([
    (0, typeorm_1.Entity)('job_postings')
], JobPosting);
let Applicant = class Applicant extends base_entity_1.TenantBaseEntity {
    jobId;
    name;
    email;
    phone;
    cvUrl;
    stage;
    notes;
};
exports.Applicant = Applicant;
__decorate([
    (0, typeorm_1.Column)({ name: 'job_id', type: 'uuid' }),
    __metadata("design:type", String)
], Applicant.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Applicant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Applicant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Applicant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cv_url', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Applicant.prototype, "cvUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ApplicantStage, default: ApplicantStage.APPLIED }),
    __metadata("design:type", String)
], Applicant.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Applicant.prototype, "notes", void 0);
exports.Applicant = Applicant = __decorate([
    (0, typeorm_1.Entity)('applicants')
], Applicant);
//# sourceMappingURL=job-posting.entity.js.map