"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const incident_entity_1 = require("./entities/incident.entity");
const hse_service_1 = require("./hse.service");
const hse_controller_1 = require("./hse.controller");
let HseModule = class HseModule {
};
exports.HseModule = HseModule;
exports.HseModule = HseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([incident_entity_1.Incident])],
        controllers: [hse_controller_1.HseController],
        providers: [hse_service_1.HseService],
        exports: [hse_service_1.HseService],
    })
], HseModule);
//# sourceMappingURL=hse.module.js.map