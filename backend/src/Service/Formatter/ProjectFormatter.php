<?php 
namespace App\Service\Formatter;

use App\Entity\Project;

class ProjectFormatter
{
    public function format(Project $project): array
    {
        return [
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'description' => $project->getDescription(),
            'backgroundColor' => $project->getBackgroundColor(),
            'textColor' => $project->getTextColor(),
            'createdAt' => $project->getCreatedAt()?->format('Y-m-d'),

            // 👉 images
            'images' => array_map(fn($img) => [
                'type' => $img->getType(),
                'url' => $img->getFilePath()
            ], $project->getProjectImages()->toArray()),
        ];
    }
}