"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanTier = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPERADMIN"] = "SUPERADMIN";
    UserRole["OWNER"] = "OWNER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PROJECT_MANAGER"] = "PROJECT_MANAGER";
    UserRole["FINANCE_MANAGER"] = "FINANCE_MANAGER";
    UserRole["HR_MANAGER"] = "HR_MANAGER";
    UserRole["PROCUREMENT_OFFICER"] = "PROCUREMENT_OFFICER";
    UserRole["SITE_ENGINEER"] = "SITE_ENGINEER";
    UserRole["SALES_MANAGER"] = "SALES_MANAGER";
    UserRole["ACCOUNTANT"] = "ACCOUNTANT";
    UserRole["CLIENT"] = "CLIENT";
    UserRole["SUBCONTRACTOR"] = "SUBCONTRACTOR";
})(UserRole || (exports.UserRole = UserRole = {}));
var PlanTier;
(function (PlanTier) {
    PlanTier["STARTER"] = "STARTER";
    PlanTier["PROFESSIONAL"] = "PROFESSIONAL";
    PlanTier["ENTERPRISE"] = "ENTERPRISE";
})(PlanTier || (exports.PlanTier = PlanTier = {}));
//# sourceMappingURL=jwt-payload.interface.js.map