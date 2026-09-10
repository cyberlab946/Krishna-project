-- CyberLab Stage 12: add the expansion courses to the existing Supabase course system.
-- Run this once in Supabase SQL Editor after supabase-schema.sql and policy stages.
-- Safe to run again: ON CONFLICT updates the course metadata.

insert into public.courses (name, level, lesson_count, description) values
('Python', 'Beginner', 5, 'Python programming foundations for automation, scripting and security learning.'),
('C', 'Beginner', 5, 'C programming foundations with memory and system concepts.'),
('C++', 'Beginner', 5, 'C++ programming, object-oriented design and safe coding fundamentals.'),
('Java', 'Beginner', 5, 'Java programming fundamentals and secure application practices.'),
('JavaScript', 'Beginner', 5, 'JavaScript fundamentals for interactive and safer web applications.'),
('SQL', 'Beginner', 5, 'SQL queries, relational data and database security fundamentals.'),
('Penetration Testing', 'Intermediate', 5, 'Structured penetration-testing methodology for authorized lab environments.'),
('Web Security', 'Intermediate', 5, 'Common web security risks and defensive development techniques.'),
('Digital Forensics', 'Intermediate', 5, 'Digital evidence handling, artifact analysis and forensic reporting.'),
('Cryptography', 'Intermediate', 5, 'Core cryptography concepts, encryption, public keys and hashing.'),
('Data Analyst', 'Beginner', 5, 'Data analysis workflow, cleaning, exploration and visualization.'),
('Data Science', 'Beginner', 5, 'Foundations of data science, statistics and machine learning.'),
('Database & SQL', 'Beginner', 5, 'Relational database concepts, SQL and database security.'),
('Cloud Computing', 'Beginner', 5, 'Cloud infrastructure concepts with identity and security fundamentals.'),
('AI Fundamentals', 'Beginner', 5, 'An introduction to artificial intelligence and responsible AI concepts.'),
('Nmap Lab', 'Intermediate', 5, 'Authorized Nmap practice for network discovery and service identification.'),
('CTF Practice', 'Intermediate', 5, 'Controlled Capture-the-Flag practice with safe challenge-solving skills.')
on conflict (name) do update set
  level = excluded.level,
  lesson_count = excluded.lesson_count,
  description = excluded.description;

-- Verify the 17 new courses.
select name, level, lesson_count
from public.courses
where name in (
  'Python','C','C++','Java','JavaScript','SQL','Penetration Testing','Web Security',
  'Digital Forensics','Cryptography','Data Analyst','Data Science','Database & SQL',
  'Cloud Computing','AI Fundamentals','Nmap Lab','CTF Practice'
)
order by name;
