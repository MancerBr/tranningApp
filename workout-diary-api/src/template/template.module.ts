import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template } from './template.entity';


@Module({
  providers: [TemplateService],
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
})
export class TemplateModule {}
