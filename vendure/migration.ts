require('dotenv').config({ path: process.env.ENV_FILE || '.env.test' });

import {
  generateMigration,
  revertLastMigration,
  runMigrations,
} from '@vendure/core';
import program from 'commander';
import { config } from './src/vendure-config';

console.log(
  `MIGRATING FOR DATABASE \x1b[46m ${process.env.DATABASE_NAME} \x1b[0m`
);

program
  .command('generate <name>')
  .description('Generate a new migration file with the given name')
  .action((name) => {
    return generateMigration(config, { name, outputDir: './migrations' });
  });

program
  .command('run')
  .description('Run all pending migrations')
  .action(() => {
    return runMigrations(config);
  });

program
  .command('revert')
  .description('Revert the last applied migration')
  .action(() => {
    return revertLastMigration(config);
  });

program.parse(process.argv);
