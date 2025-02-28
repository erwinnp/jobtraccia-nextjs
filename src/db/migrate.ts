import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '.';

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });
    console.log('✅ Migrations completed!');
  } catch (err) {
    console.log('❌ Migrations error: ', err);
    process.exit(1);
  }
};

main();
