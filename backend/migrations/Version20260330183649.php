<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260330183649 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE submission_file DROP FOREIGN KEY `FK_1E995D7FDDC5B2AC`');
        $this->addSql('DROP INDEX IDX_1E995D7FDDC5B2AC ON submission_file');
        $this->addSql('ALTER TABLE submission_file DROP title, DROP description, DROP background_color, DROP text_color, DROP status, DROP created_at, DROP no, DROP sae_instance_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE submission_file ADD title VARCHAR(255) NOT NULL, ADD description LONGTEXT NOT NULL, ADD background_color VARCHAR(255) NOT NULL, ADD text_color VARCHAR(255) NOT NULL, ADD status VARCHAR(255) NOT NULL, ADD created_at DATETIME NOT NULL, ADD no VARCHAR(255) NOT NULL, ADD sae_instance_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE submission_file ADD CONSTRAINT `FK_1E995D7FDDC5B2AC` FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_1E995D7FDDC5B2AC ON submission_file (sae_instance_id)');
    }
}
