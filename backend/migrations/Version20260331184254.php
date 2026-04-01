<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260331184254 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project_image DROP FOREIGN KEY `FK_D6680DC1166D1F9C`');
        $this->addSql('ALTER TABLE project_image ADD CONSTRAINT FK_D6680DC1166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project_image DROP FOREIGN KEY FK_D6680DC1166D1F9C');
        $this->addSql('ALTER TABLE project_image ADD CONSTRAINT `FK_D6680DC1166D1F9C` FOREIGN KEY (project_id) REFERENCES submission (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
