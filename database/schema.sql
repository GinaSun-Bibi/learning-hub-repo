CREATE DATABASE IF NOT EXISTS learning_hub_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE learning_hub_db;

CREATE TABLE IF NOT EXISTS user_login (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('teacher', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS course_stat (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    course_description TEXT NULL,
    user_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_course_user
        FOREIGN KEY (user_id) REFERENCES user_login(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS upload_stat (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_description TEXT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_upload_user
        FOREIGN KEY (user_id) REFERENCES user_login(id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_upload_course
        FOREIGN KEY (course_id) REFERENCES course_stat(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS assignment_stat (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    assignment_name VARCHAR(255) NOT NULL,
    assignment_description TEXT NULL,
    original_assignment_name VARCHAR(255) NOT NULL,
    assignment_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignment_user
        FOREIGN KEY (user_id) REFERENCES user_login(id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_assignment_course
        FOREIGN KEY (course_id) REFERENCES course_stat(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS submit_stat (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    assignment_name_submit VARCHAR(255) NOT NULL,
    submit_path VARCHAR(500) NOT NULL,
    assignment_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_submit_assignment
        FOREIGN KEY (assignment_id) REFERENCES assignment_stat(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_submit_user
        FOREIGN KEY (user_id) REFERENCES user_login(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;
