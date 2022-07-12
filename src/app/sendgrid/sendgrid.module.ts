import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SendgridService } from './service/sendgrid.service';

@Module({
  imports: [HttpModule],
  providers: [SendgridService],
})
export class SendgridModule {}
