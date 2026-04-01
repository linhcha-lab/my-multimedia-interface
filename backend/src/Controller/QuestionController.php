<?php

namespace App\Controller;

use App\Entity\Question; // ✅ AJOUT ICI
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class QuestionController extends AbstractController
{
    #[Route('/api/questions', methods: ['POST'])]
    public function send(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $question = new Question();
        $question->setEmail($data['email']);
        $question->setContent($data['content']);
$question->setCreatedAt(new \DateTime());
        $em->persist($question);
        $em->flush();

        return $this->json(['message' => 'Question envoyée']);
    }
}