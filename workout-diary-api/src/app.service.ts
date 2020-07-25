import { Injectable } from '@nestjs/common';

// @ts-ignore
import {version, name} from '../package.json';

@Injectable()
export class AppService {
  getInform(): string {
    return `${name} v.${version}`;
  }
}
