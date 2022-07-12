import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';

@Injectable()
export class SendgridService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(data: SendEmailInterface): Promise<boolean> {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const config: AxiosRequestConfig = {
      headers: {
        Authorization:
          'Bearer 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',
      },
    };
    const response = await lastValueFrom(
      this.httpService.post(url, data, config),
    );
    console.log(response.data);
    return response.status == HttpStatus.ACCEPTED;
  }
}
