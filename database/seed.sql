USE learning_hub_db;

-- Local demo accounts only.
-- teacher_demo / teacher123
-- student_demo / student123

INSERT INTO user_login (username, password_hash, role)
VALUES
('teacher_demo', '$2y$12$TMjE1DzD3gnloskhEYpXwuWGUSTWnF9lFj8Y6J2kM/Fyu75fHa73O', 'teacher'),
('student_demo', '$2y$12$Wi6uAEF1z9zI57nA7VdD6OdGmmf0tlLhhbAT/SEzLonnBi6R8x5My', 'student')
ON DUPLICATE KEY UPDATE username = VALUES(username);
