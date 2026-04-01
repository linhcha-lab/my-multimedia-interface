<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class Prof/ProfDashboardControllerTest extends WebTestCase
{
    public function testIndex(): void
    {
        $client = static::createClient();
        $client->request('GET', '/prof/prof/dashboard');

        self::assertResponseIsSuccessful();
    }
}
