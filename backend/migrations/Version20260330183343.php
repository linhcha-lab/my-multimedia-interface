<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260330183343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY `FK_DB055AF37A45358C`');
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY `FK_DB055AF3CB944F1A`');
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY `FK_DB055AF3E1FD4933`');
        $this->addSql('DROP INDEX IDX_DB055AF3CB944F1A ON submission');
        $this->addSql('DROP INDEX IDX_DB055AF3E1FD4933 ON submission');
        $this->addSql('DROP INDEX IDX_DB055AF37A45358C ON submission');
        $this->addSql('ALTER TABLE submission DROP due_data, DROP file_path, DROP submitted_at, DROP submission_id, DROP student_id, DROP groupe_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE submission ADD due_data DATETIME NOT NULL, ADD file_path VARCHAR(255) NOT NULL, ADD submitted_at DATETIME NOT NULL, ADD submission_id INT NOT NULL, ADD student_id INT NOT NULL, ADD groupe_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT `FK_DB055AF37A45358C` FOREIGN KEY (groupe_id) REFERENCES groupe (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT `FK_DB055AF3CB944F1A` FOREIGN KEY (student_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT `FK_DB055AF3E1FD4933` FOREIGN KEY (submission_id) REFERENCES submission (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_DB055AF3CB944F1A ON submission (student_id)');
        $this->addSql('CREATE INDEX IDX_DB055AF3E1FD4933 ON submission (submission_id)');
        $this->addSql('CREATE INDEX IDX_DB055AF37A45358C ON submission (groupe_id)');
    }
}
