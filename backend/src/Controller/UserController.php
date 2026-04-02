<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/students', name: 'api_students_list', methods: ['GET'])]
    public function list(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        $data = [];

        foreach ($users as $u) {
            // 👉 filtrer uniquement les étudiants
            if (!in_array('ROLE_STUDENT', $u->getRoles())) {
                continue;
            }

            $data[] = [
                'id' => $u->getId(),
                'firstName' => $u->getFirstName(),
                'lastName' => $u->getLastName(),
                'email' => $u->getEmail(),
                'year' => $u->getYear(),
                'parcours' => $u->getParcours(),
            ];
        }

        return $this->json($data);
    }
}