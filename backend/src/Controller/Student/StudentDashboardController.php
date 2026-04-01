<?php

namespace App\Controller\Student;

use App\Entity\TaskProgress;
use App\Entity\Message;
use App\Entity\Announcement;
use App\Entity\Submission;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class StudentDashboardController extends AbstractController
{
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_STUDENT');
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        // 🔥 Progression moyenne
        $progress = $em->getRepository(TaskProgress::class)->findBy(['student' => $user]);

        $done = 0;
        foreach ($progress as $p) {
            if ($p->isDone()) {
                $done++;
            }
        }

        $progression = count($progress) > 0 ? ($done / count($progress)) * 100 : 0;

        // 🔔 Notifications simples
        $messages = $em->getRepository(Message::class)->count(['receiver' => $user]);
        $annonces = $em->getRepository(Announcement::class)->count([]);
        $notifications = $messages + $annonces;

        // 📅 Prochains rendus
        $now = new \DateTime();
        $limit = (new \DateTime())->modify('+15 days');

        $submissions = $em->getRepository(Submission::class)->findAll();

        $prochains = [];
        foreach ($submissions as $sub) {
            if ($sub->getDueDate() <= $limit && $sub->getDueDate() >= $now) {
                $prochains[] = [
                    'title' => $sub->getTitle(),
                    'date' => $sub->getDueDate()->format('Y-m-d')
                ];
            }
        }

        return $this->json([
            'progression' => round($progression),
            'notifications' => $notifications,
            'prochains_rendus' => $prochains
        ]);
    }
}