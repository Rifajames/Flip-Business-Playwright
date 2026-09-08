import type { RegistrationData } from '../pages/signup.page';

export const validRegistration = (): RegistrationData => ({
  fullName: `Account Test ${Date.now()}`,
  businessEmail: `account.test.${Date.now()}@yopmail.com`,
  businessName: `Account Business ${Date.now()}`,
  businessType: 'Badan Usaha',
  flipId: `aacount_test_${Date.now()}`,
  phone: '081234567890',
  password: 'p@ssW0rd123',
});
