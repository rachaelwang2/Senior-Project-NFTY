import 'dotenv/config';
import * as child_process from 'child_process';

import * as appRootPath from 'app-root-path';

const opts: child_process.ExecSyncOptions = { cwd: `${appRootPath}`, stdio: 'inherit' };

child_process.execSync('cp -r polyfills/ node_modules/');
child_process.execSync('npx pod-install', { stdio: 'inherit' });
