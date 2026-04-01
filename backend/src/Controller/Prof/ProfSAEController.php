<?php

namespace App\Controller\Prof;

use App\Entity\SAEInstance;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProfSAEController extends AbstractController
{
    #[Route('/api/prof/sae', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
{
    $saes = $em->getRepository(SAEInstance::class)->findAll();

    $data = array_map(fn($saeInstance) => [
        'id' => $saeInstance->getId(),
        'title' => $saeInstance->getSae()->getTitle(),
        'description' => $saeInstance->getSae()->getDescription(),
    ], $saes);

    return $this->json($data);
}
}