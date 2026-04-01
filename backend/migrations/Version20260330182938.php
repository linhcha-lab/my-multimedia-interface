<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260330182938 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE resource ADD sae_instance_id INT NOT NULL');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416DDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('CREATE INDEX IDX_BC91F416DDC5B2AC ON resource (sae_instance_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F416DDC5B2AC');
        $this->addSql('DROP INDEX IDX_BC91F416DDC5B2AC ON resource');
        $this->addSql('ALTER TABLE resource DROP sae_instance_id');
    }
}
