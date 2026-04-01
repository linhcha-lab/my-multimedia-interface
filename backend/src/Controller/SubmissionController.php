<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SubmissionController extends AbstractController
{
    #[Route('/api/submissions/upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $file = $request->files->get('file');

        if (!$file) {
            return $this->json(['error' => 'Aucun fichier'], 400);
        }

        $filename = uniqid().'.'.$file->guessExtension();
        $file->move('uploads/', $filename);

        return $this->json([
            'message' => 'Fichier uploadé',
            'path' => $filename
        ]);
    }
}