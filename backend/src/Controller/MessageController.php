<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class MessageController extends AbstractController
{
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();

        $messages = $em->getRepository(Message::class)->createQueryBuilder('m')
            ->where('m.sender = :user OR m.receiver = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }


        return $this->json($messages);
    }

    public function send(Request $request, EntityManagerInterface $em): JsonResponse
    {
       $user = $this->getUser();
        
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);

        $receiver = $em->getRepository(User::class)->find($data['receiver_id']);

        if (!$receiver) {
            return $this->json(['error' => 'Destinataire introuvable'], 404);
        }

        $message = new Message();
        $message->setContent($data['content']);
        $message->setSender($user);
        $message->setReceiver($receiver);
        $message->setIsRead(false);
        $message->setCreatedAt(new \DateTime());

        $em->persist($message);
        $em->flush();

        return $this->json(['message' => 'Envoyé']);
    }

    public function markAsRead(Message $message, EntityManagerInterface $em): JsonResponse
    {
        $message->setIsRead(true);
        $em->flush();

        return $this->json(['message' => 'Lu']);
    }
}