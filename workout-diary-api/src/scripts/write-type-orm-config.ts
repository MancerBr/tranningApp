import * as fs from 'fs';

import { config } from '../config/config';

fs.writeFileSync('ormconfig.json',
  JSON.stringify(config.getTypeOrmConfig(), null, 2),
);
