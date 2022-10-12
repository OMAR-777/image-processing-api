import app from '../app';
import supertest from 'supertest';

describe('Testing image processing endpoint query validation:', () => {
  const filename = 'fjord';
  const notExistFileName = 'fjordddd';

  it('returns status code 400 with no filename provided', async () => {
    await supertest(app).get('/').expect(400);
  });

  it('returns status code 400 with a filename that does not exist', async () => {
    await supertest(app).get(`/?filename=${notExistFileName}`).expect(400);
  });

  it('returns status code 200 with a filename that exist', async () => {
    await supertest(app).get(`/?filename=${filename}`).expect(200);
  });

  it('returns status code 400 provided a filename with only width', async () => {
    await supertest(app).get(`/?filename=${filename}&width=150`).expect(400);
  });

  it('returns status code 400 provided a filename with only height', async () => {
    await supertest(app).get(`/?filename=${filename}&height=150`).expect(400);
  });

  it('returns status code 400 provided a filename with height and width set more than 5000 ', async () => {
    await supertest(app)
      .get(`/?filename=${filename}&height=5001&width=5001`)
      .expect(400);
  });

  it('returns status code 200 provided a filename with height and width set 5000 or less ', async () => {
    await supertest(app)
      .get(`/?filename=${filename}&height=150&width=150`)
      .expect(200);
  });
});
