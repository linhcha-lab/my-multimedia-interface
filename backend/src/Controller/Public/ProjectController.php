<?php

namespace App\Controller\Public;

use App\Entity\Project;
use App\Entity\ProjectImage;
use App\Entity\SAEInstance;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\ProjectRepository;

class ProjectController extends AbstractController
{
    // 🔥 LISTE DES PROJETS
   #[Route('/api/projects', name: 'api_projects', methods: ['GET'])]
public function list(ProjectRepository $repo): JsonResponse
{
    $projects = $repo->findAll();

    $data = [];

    foreach ($projects as $project) {

        // 🔥 IMAGES SAFE
        $images = [];
        foreach ($project->getProjectImages() as $img) {
            if ($img && $img->getFilePath()) {
                $images[] = rtrim($img->getFilePath(), "'"); // 🔥 nettoie ton bug BDD
            }
        }

        $data[] = [
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'description' => $project->getDescription(),
            'status' => $project->getStatus(),

            // TAGS
            'tags' => array_map(function ($tag) {
                return [
                    'id' => $tag->getId(),
                    'name' => $tag->getName(),
                ];
            }, $project->getTags()->toArray()),

            // IMAGES SAFE
            'images' => $images,
        ];
    }

    return $this->json($data);
}

    // 🔥 DÉTAIL D’UN PROJET
    #[Route('/api/projects/{id}', methods: ['GET'])]
    public function show(Project $project): JsonResponse
    {
        return $this->json([
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'description' => $project->getDescription(),
            'backgroundColor' => $project->getBackgroundColor(),
            'textColor' => $project->getTextColor(),
            'status' => $project->getStatus(),
            'images' => array_map(fn($img) => [
                'type' => $img->getType(),
                'file' => $img->getFilePath()
            ], $project->getProjectImages()->toArray()),
        ]);
    }

    // 🔥 CRÉATION D’UN PROJET
    #[Route('/api/projects', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        // 🔐 USER
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        // 📦 DATA (form-data)
        $data = $request->request;

        // 🔥 SAE (FIX ICI)
        $saeId = $request->request->get('sae_id');

        if (!$saeId) {
            return $this->json(['error' => 'sae_id manquant'], 400);
        }

        $sae = $em->getRepository(SAEInstance::class)->find($saeId);

        if (!$sae) {
            return $this->json(['error' => 'SAE introuvable'], 404);
        }

        // 🧠 CRÉATION PROJET
        $project = new Project();
        $project->setTitle($data->get('title'));
        $project->setDescription($data->get('description'));
        $project->setBackgroundColor($data->get('backgroundColor'));
        $project->setTextColor($data->get('textColor'));
        $project->setStatus('submitted');
        $project->setCreatedAt(new \DateTime());
        $project->setSaeInstance($sae);

        $em->persist($project);

        // 📂 IMAGES
        $files = $request->files->get('images');

        if ($files) {
            foreach ($files as $index => $file) {

                $filename = uniqid().'.'.$file->guessExtension();

                $file->move(
                    $this->getParameter('kernel.project_dir').'/public/uploads',
                    $filename
                );

                $img = new ProjectImage();
                $img->setProject($project);
                $img->setFilePath('/uploads/'.$filename);
                $img->setType($index === 0 ? 'PHONE' : 'SQUARE');
                $img->setOrderIndex($index);

                $em->persist($img);
            }
        }

        $em->flush();

        // ✅ RETOUR PROPRE
        return $this->json([
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'description' => $project->getDescription(),
            'status' => $project->getStatus(),
            'images' => array_map(fn($img) => $img->getFilePath(), $project->getProjectImages()->toArray())
        ]);
    }
}