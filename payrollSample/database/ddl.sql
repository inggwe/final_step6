
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Employee table
DROP TABLE IF EXISTS `Employee`;

CREATE TABLE `Employee` (
  `Employee_ID` varchar(50) NOT NULL,
  `Employee_First_Name` varchar(255) NOT NULL,
  `Employee_Last_Name` varchar(255) NOT NULL,
  `Employee_Email` varchar(255) NOT NULL,
  `Employee_Phone_Number` varchar(12) NOT NULL,
  `Gender_Identity` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `State` varchar(50) NOT NULL,
  `City` varchar(255) NOT NULL,

  PRIMARY KEY (`Employee_ID`)

); 

LOCK TABLES `Employee` WRITE;

INSERT INTO `Employee` VALUES
    ('EM1','Gloria','Smith','smithg@gmail.com','456-737-0890','F','1987-11-18','OR','Portland'),
    ('EM2','Tom','Green','greent@gmail.com','183-183-2809','M','1987-11-19','OR','Bend'),
    ('EM3','Dante','Gray','grayd@gmail.com','363-279-7100','M','1987-11-20','OR','Salem'),
    ('EM4','Grace','Kiriku','kirikug@gmail.com','773-352-7289','F','1987-11-21','OR','Corvallis'),
    ('EM5','Otis','Atieno','Atienoo@gmail.com','370-767-7287','F','1987-11-22','OR','Eugene'); 

UNLOCK TABLES;


-- Timesheet table
DROP TABLE IF EXISTS `Timesheet`;

CREATE TABLE `Timesheet` (
  `Time_Sheet_ID` varchar(50) NOT NULL,
  `Employee_ID` varchar(50) NOT NULL,
  `Clock_In` time NOT NULL,
  `Clock_Out` time NOT NULL,
  `Clock_Date` date NOT NULL,
  
  PRIMARY KEY (`Time_Sheet_ID`),
  FOREIGN KEY (`Employee_ID`)  REFERENCES `Employee`(`Employee_ID`)

);


LOCK TABLES `Timesheet` WRITE;

INSERT INTO `Timesheet` VALUES 
    ('TS1','EM1','00:800:00','16:30:00','2009-09-14'),
    ('TS2','EM2','07:00:00','14:00:00','2009-09-15'),
    ('TS3','EM4','10:00:00','18:00:00','2009-09-16'),
    ('TS4','EM4','06:00:00','17:00:00','2009-09-17'),
    ('TS5','EM5','07:00:00','18:00:00','2009-09-18');                             

UNLOCK TABLES;

-- Employee_Job
DROP TABLE IF EXISTS `Employee_Job`;

CREATE TABLE `Employee_Job` (
  `Job_ID` varchar(50) NOT NULL,
  `Employee_ID` varchar(50) NOT NULL,
  `Supervisor_ID` varchar(50),
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL,
  PRIMARY KEY (`Job_ID`),
  FOREIGN KEY (`Employee_ID`) REFERENCES `Employee`(`Employee_ID`),
  FOREIGN KEY (`Supervisor_ID`) REFERENCES `Employee`(`Employee_ID`)

); 


LOCK TABLES `Employee_Job` WRITE;

INSERT INTO `Employee_Job` VALUES 
    ('JB1','EM1','EM2','2009-01-01',NULL),
    ('JB2','EM2','EM5','2008-02-01',NULL),
    ('JB3','EM3','EM4','2009-01-03',NULL),
    ('JB4','EM4','EM5','2009-01-04',NULL),
    ('JB5','EM5',NULL,'2008-01-01',NULL);
                              

UNLOCK TABLES;

-- Department
DROP TABLE IF EXISTS `Department`;

CREATE TABLE `Department` (
  `Department_ID` varchar(50) NOT NULL,
  `Department_Name` varchar(50) NOT NULL,
  `Department_Head_ID` varchar(50) NOT NULL,
  `Department_Email` varchar(50) NOT NULL,
  `Department_Supervisor` varchar(50),
  PRIMARY KEY (`Department_ID`),
  FOREIGN KEY (`Department_Head_ID`) REFERENCES `Employee`(`Employee_ID`),
  FOREIGN KEY (`Department_Supervisor`) REFERENCES `Employee`(`Employee_ID`)

); 


LOCK TABLES `Department` WRITE;

INSERT INTO `Department` VALUES 
    ('DP1','Marketing','EM1','Marketing@company.com','EM2'),
    ('DP2','Human Resource','EM4','Marketing@company.com','EM5'),
    ('DP3','Finance','EM3','Marketing@company.com',NULL);
                        
-- /*!40000 ALTER TABLE `bsg_planets` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `State_Tax`;

CREATE TABLE `State_Tax` (
  `State` varchar(2) NOT NULL,
  `Bracket_Start` INT NOT NULL,
  `Bracket_End` INT DEFAULT NULL,
  `Tax_Rate` Decimal(19,3) DEFAULT NULL
);

LOCK TABLES `State_Tax` WRITE;

INSERT INTO `State_Tax` VALUES 
('OR',0,3650,0.050),
('OR',3651,9200,0.070),
('OR',9201,125000,0.090),
('OR',125001,NULL,0.099);

UNLOCK TABLES;


-- Table structure for table `Job`
DROP TABLE IF EXISTS `Job`;

CREATE TABLE `Job` (
  `Job_ID` varchar(50) NOT NULL,
  `Department_ID` varchar(50) DEFAULT NULL,
  `Job_Title` varchar(25) NOT NULL,
  `Hourly_Wage` int(11) NOT NULL,
  PRIMARY KEY (`Job_ID`),
  CONSTRAINT `Job_ibfk_1` FOREIGN KEY (`Department_ID`) REFERENCES `Department` (`Department_ID`) 
);


LOCK TABLES `Job` WRITE;

INSERT INTO `Job` VALUES ('JB1','DP1','Marketing Director',400),
('JB2','DP1','Marketing Supervisor',300),
('JB3','DP1','Marketing Analyst',250),
('JB4','DP2','HR Supervisor ',250),
('JB5','DP2','HR Director',300),
('JB6','DP2','HR Secretary Assistant ',200),
('JB7','DP3','CFO',800),
('JB8','DP3','Accounter',200),
('JB9',NULL,'CEO',900);

UNLOCK TABLES;

-- Table structure for table `Job`
DROP TABLE IF EXISTS `Employee_State`;

CREATE TABLE `Employee_State` (
  `Employee_State_ID` varchar(50) NOT NULL,
  `Employee_State` varchar(2) NOT NULL,
  `Employee_ID` varchar(50),
  PRIMARY KEY (`Employee_State_ID`),
  CONSTRAINT `Employee_State_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee` (`Employee_ID`) 
);


LOCK TABLES `Employee_State` WRITE;

INSERT INTO `Employee_State` VALUES 
    ('SE1','OR','EM1'),
    ('SE2','OR','EM2'),
    ('SE3','OR','EM3'),
    ('SE4','OR','EM4'),
    ('SE5','OR','EM5');
    

UNLOCK TABLES;


