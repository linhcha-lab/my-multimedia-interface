<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260330181224 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, background_color VARCHAR(255) NOT NULL, text_color VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, sae_instance_id INT NOT NULL, INDEX IDX_2FB3D0EEDDC5B2AC (sae_instance_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EEDDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CDDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EEDDC5B2AC');
        $this->addSql('DROP TABLE project');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CF675F31B');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CDDC5B2AC');
    }
}
