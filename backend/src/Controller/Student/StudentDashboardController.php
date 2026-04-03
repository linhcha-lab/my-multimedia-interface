<?php

namespace App\Controller\Student;

use App\Entity\Task;
use App\Entity\TaskProgress;
use App\Entity\Message;
use App\Entity\Announcement;
use App\Entity\Submission;
use App\Entity\SAEInstance;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class StudentDashboardController extends AbstractController
{
    #[Route('/api/student/dashboard', name: 'student_dashboard', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        //////////////////////////////////////////////////////
        // 🔐 SÉCURITÉ
        //////////////////////////////////////////////////////
        if (!$this->isGranted('ROLE_STUDENT') && !$this->isGranted('ROLE_TEACHER')) {
            return $this->json(['error' => 'Accès refusé'], 403);
        }

        $user = $this->getUser();

        //////////////////////////////////////////////////////
        // 🎯 PROGRESSION GLOBALE (toutes tâches)
        //////////////////////////////////////////////////////
        $progress = $em->getRepository(TaskProgress::class)
            ->findBy(['student' => $user]);

        $done = 0;
        foreach ($progress as $p) {
            if ($p->isDone()) $done++;
        }

        $progression = count($progress) > 0
            ? round(($done / count($progress)) * 100)
            : 0;

        //////////////////////////////////////////////////////
        // 🎯 PROGRESSION DES 2 SAE (les plus anciennes)
        //////////////////////////////////////////////////////
        $saeInstances = $em->getRepository(SAEInstance::class)
            ->createQueryBuilder('s')
            ->orderBy('s.startDate', 'ASC')
            ->setMaxResults(2)
            ->getQuery()
            ->getResult();

        $progressionsSAE = [];

        foreach ($saeInstances as $saeInstance) {

            $tasks = $em->getRepository(Task::class)->findBy([
                'saeInstance' => $saeInstance
            ]);

            $done = 0;
            $total = count($tasks);

            foreach ($tasks as $task) {
                $progress = $em->getRepository(TaskProgress::class)->findOneBy([
                    'task' => $task,
                    'student' => $user
                ]);

                if ($progress && $progress->isDone()) {
                    $done++;
                }
            }

            $progressionsSAE[] = [
                'code' => $saeInstance->getSae()?->getCode() ?? "SAE",
                'progression' => $total > 0 ? round(($done / $total) * 100) : 0
            ];
        }

        //////////////////////////////////////////////////////
        // 🔔 NOTIFICATIONS
        //////////////////////////////////////////////////////
        $messagesNonLus = $em->getRepository(Message::class)->count([
            'receiver' => $user,
            'isRead' => false
        ]);

        // ⚠️ simple : toutes les annonces
        $annonces = $em->getRepository(Announcement::class)->count([]);

        $notifications = $messagesNonLus + $annonces;

        //////////////////////////////////////////////////////
        // 💬 MESSAGES RÉCENTS
        //////////////////////////////////////////////////////
        $messages = $em->getRepository(Message::class)
            ->createQueryBuilder('m')
            ->where('m.receiver = :user')
            ->setParameter('user', $user)
            ->orderBy('m.createdAt', 'DESC')
            ->setMaxResults(3)
            ->getQuery()
            ->getResult();

        $messagesData = [];

        foreach ($messages as $m) {
            $messagesData[] = [
                'id' => $m->getId(),
                'name' => $m->getSender()->getFirstName(),
                'unread' => !$m->isRead()
            ];
        }

        //////////////////////////////////////////////////////
        // 📅 PROCHAINS RENDUS
        //////////////////////////////////////////////////////
        $now = new \DateTime();

        $submissions = $em->getRepository(Submission::class)->findAll();

        $prochains = [];

        foreach ($submissions as $sub) {
            if ($sub->getDueDate() > $now) {
                $prochains[] = [
                    'title' => $sub->getTitle(),
                    'date' => $sub->getDueDate()->format('Y-m-d')
                ];
            }
        }

        //////////////////////////////////////////////////////
        // 🎓 PROGRESSION SEMESTRE (CORRIGÉE)
        //////////////////////////////////////////////////////
        $semestreProgression = 0;

        // 🔥 On récupère TOUTES les SAE du user (sans risque SQL)
        $saeAll = $em->getRepository(SAEInstance::class)->findAll();

        $totalSAE = 0;
        $completedSAE = 0;

        foreach ($saeAll as $saeInstance) {
           
            $sae = $saeInstance->getSae();

            // sécurité
            if (!$sae) continue;

            // filtre année + parcours
            if (
                $sae->getYear() != $user->getYear() ||
                $sae->getParcours() != $user->getParcours()
            ) {
                continue;
            }

            $totalSAE++;

            $tasks = $em->getRepository(Task::class)->findBy([
                'saeInstance' => $saeInstance

                
            ]);

            dump([
    'USER' => $user->getId(),
    'SAE' => $sae->getCode(),
    'TASK_ID' => $task->getId(),
    'PROGRESS_FOUND' => $progress ? true : false,
    'IS_DONE' => $progress ? $progress->isDone() : null
]);

            $total = count($tasks);
            $done = 0;

            foreach ($tasks as $task) {
                $progress = $em->getRepository(TaskProgress::class)->findOneBy([
                    'task' => $task,
                    'student' => $user
                ]);

                if ($progress && $progress->isDone()) {
                    $done++;
                }
            }

            if ($total > 0 && $done === $total) {
                $completedSAE++;
            }
        }

        if ($totalSAE > 0) {
            $semestreProgression = round(($completedSAE / $totalSAE) * 100);
        }

        //////////////////////////////////////////////////////
        // 🚀 RESPONSE
        //////////////////////////////////////////////////////
        return $this->json([
            'progression' => $progression,
            'progressions_sae' => $progressionsSAE,
            'notifications' => $notifications,
            'messages' => $messagesData,
            'prochains_rendus' => $prochains,
            'semestre_progression' => $semestreProgression
        ]);
    }
}