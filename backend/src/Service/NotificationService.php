<?php
namespace App\Service;

class NotificationService
{
    public function calculate(
        int $messages,
        int $announcements,
        int $deadlines
    ): int {
        return $messages + $announcements + $deadlines;
    }
}