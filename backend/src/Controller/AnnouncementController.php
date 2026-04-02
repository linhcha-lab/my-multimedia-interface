<?php

namespace App\Controller;

use App\Repository\AnnouncementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AnnouncementController extends AbstractController
{
    #[Route('/api/announcements', name: 'api_announcements_list', methods: ['GET'])]
    public function list(AnnouncementRepository $announcementRepository): JsonResponse
    {
        $announcements = $announcementRepository->findAll();

        $data = [];

        foreach ($announcements as $a) {
            $data[] = [
                'id' => $a->getId(),
                'title' => $a->getTitle(),
                'content' => $a->getContent(),
                'createdAt' => $a->getCreatedAt()->format('Y-m-d H:i:s'),
                'author' => $a->getAuthor()->getId(), // ou email si tu veux
                'sae' => $a->getSaeInstance()->getId()
            ];
        }

        return $this->json($data);
    }
}