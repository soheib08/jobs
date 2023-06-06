import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ExportsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /exports', () => {
    it('should create a new export request', () => {
      return request(app.getHttpServer())
        .post('/exports')
        .send({ bookId: '123', type: 'epub' })
        .expect(201);
    });

    it('should return an error for invalid request', () => {
      return request(app.getHttpServer())
        .post('/exports')
        .send({ bookId: '123', type: 'invalid' })
        .expect(400);
    });
  });

  describe('GET /exports', () => {
    it('should return a list of export requests', () => {
      return request(app.getHttpServer())
        .get('/exports')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('pending'||'finished');
        });
    });
  });
});
