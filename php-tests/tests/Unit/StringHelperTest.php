<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../src/StringHelper.php';

class StringHelperTest extends TestCase
{
    public function test_truncate_returns_shortened_text(): void
    {
        $this->assertEquals(
            "Hola...",
            truncate("Hola Mundo", 4)
        );
    }

    public function test_truncate_throws_exception(): void
    {
        $this->expectException(InvalidArgumentException::class);

        truncate("Hola", 0);
    }

    public function test_to_slug_returns_slug(): void
    {
        $this->assertEquals(
            "hola-mundo-2024",
            toSlug("¡Hola Mundo! 2024")
        );
    }

    public function test_count_words_returns_total(): void
    {
        $this->assertEquals(
            4,
            countWords("Hola mundo desde PHP")
        );
    }
}