<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UploadController extends AbstractController
{
    #[Route('/api/upload', name: 'upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $file = $request->files->get('file');

        if (!$file) {
            return $this->json(['error' => 'No file'], 400);
        }

        // nom unique
        $fileName = uniqid() . '.' . $file->guessExtension();

        // move dans public/uploads
        $file->move(
            $this->getParameter('kernel.project_dir') . '/public/uploads',
            $fileName
        );

        return $this->json([
            'url' => '/uploads/' . $fileName
        ]);
    }
}
