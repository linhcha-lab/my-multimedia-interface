<?php

namespace App\Controller\Student;

use App\Entity\SAEInstance;
use App\Entity\Task;
use App\Entity\Resource;
use App\Entity\Submission;
use App\Entity\Announcement;
use App\Entity\TaskProgress;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class StudentSAEController extends AbstractController
{
    /////////////////////////////////////////////////////////////
    // 🔥 LISTE DES SAE (avec progression)
    /////////////////////////////////////////////////////////////
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        $saes = $em->getRepository(SAEInstance::class)->findAll();

        $taskRepo = $em->getRepository(Task::class);
        $progressRepo = $em->getRepository(TaskProgress::class);

        $data = array_map(function ($sae) use ($taskRepo, $progressRepo, $user) {

            $tasks = $taskRepo->findBy([
                'saeInstance' => $sae
            ]);

            $doneCount = 0;

            foreach ($tasks as $task) {
                $progress = $progressRepo->findOneBy([
                    'task' => $task,
                    'student' => $user
                ]);

                if ($progress && $progress->isDone()) {
                    $doneCount++;
                }
            }

            $total = count($tasks);

            $progression = $total > 0
                ? round(($doneCount / $total) * 100)
                : 0;

            return [
                'id' => $sae->getId(),
                'title' => $sae->getSae()->getTitle(),
                'status' => $sae->getStatus(),
                'date_fin' => $sae->getEndDate()?->format('Y-m-d'),
                'progression' => $progression,
                'code' => $sae->getSae()->getCode(),
                'semester' => $sae->getSae()->getSemester(),
            ];
        }, $saes);

        return $this->json($data);
    }

    /////////////////////////////////////////////////////////////
    // 🔥 DETAIL SAE
    /////////////////////////////////////////////////////////////
    public function show(SAEInstance $sae, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        $taskRepo = $em->getRepository(Task::class);
        $progressRepo = $em->getRepository(TaskProgress::class);

        /////////////////////////////////////////////////////////////
        // 🔥 TASKS
        /////////////////////////////////////////////////////////////
        $tasks = $taskRepo->findBy(
            ['saeInstance' => $sae],
            ['orderIndex' => 'ASC']
        );

        $taches = [];
        $doneCount = 0;

        foreach ($tasks as $task) {

            $progress = $progressRepo->findOneBy([
                'task' => $task,
                'student' => $user
            ]);

            $done = $progress ? $progress->isDone() : false;

            if ($done) $doneCount++;

            $taches[] = [
                'id' => $task->getId(),
                'label' => $task->getTitle(),
                'done' => $done
            ];
        }

        $total = count($tasks);

        $progression = $total > 0
            ? round(($doneCount / $total) * 100)
            : 0;

        /////////////////////////////////////////////////////////////
        // 🔥 AUTRES DONNÉES
        /////////////////////////////////////////////////////////////
        $resources = $em->getRepository(Resource::class)->findBy([
            'saeInstance' => $sae
        ]);

        $submissions = $em->getRepository(Submission::class)->findBy([
            'saeInstance' => $sae
        ]);

        $announcements = $em->getRepository(Announcement::class)->findBy([
            'saeInstance' => $sae
        ]);

        /////////////////////////////////////////////////////////////
        // 🔥 RESPONSE
        /////////////////////////////////////////////////////////////
        return $this->json([
            'id' => $sae->getId(),

            'code' => $sae->getSae()->getCode(),
            'title' => $sae->getSae()->getTitle(),
             'semester' => $sae->getSae()->getSemester(), // 🔥 CRUCIAL
            'description' => $sae->getSae()->getDescription(),

            'status' => $sae->getStatus(),
            'dateLimite' => $sae->getEndDate()?->format('Y-m-d'),
            'progression' => $progression,

            'taches' => $taches,

            'livrables' => array_map(fn($s) => [
                'id' => $s->getId(),
                'label' => $s->getTitle(),
                'deadline' => $s->getDueDate()?->format('Y-m-d')
            ], $submissions),

            'ressources' => array_map(fn($r) => [
                'id' => $r->getId(),
                'nom' => $r->getTitle(),
                'taille' => '—',
                'date' => date('Y-m-d'),
            ], $resources),

            'annonces' => array_map(fn($a) => [
                'id' => $a->getId(),
                'titre' => $a->getTitle(),
                'contenu' => $a->getContent(),
                'date' => date('Y-m-d'),
                'prof' => $a->getAuthor()?->getFirstName() . ' ' . $a->getAuthor()?->getLastName()
            ], $announcements),
        ]);
    }
}