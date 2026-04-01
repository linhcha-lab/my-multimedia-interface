<?php

namespace App\Controller;

use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TagController extends AbstractController
{
    #[Route('/api/tags', name: 'api_tags', methods: ['GET'])]
    public function list(TagRepository $tagRepository): JsonResponse
    {
        $tags = $tagRepository->findAll();

        $data = array_map(function ($tag) {
            return [
                'id' => $tag->getId(),
                'name' => $tag->getName(),
            ];
        }, $tags);

        return new JsonResponse($data);
    }
}