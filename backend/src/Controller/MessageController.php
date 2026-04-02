<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    #[Route('/api/messages', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $messages = $em->getRepository(Message::class)->createQueryBuilder('m')
            ->where('m.sender = :user OR m.receiver = :user')
            ->setParameter('user', $user)
            ->orderBy('m.createdAt', 'ASC')
            ->getQuery()
            ->getResult();

        return $this->json(array_map(function ($m) use ($user) {
            return [
                'id' => $m->getId(),
                'content' => $m->getContent(),
                'fromMe' => $m->getSender()->getId() === $user->getId(),

                // 🔥 AJOUT IMPORTANT
                'isRead' => $m->isRead(),

                'sender' => [
                    'id' => $m->getSender()->getId(),
                    'firstname' => $m->getSender()->getFirstName(),
                    'lastname' => $m->getSender()->getLastName(),
                    'email' => $m->getSender()->getEmail(),
                ],

                'receiver' => [
                    'id' => $m->getReceiver()->getId(),
                    'firstname' => $m->getReceiver()->getFirstName(),
                    'lastname' => $m->getReceiver()->getLastName(),
                    'email' => $m->getReceiver()->getEmail(),
                ],

                'createdAt' => $m->getCreatedAt()->format('H:i'),
            ];
        }, $messages));
    }

    #[Route('/api/messages', methods: ['POST'])]
    public function send(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['receiver_id']) || !isset($data['content'])) {
            return $this->json(['error' => 'Données invalides'], 400);
        }

        $receiver = $em->getRepository(User::class)->find($data['receiver_id']);

        if (!$receiver) {
            return $this->json(['error' => 'Destinataire introuvable'], 404);
        }

        $message = new Message();
        $message->setContent($data['content']);
        $message->setSender($user);
        $message->setReceiver($receiver);
        $message->setIsRead(false); // 🔥 important
        $message->setCreatedAt(new \DateTime());

        $em->persist($message);
        $em->flush();

        return $this->json(['message' => 'Envoyé']);
    }

    // 🔥 MARQUER UN MESSAGE COMME LU
    #[Route('/api/messages/{id}/read', methods: ['POST'])]
    public function markAsRead(Message $message, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        // sécurité : seul le receiver peut marquer comme lu
        if ($message->getReceiver()->getId() !== $user->getId()) {
            return $this->json(['error' => 'Non autorisé'], 403);
        }

        $message->setIsRead(true);
        $em->flush();

        return $this->json(['message' => 'Lu']);
    }

    // 🔥 BONUS : marquer tous les messages comme lus
    #[Route('/api/messages/read-all', methods: ['POST'])]
    public function markAllAsRead(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $messages = $em->getRepository(Message::class)->findBy([
            'receiver' => $user,
            'isRead' => false
        ]);

        foreach ($messages as $message) {
            $message->setIsRead(true);
        }

        $em->flush();

        return $this->json(['message' => 'Tous lus']);
    }
}