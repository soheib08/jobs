import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ImportsController (e2e)', () => {
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

  describe('POST /imports', () => {
    it('should create a new import request', () => {
      return request(app.getHttpServer())
        .post('/imports')
        .send({ bookId: '456', type: 'word', url: 'http://example.com' })
        .expect(201);
    });

    it('should return an error for invalid request', () => {
      return request(app.getHttpServer())
        .post('/imports')
        .send({ bookId: '456', type: 'invalid', url: 'http://example.com' })
        .expect(400);
    });
  });

  describe('GET /imports', () => {
    it('should return a list of import requests', () => {
      return request(app.getHttpServer())
        .get('/imports')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('pending'||'finished');
        });
    });
  });
});
