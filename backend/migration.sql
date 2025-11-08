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




CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  image_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================================================
-- 💆‍♀️ SERVIZI
-- ===========================================================
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  professional_id INT NOT NULL,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INT NOT NULL, 
  image_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (professional_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ===========================================================
-- 🖼️ IMMAGINI SERVIZI
-- ===========================================================
CREATE TABLE service_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);