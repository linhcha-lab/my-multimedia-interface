<?php

namespace App\Entity;

use App\Repository\SubmissionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubmissionRepository::class)]
class Submission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?SAEInstance $saeInstance = null;

    #[ORM\Column]
    private ?\DateTime $dueDate = null;

   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    

    public function getSaeInstance(): ?SAEInstance
    {
        return $this->saeInstance;
    }

    public function setSaeInstance(?SAEInstance $saeInstance): static
    {
        $this->saeInstance = $saeInstance;

        return $this;
    }

    public function getDueDate(): ?\DateTime
    {
        return $this->dueDate;
    }

    public function setDueDate(\DateTime $dueDate): static
    {
        $this->dueDate = $dueDate;

        return $this;
    }

    
}
