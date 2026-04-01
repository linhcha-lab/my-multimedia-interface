<?php

namespace App\Entity;

use App\Repository\SAEInstanceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SAEInstanceRepository::class)]
class SAEInstance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?SAE $sae = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $teacher = null;

    #[ORM\Column]
    private ?\DateTime $startDate = null;

    #[ORM\Column]
    private ?\DateTime $endDate = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    /**
     * @var Collection<int, SubmissionFile>
     */
    #[ORM\OneToMany(targetEntity: SubmissionFile::class, mappedBy: 'saeInstance')]
    private Collection $submissionFiles;

    public function __construct()
    {
        $this->submissionFiles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSae(): ?SAE
    {
        return $this->sae;
    }

    public function setSae(?SAE $sae): static
    {
        $this->sae = $sae;

        return $this;
    }

    public function getTeacher(): ?User
    {
        return $this->teacher;
    }

    public function setTeacher(?User $teacher): static
    {
        $this->teacher = $teacher;

        return $this;
    }

    public function getStartDate(): ?\DateTime
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTime $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTime $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, SubmissionFile>
     */
    public function getSubmissionFiles(): Collection
    {
        return $this->submissionFiles;
    }

    public function addSubmissionFile(SubmissionFile $submissionFile): static
    {
        if (!$this->submissionFiles->contains($submissionFile)) {
            $this->submissionFiles->add($submissionFile);
            $submissionFile->setSaeInstance($this);
        }

        return $this;
    }

    public function removeSubmissionFile(SubmissionFile $submissionFile): static
    {
        if ($this->submissionFiles->removeElement($submissionFile)) {
            // set the owning side to null (unless already changed)
            if ($submissionFile->getSaeInstance() === $this) {
                $submissionFile->setSaeInstance(null);
            }
        }

        return $this;
    }
}
