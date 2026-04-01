<?php

namespace App\Controller\Prof;

use App\Entity\TaskProgress;
use App\Entity\Message;
use App\Entity\Announcement;
use App\Entity\SAEInstance;
use App\Entity\User;
use App\Entity\Groupe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProfDashboardController extends AbstractController
{
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_TEACHER');
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        // 📚 SAE du prof
        $saeInstances = $em->getRepository(SAEInstance::class)->findBy([
            'teacher' => $user
        ]);

        // 📊 PROGRESSION MOYENNE (CORRECTE)

$taskProgressList = $em->getRepository(TaskProgress::class)->findAll();

$groupProgress = [];

foreach ($taskProgressList as $progress) {

    $task = $progress->getTask();
    if (!$task) continue;

    $saeInstance = $task->getSaeInstance();
    if (!$saeInstance) continue;

    // 👉 On garde seulement les SAE du prof connecté
    if ($saeInstance->getTeacher()?->getId() !== $user->getId()) {
        continue;
    }

    $groupId = $progress->getGroupe()?->getId();

    if (!$groupId) continue;

    if (!isset($groupProgress[$groupId])) {
        $groupProgress[$groupId] = [
            'done' => 0,
            'total' => 0
        ];
    }

    $groupProgress[$groupId]['total']++;

    if ($progress->isDone()) {
        $groupProgress[$groupId]['done']++;
    }
}

// 📊 moyenne globale
$total = 0;
$count = 0;

foreach ($groupProgress as $g) {
    if ($g['total'] > 0) {
        $total += ($g['done'] / $g['total']) * 100;
        $count++;
    }
}

$progressionMoyenne = $count > 0 ? $total / $count : 0;

        // 💬 messages non lus
        $messagesNonLus = $em->getRepository(Message::class)->count([
            'receiver' => $user,
            'isRead' => false
        ]);

        // 📢 annonces
        $annonces = $em->getRepository(Announcement::class)->count([
            'author' => $user
        ]);

        // 📚 SAE en cours
        $saeEnCours = $em->getRepository(SAEInstance::class)->count([
            'teacher' => $user,
            'status' => 'en cours'
        ]);

        // 👥 étudiants
        $nbStudents = $em->getRepository(User::class)->count([
            // si tu as ROLE_STUDENT
        ]);

        // 👥 groupes
        $nbGroupes = $em->getRepository(Groupe::class)->count([]);

        return $this->json([
            'progression_moyenne' => round($progressionMoyenne),
            'messages_non_lus' => $messagesNonLus,
            'annonces' => $annonces,
            'sae_en_cours' => $saeEnCours,
            'nb_etudiants' => $nbStudents,
            'nb_groupes' => $nbGroupes
        ]);
    }
}