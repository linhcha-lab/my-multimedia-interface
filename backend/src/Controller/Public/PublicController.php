<?php

namespace App\Controller\Public;

use App\Repository\ProjectRepository;
use App\Repository\FAQRepository;
use App\Service\Formatter\ProjectFormatter;
use App\Service\Formatter\FAQFormatter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class PublicController extends AbstractController
{
    #[Route('/api/public/home', methods: ['GET'])]
    public function home(
        ProjectRepository $projectRepo,
        FAQRepository $faqRepo,
        ProjectFormatter $projectFormatter,
        FAQFormatter $faqFormatter
    ): JsonResponse {

        $projects = $projectRepo->findBy([], ['createdAt' => 'DESC'], 3);

        $projectsFormatted = array_map(
            fn($p) => $projectFormatter->format($p),
            $projects
        );

        $faqs = $faqRepo->findBy([], [], 3);

        $faqsFormatted = array_map(
            fn($f) => $faqFormatter->format($f),
            $faqs
        );

        return $this->json([
            'projects' => $projectsFormatted,
            'faqs' => $faqsFormatted
        ]);
    }
}