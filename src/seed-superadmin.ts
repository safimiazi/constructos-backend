import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const ds = new DataSource({
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
  await ds.query(
    `
    INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_super_admin, status, tenant_id, created_at, updated_at)
    VALUES (gen_random_uuid(), $1, $2, $3, $4, 'SUPERADMIN', true, 'active', NULL, NOW(), NOW())
  `,
    [email, hash, firstName, lastName],
  );

  console.log('✅ SuperAdmin created!');
  console.log(`   Email   : ${email}`);
  console.log(`   Password: ${password}`);
  await ds.destroy();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
