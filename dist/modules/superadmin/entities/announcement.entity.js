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
exports.Announcement = exports.AnnouncementType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var AnnouncementType;
(function (AnnouncementType) {
    AnnouncementType["INFO"] = "info";
    AnnouncementType["WARNING"] = "warning";
    AnnouncementType["MAINTENANCE"] = "maintenance";
})(AnnouncementType || (exports.AnnouncementType = AnnouncementType = {}));
let Announcement = class Announcement extends base_entity_1.BaseEntity {
    title;
    message;
    type;
    isActive;
    expiresAt;
    targetTenantIds;
};
exports.Announcement = Announcement;
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Announcement.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AnnouncementType, default: AnnouncementType.INFO }),
    __metadata("design:type", String)
], Announcement.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Announcement.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Announcement.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_tenant_ids', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Announcement.prototype, "targetTenantIds", void 0);
exports.Announcement = Announcement = __decorate([
    (0, typeorm_1.Entity)('announcements')
], Announcement);
//# sourceMappingURL=announcement.entity.js.map