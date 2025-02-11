CREATE TABLE users (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  resetToken VARCHAR(255), 
  resetTokenExpiry BIGINT, 
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE guardians (
  userId INT PRIMARY KEY, 
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20),
  email VARCHAR(100),
  postalCode VARCHAR(20),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(userId) 
);

CREATE TABLE children (
  childId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL, -- Use userId as the foreign key
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  birthYear INT NOT NULL,
  divisionLevel VARCHAR(50),
  hockeyOrganization VARCHAR(100),
  position VARCHAR(50),
  medicalConditions TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(userId) 
);

CREATE TABLE programs (
  programId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  startDate DATE,
  endDate DATE,
  cost DECIMAL(10, 2),
  location VARCHAR(255),
  capacity INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  paymentId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  programId INT NOT NULL,
  paymentAmount DECIMAL(10, 2) NOT NULL,
  paymentStatus ENUM('Pending', 'Completed', 'Unpaid', `Not Signed Up`) DEFAULT `Not Signed Up`,
  paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (programId) REFERENCES programs(programId)
);
