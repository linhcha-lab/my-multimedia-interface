<?php

namespace App\Entity;

use App\Repository\SubmissionFileRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubmissionFileRepository::class)]
class SubmissionFile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Submission $submission = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $student = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Groupe $groupe = null;

    #[ORM\Column(length: 255)]
    private ?string $filePath = null;

    #[ORM\Column]
    private ?\DateTime $submittedAt = null;

   

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSubmission(): ?Submission
    {
        return $this->submission;
    }

    public function setSubmission(?Submission $submission): static
    {
        $this->submission = $submission;

        return $this;
    }

    public function getStudent(): ?User
    {
        return $this->student;
    }

    public function setStudent(?User $student): static
    {
        $this->student = $student;

        return $this;
    }

    public function getGroupe(): ?Groupe
    {
        return $this->groupe;
    }

    public function setGroupe(?Groupe $groupe): static
    {
        $this->groupe = $groupe;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getSubmittedAt(): ?\DateTime
    {
        return $this->submittedAt;
    }

    public function setSubmittedAt(\DateTime $submittedAt): static
    {
        $this->submittedAt = $submittedAt;

        return $this;
    }

   
}
