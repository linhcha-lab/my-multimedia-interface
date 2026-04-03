<?php

namespace App\Controller;

use App\Entity\Submission;
use App\Entity\SubmissionFile;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SubmissionController extends AbstractController
{
    #[Route('/api/submissions/{id}/upload', name: 'submission_upload', methods: ['POST'])]
    public function upload(
        int $id,
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {

        /////////////////////////////////////////////////////////////
        // 🔥 RÉCUP SUBMISSION
        /////////////////////////////////////////////////////////////
        $submission = $em->getRepository(Submission::class)->find($id);

        if (!$submission) {
            return $this->json(['error' => 'Submission introuvable'], 404);
        }

        /////////////////////////////////////////////////////////////
        // 🔥 RÉCUP USER
        /////////////////////////////////////////////////////////////
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        /////////////////////////////////////////////////////////////
        // 🔥 FILE
        /////////////////////////////////////////////////////////////
        $file = $request->files->get('file');

        if (!$file) {
            return $this->json(['error' => 'Aucun fichier'], 400);
        }

        /////////////////////////////////////////////////////////////
        // 🔥 UPLOAD
        /////////////////////////////////////////////////////////////
        $filename = uniqid() . '.' . $file->guessExtension();

        $file->move(
            $this->getParameter('kernel.project_dir') . '/public/uploads',
            $filename
        );

        /////////////////////////////////////////////////////////////
        // 🔥 SAVE DB
        /////////////////////////////////////////////////////////////
        $submissionFile = new SubmissionFile();
        $submissionFile->setSubmission($submission);
        $submissionFile->setStudent($user);
$submissionFile->setGroupe(null);        $submissionFile->setFilePath($filename);
        $submissionFile->setSubmittedAt(new \DateTime());

        $em->persist($submissionFile);
        $em->flush();

        /////////////////////////////////////////////////////////////
        // ✅ RESPONSE
        /////////////////////////////////////////////////////////////
        return $this->json([
            'message' => 'Upload réussi',
            'file' => $filename
        ]);
    }
}