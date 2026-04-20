"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const ds = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'constructos',
});
async function main() {
    await ds.initialize();
    const email = process.env.SUPERADMIN_EMAIL || 'admin@constructos.app';
    const password = process.env.SUPERADMIN_PASSWORD || 'Admin@1234';
    const firstName = 'Super';
    const lastName = 'Admin';
    const existing = await ds.query(`SELECT id FROM users WHERE email = $1`, [
        email,
    ]);
    if (existing.length > 0) {
        console.log(`✓ SuperAdmin already exists: ${email}`);
        await ds.destroy();
        return;
    }
    const hash = await bcrypt.hash(password, 12);
    await ds.query(`
    INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_super_admin, status, tenant_id, created_at, updated_at)
    VALUES (gen_random_uuid(), $1, $2, $3, $4, 'SUPERADMIN', true, 'active', NULL, NOW(), NOW())
  `, [email, hash, firstName, lastName]);
    console.log('✅ SuperAdmin created!');
    console.log(`   Email   : ${email}`);
    console.log(`   Password: ${password}`);
    await ds.destroy();
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed-superadmin.js.map