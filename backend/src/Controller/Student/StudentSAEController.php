<?php

namespace App\Controller\Student;

use App\Entity\SAEInstance;
use App\Entity\Task;
use App\Entity\Resource;
use App\Entity\Submission;
use App\Entity\Announcement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class StudentSAEController extends AbstractController
{
    // 🔥 LISTE DES SAE (optionnel si tu l’as déjà)
   public function list(EntityManagerInterface $em): JsonResponse
{
    $saes = $em->getRepository(SAEInstance::class)->findAll();

    $data = array_map(function ($sae) {
        return [
            'id' => $sae->getId(),
            'title' => $sae->getSae()->getTitle(),
            'status' => $sae->getStatus(),
            'date_fin' => $sae->getEndDate()?->format('Y-m-d')
        ];
    }, $saes);

    return $this->json($data);
}

    // 🔥 SAE COMPLET (IMPORTANT)
    public function show(SAEInstance $sae, EntityManagerInterface $em): JsonResponse
{
    $tasks = $em->getRepository(Task::class)->findBy([
        'saeInstance' => $sae
    ]);

    $resources = $em->getRepository(Resource::class)->findBy([
        'saeInstance' => $sae
    ]);

    $submissions = $em->getRepository(Submission::class)->findBy([
        'saeInstance' => $sae
    ]);

    $announcements = $em->getRepository(Announcement::class)->findBy([
        'saeInstance' => $sae
    ]);

    return $this->json([
        'id' => $sae->getId(),
        'title' => $sae->getSae()->getTitle(),
        'description' => $sae->getSae()->getDescription(),
        'status' => $sae->getStatus(),

        'tasks' => array_map(fn($t) => [
            'id' => $t->getId(),
            'title' => $t->getTitle()
        ], $tasks),

        'resources' => array_map(fn($r) => [
            'title' => $r->getTitle(),
            'file' => $r->getFilePath()
        ], $resources),

        'submissions' => array_map(fn($s) => [
            'title' => $s->getTitle(),
            'dueDate' => $s->getDueDate()->format('Y-m-d')
        ], $submissions),

        'announcements' => array_map(fn($a) => [
            'title' => $a->getTitle(),
            'content' => $a->getContent()
        ], $announcements),
    ]);
}
}