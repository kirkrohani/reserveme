describe('Health', () => {
  test('Reservations response OK', async () => {
    const response = await fetch('http://reservations:3000');
    expect(response.ok).toBeTruthy();
  });
});

describe('Health', () => {
  test('Auth response OK', async () => {
    const response = await fetch('http://auth:3003');
    expect(response.ok).toBeTruthy();
  });
});
