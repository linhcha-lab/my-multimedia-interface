<?php

namespace App\Controller;

use App\Entity\Task;
use App\Entity\TaskProgress;
use App\Repository\TaskRepository;
use App\Repository\TaskProgressRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;

class TaskController extends AbstractController
{
    public function toggle(
        int $id,
        TaskRepository $taskRepo,
        TaskProgressRepository $progressRepo,
        EntityManagerInterface $em,
        Security $security
    ): JsonResponse {

        $user = $security->getUser();

        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        /////////////////////////////////////////////////////////////
        // 🔥 récupérer la tâche
        /////////////////////////////////////////////////////////////
        $task = $taskRepo->find($id);

        if (!$task) {
            return $this->json(['error' => 'Task not found'], 404);
        }

        /////////////////////////////////////////////////////////////
        // 🔥 récupérer ou créer progression
        /////////////////////////////////////////////////////////////
        $progress = $progressRepo->findOneBy([
            'task' => $task,
            'student' => $user
        ]);

        if (!$progress) {
            $progress = new TaskProgress();
            $progress->setTask($task);
            $progress->setStudent($user);
            $progress->setIsDone(true);
            $progress->setUpdatedAt(new \DateTime());

            $em->persist($progress);
        } else {
            $progress->setIsDone(!$progress->isDone());
            $progress->setUpdatedAt(new \DateTime());
        }

        $em->flush();

        return $this->json([
            'success' => true,
            'done' => $progress->isDone()
        ]);
    }
}