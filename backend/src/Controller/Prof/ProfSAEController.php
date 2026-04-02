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
        // 🔐 Récup utilisateur depuis JWT
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié'
            ], 401);
        }

        // 🧠 DEBUG IMPORTANT
        // dd($user->getId());

        // ✅ Filtrer par teacher connecté
        $saes = $em->getRepository(SAEInstance::class)->findBy([
            'teacher' => $user
        ]);

        $data = [];

        foreach ($saes as $saeInstance) {
            $sae = $saeInstance->getSae();

            $data[] = [
                'id' => $saeInstance->getId(),
                'code' => $sae->getCode(),
                'titre' => $sae->getTitle(),
                'semestre' => 'S' . $sae->getSemester(),

                // ⚠️ mapping status DB → front
                'etat' => $this->mapStatus($saeInstance->getStatus()),

                // (temp)
                'progression' => rand(0, 100),
                'groupes' => rand(1, 5),

                'echeance' => $saeInstance->getEndDate()->format('Y-m-d'),
            ];
        }

        return $this->json($data);
    }

    ///////////////////////////////////////////////////////////
    // 🧠 CONVERSION STATUS DB → FRONT
    ///////////////////////////////////////////////////////////

    private function mapStatus(string $status): string
    {
        return match ($status) {
            'ongoing', 'in_progress' => 'en_cours',
            'finished', 'completed' => 'termine',
            'upcoming' => 'a_venir',
            default => 'a_venir'
        };
    }
}