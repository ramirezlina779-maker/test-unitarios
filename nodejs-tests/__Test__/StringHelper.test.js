const {
    truncate,
    toSlug,
    countWords
} = require('../StringHelper');

describe('StringHelper', () => {

    test('truncate corta texto correctamente', () => {
        expect(truncate('Hola Mundo', 4))
            .toBe('Hola...');
    });

    test('truncate lanza error si maxLength es 0', () => {
        expect(() => truncate('Hola', 0))
            .toThrow();
    });

    test('toSlug convierte texto correctamente', () => {
        expect(toSlug('¡Hola Mundo! 2024'))
            .toBe('hola-mundo-2024');
    });

    test('countWords cuenta palabras', () => {
        expect(countWords('Hola mundo desde Node'))
            .toBe(4);
    });

});