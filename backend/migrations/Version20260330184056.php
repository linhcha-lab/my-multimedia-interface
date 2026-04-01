<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260330184056 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE submission_file ADD file_path VARCHAR(255) NOT NULL, ADD submitted_at DATETIME NOT NULL, ADD submission_id INT NOT NULL, ADD student_id INT NOT NULL, ADD groupe_id INT NOT NULL');
        $this->addSql('ALTER TABLE submission_file ADD CONSTRAINT FK_1E995D7FE1FD4933 FOREIGN KEY (submission_id) REFERENCES submission (id)');
        $this->addSql('ALTER TABLE submission_file ADD CONSTRAINT FK_1E995D7FCB944F1A FOREIGN KEY (student_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE submission_file ADD CONSTRAINT FK_1E995D7F7A45358C FOREIGN KEY (groupe_id) REFERENCES groupe (id)');
        $this->addSql('CREATE INDEX IDX_1E995D7FE1FD4933 ON submission_file (submission_id)');
        $this->addSql('CREATE INDEX IDX_1E995D7FCB944F1A ON submission_file (student_id)');
        $this->addSql('CREATE INDEX IDX_1E995D7F7A45358C ON submission_file (groupe_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE submission_file DROP FOREIGN KEY FK_1E995D7FE1FD4933');
        $this->addSql('ALTER TABLE submission_file DROP FOREIGN KEY FK_1E995D7FCB944F1A');
        $this->addSql('ALTER TABLE submission_file DROP FOREIGN KEY FK_1E995D7F7A45358C');
        $this->addSql('DROP INDEX IDX_1E995D7FE1FD4933 ON submission_file');
        $this->addSql('DROP INDEX IDX_1E995D7FCB944F1A ON submission_file');
        $this->addSql('DROP INDEX IDX_1E995D7F7A45358C ON submission_file');
        $this->addSql('ALTER TABLE submission_file DROP file_path, DROP submitted_at, DROP submission_id, DROP student_id, DROP groupe_id');
    }
}
