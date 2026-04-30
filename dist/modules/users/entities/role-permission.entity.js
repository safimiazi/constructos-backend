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
exports.CustomRole = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let CustomRole = class CustomRole extends base_entity_1.TenantBaseEntity {
    name;
    description;
    permissions;
    isActive;
};
exports.CustomRole = CustomRole;
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], CustomRole.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CustomRole.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '{}' }),
    __metadata("design:type", Object)
], CustomRole.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], CustomRole.prototype, "isActive", void 0);
exports.CustomRole = CustomRole = __decorate([
    (0, typeorm_1.Entity)('custom_roles')
], CustomRole);
//# sourceMappingURL=role-permission.entity.js.map