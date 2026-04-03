<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class LoginController extends AbstractController
{
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }


    public function login(Request $request): JsonResponse
    {
        // 🔐 Récupération des données JSON
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse([
                'error' => 'JSON invalide'
            ], 400);
        }

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // ❌ Vérification des champs
        if (!$email || !$password) {
            return new JsonResponse([
                'error' => 'Email et mot de passe requis'
            ], 400);
        }

        // 🔎 Recherche utilisateur
        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse([
                'error' => 'Utilisateur non trouvé'
            ], 404);
        }

        // 🔑 Vérification mot de passe
        if (!$this->passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse([
                'error' => 'Mot de passe incorrect'
            ], 401);
        }

        // ✅ Succès (sans JWT pour l’instant)
        return new JsonResponse([
            'success' => true,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
            ]
        ], 200);
    }
}