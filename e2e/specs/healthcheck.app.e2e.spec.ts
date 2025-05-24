describe('RESERVATIONS HEALTH', () => {
  test('Reservations response OK', async () => {
    const response = await fetch('http://reservations:3000');
    expect(response.ok).toBeTruthy();
  });
});

describe('AUTH HEALTH', () => {
  test('Auth response OK', async () => {
    const response = await fetch('http://auth:3001');
    expect(response.ok).toBeTruthy();
  });
});
