<?php 
namespace App\Service\Formatter;

use App\Entity\FAQ;

class FAQFormatter
{
    public function format($faq): array
    {
        return [
            'question' => $faq->getQuestion(),
            'answer' => $faq->getAnswer()
        ];
    }
}