<?php 
namespace App\Service;

class ProgressService
{
    public function calculate(int $done, int $total): int
    {
        if ($total === 0) return 0;

        return intval(($done / $total) * 100);
    }
}