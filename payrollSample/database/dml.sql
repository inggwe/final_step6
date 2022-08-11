-- Insert timesheet info
INSERT INTO Timesheet(Clock_In, Clock_Out) VALUES ('Employee insets valid times');
-- Insert employee info
INSERT INTO Employee (Employee_Email, Employee_Phone_Number, City, State) VALUES ('Employee fills in the required fields');

-- update timesheet info(eg starting time or ending time)
UPDATE Timesheet 
SET  Clock_In = 'valid time', Clock_Out= 'valid time' 
WHERE Time_Sheet_ID= 'valid id';

UPDATE Employee_Job 
SET  Supervisor_ID= 'valid id', Start_Date="valid date", End_Date="valid date"  
WHERE Job_ID = 'valid id' and Employee_ID= 'valid id';

UPDATE Job 
SET Job_Title= 'valid input', Hourly_Wage= 'valid number', Department_Id="valid id"  
WHERE Job_Id = 'valid id';

UPDATE Department 
SET Department_Head_ID= 'valid id', Department= 'valid input', Department_Email="valid id", Department_Supervisor_ID="valid id"    
WHERE Department_Id = 'valid id';

UPDATE Employee 
SET Employee_First_Name= 'valid input', Employee_Last_Name= 'valid input', Employee_Email="valid id", Gender_Identity="valid input", Birthday="valid date",  City="valid input",State="vailid input"
WHERE Employee_Id = 'valid id';


-- delete a record frem a table 
-- DELETE FROM table_name WHERE condition;
DELETE FROM Timesheet WHERE date = 'valid date input';
DELETE FROM Job WHERE Job_ID= 'valid date input';
DELETE FROM Employee WHERE Employee_ID= 'valid date input';
DELETE FROM Department WHERE Department_ID= 'valid date input';
DELETE FROM Employee_Job WHERE Job_ID= 'valid date input' AND Employee_ID= 'valid date input';

-- read info from employee tables (using select statements eg search by ID) 
SELECT Employee_ID FROM Employee;
-- mainly for signing into an employee's database
SELECT * FROM Employee WHERE Employee_ID = 'an existing employee ID eg EM1 etc';

-- select job title
SELECT Job_Title
FROM Job j
RIGHT JOIN Employee_Role e ON e.Job_ID = j.Job_ID
WHERE e.Employee_ID = 'EM1';

-- select department_name
SELECT d.Department_Name
FROM Job j
RIGHT JOIN Employee_Role e ON e.Job_ID = j.Job_ID
LEFT JOIN Department d ON d.Department_ID= j.Department_ID
LEFT JOIN Department p on p.Department_Supervisor = e.Employee_ID
WHERE e.Employee_ID = 'EM1';

-- select supervisor name
SELECT Employee_First_Name, Employee_Last_Name
FROM Employee e
RIGHT JOIN Employee_Role re ON re.Employee_ID = e.Employee_ID
WHERE e.Employee_ID = 'EM2';

-- select supevisor name and ID
SELECT r.Employee_ID, d.Department_Supervisor, e.Employee_First_Name, e.Employee_Last_Name

FROM Employee_Job r 
LEFT JOIN Job j ON r.Job_ID = j.Job_ID
LEFT JOIN Department d ON d.Department_ID = j.Department_ID
LEFT JOIN Employee e ON e.Employee_ID = d.Department_Supervisor;



-- We got stuck here so we will ask the instructor for another approach
-- calculating taxes 
--  1) EM4 2009.Sep total working hours
WITH
  cte1 AS (SELECT Time_Sheet_ID, Clock_In, Clock_Date, Clock_Out, Employee_Id, 
  timediff(Clock_Out, Clock_IN) AS hours
  FROM Timesheet
  WHERE DATE_FORMAT(Clock_Date,'%Y-%m') = '2009-09') 
SELECT Employee_Id, sum(hours)/10000 as Total_hrs
from cte1
GROUP BY Employee_Id
HAVING Employee_Id ="EM4"

-- TEST
WITH
	cte1 AS (SELECT Time_Sheet_ID, Clock_In, Clock_Date, Clock_Out, Employee_Id, timediff(Clock_Out, Clock_IN) AS hours
	FROM Timesheet
  	WHERE DATE_FORMAT(Clock_Date,'%Y-%m') = '2009-09') 
    
	cte2 AS(SELECT Employee_Id, sum(hours)/10000 as Total_hrs
	FROM cte1
	GROUP BY Employee_Id
	HAVING Employee_Id ="EM4") 
    
   SELECT a.Employee_Id, a.Total_hrs, b.Start_Date, b.End_Date
   FROM cte2 a
   LEFT JOIN Employee_Job b 
   ON  a.Employee_Id= b.Employee_Id





-- TEST
WITH
	cte1 AS (SELECT Time_Sheet_ID, Clock_In, Clock_Date, Clock_Out, Employee_Id, timediff(Clock_Out, Clock_IN) AS hours
	FROM Timesheet
  	WHERE DATE_FORMAT(Clock_Date,'%Y-%m') = '2009-09')
    
    select a.Employee_Id, a.Total_hrs, b.Start_Date, b.End_Date
    FROM( SELECT Employee_Id, sum(hours)/10000 as Total_hrs
	FROM cte1
	GROUP BY Employee_Id
	HAVING Employee_Id ="EM4") AS a
    LEFT JOIN Employee_Job b ON a.Employee_Id= b.Employee_Id




-- TEST
WITH
	cte1 AS (SELECT Time_Sheet_ID, Clock_In, Clock_Date, Clock_Out, Employee_Id, 
    timediff(Clock_Out, Clock_IN) AS hours
	FROM Timesheet
  	WHERE DATE_FORMAT(Clock_Date,'%Y-%m') = '2009-09')
    
    SELECT a.Time_Sheet_ID, a.Clock_In, a.Clock_Date, a.Clock_Out, a.Employee_Id, a.hours, b.Start_Date, b.End_Date
	FROM cte1 a
    LEFT JOIN Employee_Job b ON a.Employee_Id= b.Employee_Id





-- 2) EM4 Sep-2009 Monthly Salary **********

WITH
	cte1 AS (SELECT Time_Sheet_ID, Clock_In, Clock_Date, Clock_Out, Employee_Id, timediff(Clock_Out, Clock_IN) AS hours
	FROM Timesheet
  	WHERE DATE_FORMAT(Clock_Date,'%Y-%m') = '2009-09')
    
	SELECT sum(dailyTotal) as Sep2009_Total_Earning, Employee_Id
    FROM
    (select Employee_Id, hours, Hourly_Wage, Clock_Date, ((hours/10000)*Hourly_Wage)as dailyTotal
    FROM(SELECT a.Time_Sheet_ID, a.Clock_In, a.Clock_Date, a.Clock_Out, a.Employee_Id, b.Job_ID, a.hours, b.Start_Date, b.End_Date, c.Hourly_Wage
	FROM cte1 a
    LEFT JOIN Employee_Job b ON a.Employee_Id= b.Employee_Id
    LEFT JOIN Job c ON c.Job_ID =b.Job_ID) AS sub)
    AS sub2
    GROUP BY Employee_Id
	HAVING Employee_Id ="EM4"