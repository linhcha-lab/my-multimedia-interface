<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260330155342 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE announcement (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, question LONGTEXT NOT NULL, answer LONGTEXT NOT NULL, author_id INT NOT NULL, sae_instance_id INT NOT NULL, INDEX IDX_4DB9D91CF675F31B (author_id), INDEX IDX_4DB9D91CDDC5B2AC (sae_instance_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE faq (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE groupe (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, sae_instance_id INT NOT NULL, students_id INT NOT NULL, INDEX IDX_4B98C21DDC5B2AC (sae_instance_id), INDEX IDX_4B98C211AD8D010 (students_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, created_at DATETIME NOT NULL, sender_id INT NOT NULL, receiver_id INT NOT NULL, sae_instance_id INT DEFAULT NULL, INDEX IDX_B6BD307FF624B39D (sender_id), INDEX IDX_B6BD307FCD53EDB6 (receiver_id), INDEX IDX_B6BD307FDDC5B2AC (sae_instance_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE project_image (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, file_path VARCHAR(255) NOT NULL, order_index INT NOT NULL, project_id INT NOT NULL, INDEX IDX_D6680DC1166D1F9C (project_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE resource (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, file_path VARCHAR(255) NOT NULL, sae_instance VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE sae (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, parcours VARCHAR(255) DEFAULT NULL, semester INT NOT NULL, year INT NOT NULL, is_group TINYINT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE saeinstance (id INT AUTO_INCREMENT NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME NOT NULL, status VARCHAR(255) NOT NULL, sae_id INT NOT NULL, teacher_id INT NOT NULL, INDEX IDX_384400CDDE9B22 (sae_id), INDEX IDX_384400C41807E1D (teacher_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE submission (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, due_data DATETIME NOT NULL, file_path VARCHAR(255) NOT NULL, submitted_at DATETIME NOT NULL, sae_instance_id INT NOT NULL, submission_id INT NOT NULL, student_id INT NOT NULL, groupe_id INT DEFAULT NULL, INDEX IDX_DB055AF3DDC5B2AC (sae_instance_id), INDEX IDX_DB055AF3E1FD4933 (submission_id), INDEX IDX_DB055AF3CB944F1A (student_id), INDEX IDX_DB055AF37A45358C (groupe_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE submission_file (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, background_color VARCHAR(255) NOT NULL, text_color VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, no VARCHAR(255) NOT NULL, sae_instance_id INT DEFAULT NULL, INDEX IDX_1E995D7FDDC5B2AC (sae_instance_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE task (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, order_index INT NOT NULL, sae_instance_id INT NOT NULL, INDEX IDX_527EDB25DDC5B2AC (sae_instance_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE task_progress (id INT AUTO_INCREMENT NOT NULL, is_done TINYINT NOT NULL, updated_at DATETIME NOT NULL, task_id INT NOT NULL, student_id INT DEFAULT NULL, groupe_id INT DEFAULT NULL, INDEX IDX_62C1180A8DB60186 (task_id), INDEX IDX_62C1180ACB944F1A (student_id), INDEX IDX_62C1180A7A45358C (groupe_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, year INT NOT NULL, parcours VARCHAR(255) DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CDDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE groupe ADD CONSTRAINT FK_4B98C21DDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE groupe ADD CONSTRAINT FK_4B98C211AD8D010 FOREIGN KEY (students_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FF624B39D FOREIGN KEY (sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FCD53EDB6 FOREIGN KEY (receiver_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FDDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE project_image ADD CONSTRAINT FK_D6680DC1166D1F9C FOREIGN KEY (project_id) REFERENCES submission (id)');
        $this->addSql('ALTER TABLE saeinstance ADD CONSTRAINT FK_384400CDDE9B22 FOREIGN KEY (sae_id) REFERENCES sae (id)');
        $this->addSql('ALTER TABLE saeinstance ADD CONSTRAINT FK_384400C41807E1D FOREIGN KEY (teacher_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT FK_DB055AF3DDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT FK_DB055AF3E1FD4933 FOREIGN KEY (submission_id) REFERENCES submission (id)');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT FK_DB055AF3CB944F1A FOREIGN KEY (student_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE submission ADD CONSTRAINT FK_DB055AF37A45358C FOREIGN KEY (groupe_id) REFERENCES groupe (id)');
        $this->addSql('ALTER TABLE submission_file ADD CONSTRAINT FK_1E995D7FDDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25DDC5B2AC FOREIGN KEY (sae_instance_id) REFERENCES saeinstance (id)');
        $this->addSql('ALTER TABLE task_progress ADD CONSTRAINT FK_62C1180A8DB60186 FOREIGN KEY (task_id) REFERENCES task (id)');
        $this->addSql('ALTER TABLE task_progress ADD CONSTRAINT FK_62C1180ACB944F1A FOREIGN KEY (student_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE task_progress ADD CONSTRAINT FK_62C1180A7A45358C FOREIGN KEY (groupe_id) REFERENCES groupe (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CF675F31B');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CDDC5B2AC');
        $this->addSql('ALTER TABLE groupe DROP FOREIGN KEY FK_4B98C21DDC5B2AC');
        $this->addSql('ALTER TABLE groupe DROP FOREIGN KEY FK_4B98C211AD8D010');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FF624B39D');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FCD53EDB6');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FDDC5B2AC');
        $this->addSql('ALTER TABLE project_image DROP FOREIGN KEY FK_D6680DC1166D1F9C');
        $this->addSql('ALTER TABLE saeinstance DROP FOREIGN KEY FK_384400CDDE9B22');
        $this->addSql('ALTER TABLE saeinstance DROP FOREIGN KEY FK_384400C41807E1D');
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY FK_DB055AF3DDC5B2AC');
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY FK_DB055AF3E1FD4933');
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY FK_DB055AF3CB944F1A');
        $this->addSql('ALTER TABLE submission DROP FOREIGN KEY FK_DB055AF37A45358C');
        $this->addSql('ALTER TABLE submission_file DROP FOREIGN KEY FK_1E995D7FDDC5B2AC');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25DDC5B2AC');
        $this->addSql('ALTER TABLE task_progress DROP FOREIGN KEY FK_62C1180A8DB60186');
        $this->addSql('ALTER TABLE task_progress DROP FOREIGN KEY FK_62C1180ACB944F1A');
        $this->addSql('ALTER TABLE task_progress DROP FOREIGN KEY FK_62C1180A7A45358C');
        $this->addSql('DROP TABLE announcement');
        $this->addSql('DROP TABLE faq');
        $this->addSql('DROP TABLE groupe');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE project_image');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE sae');
        $this->addSql('DROP TABLE saeinstance');
        $this->addSql('DROP TABLE submission');
        $this->addSql('DROP TABLE submission_file');
        $this->addSql('DROP TABLE task');
        $this->addSql('DROP TABLE task_progress');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
