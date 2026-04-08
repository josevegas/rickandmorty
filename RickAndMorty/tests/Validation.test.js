import { describe, it, expect } from 'vitest';
import Validation from './Validation';

describe('Validation Logic', () => {
  it('should return error for empty email', () => {
    const errors = Validation({ email: '', password: 'Password123' });
    expect(errors.email).toBe('No puede ser vacío');
  });

  it('should return error for invalid email format', () => {
    const errors = Validation({ email: 'not-an-email', password: 'Password123' });
    expect(errors.email).toBe('Debe ser un email');
  });

  it('should return error for password without numbers', () => {
    const errors = Validation({ email: 'rick@c137.com', password: 'NoNumbersHere' });
    expect(errors.password).toContain('un número');
  });

  it('should return no errors for valid credentials', () => {
    const errors = Validation({ email: 'rick@c137.com', password: 'Password123' });
    expect(errors).toEqual({});
  });
});
