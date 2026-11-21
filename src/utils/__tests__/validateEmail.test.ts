import { validateEmail } from '..';

describe('validateEmail', () => {
    // Users reported they could not log in with these emails (see TEST_SCRIPT.md)
    it('accepts Luigi Carluccio email with a two-letter country domain (.it)', () => {
        expect(validateEmail('luigi@carluccio.it')).toBe(true);
    });

    it('accepts John Silva email with a multi-part country domain (.com.br)', () => {
        expect(validateEmail('john@silva.com.br')).toBe(true);
    });

    it.each(['elif.aksit@example.com', 'user@domain.ca', 'first.last@sub.domain.org', 'name@company.info'])(
        'accepts valid email %s',
        (email) => {
            expect(validateEmail(email)).toBe(true);
        }
    );

    it('accepts an email with surrounding spaces and uppercase letters', () => {
        expect(validateEmail('  Luigi@Carluccio.IT ')).toBe(true);
    });

    it.each([
        '',
        'luigi',
        'luigi@',
        '@carluccio.it',
        'luigi@carluccio',
        'luigi@carluccio.',
        'luigi carluccio@test.com',
        'john@silva',
        'john@silva.com.',
        'john@silva..br',
        'john@silva.com.b',
        'john silva@silva.com.br',
    ])('rejects invalid email "%s"', (email) => {
        expect(validateEmail(email)).toBe(false);
    });
});
