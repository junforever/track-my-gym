START TRANSACTION;

-- 1. Tabla: users
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (username),
  UNIQUE INDEX idx_email (email)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `email`, `password`, `role`, `status`, `createdAt`, `updatedAt`) VALUES ('8994a5c9-0435-11f0-b122-02b5efa7b0ff', 'superadmin', 'Super', 'Admin', 'superadmin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$UMGe/AyH6MqeXACKgix/2w$oiRY9gDcGueuEUgcK8joEMIn546Jy6JPTCdM3tcIiN4', 'administrator', 'active', current_timestamp(), current_timestamp());

-- 2. Tabla: clients
CREATE TABLE clients (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  dateOfBirth DATE NOT NULL,
  gender VARCHAR(50) DEFAULT 'O',
  phone VARCHAR(10),
  email VARCHAR(100),
  address TEXT,
  id_number VARCHAR(10) NOT NULL,
  guardianId CHAR(36) DEFAULT NULL,
  relationship VARCHAR(50) DEFAULT NULL,
  registrationDate DATE DEFAULT CURRENT_DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (id_number),
  CONSTRAINT fk_client_guardian FOREIGN KEY (guardianId) REFERENCES clients(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. Tabla: client_documents
CREATE TABLE client_documents (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  client_id CHAR(36) NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  valid_until DATE,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (client_id, document_type),
  CONSTRAINT fk_client_doc_client FOREIGN KEY (client_id) REFERENCES clients(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 4. Tabla: employees
CREATE TABLE employees (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  id_number VARCHAR(10) NOT NULL,
  gender VARCHAR(50),
  role VARCHAR(50) NOT NULL,
  phone VARCHAR(10),
  email VARCHAR(100),
  contractStart DATE,
  contractEnd DATE,
  status VARCHAR(50) DEFAULT 'active',
  hireDate DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (id_number)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 5. Tabla: employee_documents
CREATE TABLE employee_documents (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  employee_id CHAR(36) NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  valid_until DATE,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (employee_id, document_type),
  CONSTRAINT fk_emp_doc_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 6. Tabla: salary_payments
CREATE TABLE salary_payments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  employee_id CHAR(36) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  bonus DECIMAL(10,2) DEFAULT 0,
  deduction DECIMAL(10,2) DEFAULT 0,
  payment_date DATE NOT NULL,
  period_start DATE,
  period_end DATE,
  proof_payment_path VARCHAR(255),
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_salary_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 7. Tabla: services
CREATE TABLE services (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  cost DECIMAL(10,2) NOT NULL,
  billingPeriod VARCHAR(50) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (name),
  INDEX idx_service_name (name)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 8. Tabla: service_schedules
CREATE TABLE service_schedules (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  service_id CHAR(36) NOT NULL,
  week_day VARCHAR(20) NOT NULL,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  employee_id CHAR(36) NOT NULL,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_schedule_service FOREIGN KEY (service_id) REFERENCES services(id),
  CONSTRAINT fk_schedule_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 9. Tabla: service_registrations
CREATE TABLE service_registrations (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  client_id CHAR(36) NOT NULL,
  service_id CHAR(36) NOT NULL,
  enrollment_date DATE NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (client_id, service_id),
  CONSTRAINT fk_reg_client FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_reg_service FOREIGN KEY (service_id) REFERENCES services(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 10. Tabla: client_service_levels
CREATE TABLE client_service_levels (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  client_id CHAR(36) NOT NULL,
  service_id CHAR(36) NOT NULL,
  level VARCHAR(50) NOT NULL,
  level_start_date DATE NOT NULL,
  level_end_date DATE,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_hist_client FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_hist_service FOREIGN KEY (service_id) REFERENCES services(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 11. Tabla: client_payments
CREATE TABLE client_payments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  client_id CHAR(36) NOT NULL,
  service_id CHAR(36) DEFAULT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  proof_payment_path VARCHAR(255),
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_client FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_payment_service FOREIGN KEY (service_id) REFERENCES services(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 12. Tabla: promotions
CREATE TABLE promotions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  discount_value DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  applicable_service_id CHAR(36),
  and_operator TINYINT NOT NULL,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_promo_service FOREIGN KEY (applicable_service_id) REFERENCES services(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 13. Tabla: client_attendance
CREATE TABLE client_attendance (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  service_registration_id CHAR(36) NOT NULL,
  attendance_date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_attendance_registration FOREIGN KEY (service_registration_id) REFERENCES service_registrations(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 14. Tabla: events
CREATE TABLE events (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  max_payment_date DATE NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (name)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 15. Tabla: event_categories
CREATE TABLE event_categories (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_id CHAR(36) NOT NULL,
  category_name VARCHAR(50) NOT NULL,
  requirements TEXT,
  cost DECIMAL(10,2) NOT NULL,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_eventcat_event FOREIGN KEY (event_id) REFERENCES events(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 16. Tabla: event_participants
CREATE TABLE event_participants (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_category_id CHAR(36) NOT NULL,
  participant_id CHAR(36) NOT NULL,
  participant_type VARCHAR(50) NOT NULL,
  role VARCHAR(50),
  registration_date DATE NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_eventpart_category FOREIGN KEY (event_category_id) REFERENCES event_categories(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 17. Tabla: event_payments
CREATE TABLE event_payments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_participant_id CHAR(36) NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  proof_payment_path VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_eventpay_eventparticipant FOREIGN KEY (event_participant_id) REFERENCES event_participants(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 18. Tabla: event_results
CREATE TABLE event_results (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_participant_id CHAR(36) NOT NULL,
  position VARCHAR(50) NOT NULL,
  comments TEXT,
  recorded_at DATETIME NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_eventresult_eventparticipant FOREIGN KEY (event_participant_id) REFERENCES event_participants(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 19. Tabla: assets
CREATE TABLE assets (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  brand VARCHAR(50),
  image_path VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (name)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 20. Tabla: suppliers
CREATE TABLE suppliers (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  id_number VARCHAR(13),
  phone VARCHAR(10),
  email VARCHAR(100),
  address TEXT,
  web VARCHAR(100),
  whatsapp VARCHAR(10),
  city VARCHAR(50),
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (name),
  INDEX idx_supplier_name (name)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 21. Tabla: sale_inventory
CREATE TABLE sale_inventory (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  asset_id CHAR(36) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  supplier_id CHAR(36),
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (supplier_id, asset_id),
  CONSTRAINT fk_saleinv_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  CONSTRAINT fk_saleinv_asset FOREIGN KEY (asset_id) REFERENCES assets(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 22. Tabla: equipment_inventory
CREATE TABLE equipment_inventory (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  asset_id CHAR(36) NOT NULL,
  id_number VARCHAR(50),
  status VARCHAR(50) NOT NULL,
  acquisition_date DATE,
  warranty_expiration DATE,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_equipinv_asset FOREIGN KEY (asset_id) REFERENCES assets(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 23. Tabla: purchases
CREATE TABLE purchases (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  supplier_id CHAR(36) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  purchase_date DATE NOT NULL,
  purchase_status VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50),
  proof_payment_path VARCHAR(255),
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_purchase_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 24. Tabla: purchase_items
CREATE TABLE purchase_items (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  purchase_id CHAR(36) NOT NULL,
  asset_id CHAR(36) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_purchaseitem_purchase FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  CONSTRAINT fk_purchaseitem_asset FOREIGN KEY (asset_id) REFERENCES assets(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 25. Tabla: expenses
CREATE TABLE expenses (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  proof_payment_path VARCHAR(255),
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 26. Tabla: surveys
CREATE TABLE surveys (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  google_forms_link VARCHAR(255),
  active TINYINT(1) DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 27. Tabla: survey_questions
CREATE TABLE survey_questions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  survey_id CHAR(36) NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL,
  options TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_question_survey FOREIGN KEY (survey_id) REFERENCES surveys(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 28. Tabla: survey_responses
CREATE TABLE survey_responses (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  survey_id CHAR(36) NOT NULL,
  client_id CHAR(36) NOT NULL,
  responses TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_response_survey FOREIGN KEY (survey_id) REFERENCES surveys(id),
  CONSTRAINT fk_response_client FOREIGN KEY (client_id) REFERENCES clients(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 29. Tabla: loyalty_criteria
CREATE TABLE loyalty_criteria (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  criterion_name VARCHAR(100) NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 30. Tabla: loyalty_records
CREATE TABLE loyalty_records (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  client_id CHAR(36) NOT NULL,
  criterion_id CHAR(36) NOT NULL,
  comments TEXT,
  score INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_loyalty_client FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_loyalty_criterion FOREIGN KEY (criterion_id) REFERENCES loyalty_criteria(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 31. Tabla: certificates
CREATE TABLE certificates (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  certificate_type VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  certificate_text TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 32. Tabla: issued_certificates
CREATE TABLE issued_certificates (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  person_id CHAR(36) NOT NULL,
  person_type VARCHAR(50) NOT NULL,
  issued_date DATE NOT NULL,
  comments TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 33. Tabla: equipment_maintenance
CREATE TABLE equipment_maintenance (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  equipment_inventory_id CHAR(36) NOT NULL,
  maintenance_date_start DATE NOT NULL,
  reason VARCHAR(50) NOT NULL,
  cost DECIMAL(10,2),
  maintenance_status VARCHAR(50),
  maintenance_date_end DATE,
  comments TEXT,
  CONSTRAINT fk_equipmaint_equipment FOREIGN KEY (equipment_inventory_id) REFERENCES equipment_inventory(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 34. Tabla: promotion_criteria
CREATE TABLE promotion_criteria (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  promotion_id CHAR(36) NOT NULL,
  criteria_field VARCHAR(30) NOT NULL,
  criteria_operator VARCHAR(10) NOT NULL,
  criteria_value VARCHAR(10) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_promocr_promotion FOREIGN KEY (promotion_id) REFERENCES promotions(id)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

COMMIT