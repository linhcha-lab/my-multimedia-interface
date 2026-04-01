<?php

namespace App\Controller;

use App\Entity\Notification;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class NotificationController extends AbstractController
{
    #[Route('/api/notifications', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $notifications = $em->getRepository(Notification::class)->findAll();

        return $this->json($notifications);
    }

    #[Route('/api/notifications/read-all', methods: ['PATCH'])]
    public function readAll(EntityManagerInterface $em): JsonResponse
    {
        $notifications = $em->getRepository(Notification::class)->findAll();

        foreach ($notifications as $notif) {
            $notif->setIsRead(true);
        }

        $em->flush();

        return $this->json(['message' => 'Toutes les notifications lues']);
    }
}