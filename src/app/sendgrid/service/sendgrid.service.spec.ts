import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';
import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with success', async () => {
      //Arrange
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: 'Roberio',
                email: 'roberio@test.com',
              },
            ],
          },
        ],
        from: {
          name: 'detinatario',
          email: 'detinatio@test.com',
        },
        reply_to: {
          name: 'Roberio',
          email: 'roberio@test.com',
        },
        subject: 'bla bla bla',
        content: [
          {
            type: 'text/html',
            value: '<p>bla bla bla</p>',
          },
        ],
      };
      jest.spyOn(httpService, 'post').mockReturnValueOnce(
        of({
          status: 202,
          statusText: 'ACCEPTED',
          config: {},
          headers: {},
          data: '',
        }),
      );
      //Act
      const result = await sendGridService.sendEmail(data);
      //Assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
