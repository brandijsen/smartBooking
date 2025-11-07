-- =====================================
-- USERS
-- =====================================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  is_verified BOOLEAN DEFAULT 0 AFTER role;
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- OWNERSHIP LOG
-- =====================================
CREATE TABLE ownership_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  previous_admin VARCHAR(100),
  new_admin VARCHAR(100),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
