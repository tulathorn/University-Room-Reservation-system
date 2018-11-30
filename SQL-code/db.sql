https://gist.github.com/hofmannsven/9164408
https://mariadb.com/kb/en/library/insert/
https://stackoverflow.com/questions/25572871/how-to-make-a-mysql-table-with-date-and-time-columns
/*------------------Create Database------------------*/
create database RoomReservationSystem;

/*------------------Use Database------------------*/
use RoomReservationSystem;

/*------------------Create Table------------------*/
CREATE TABLE IF NOT EXISTS RoomInformation(
	RoomID VARCHAR(16) NOT NULL,
	Picture VARCHAR(256),
	Building VARCHAR(64) NOT NULL,
	Floor INT,
	RoomNumber INT,
	PeopleCapacity INT,
	ClosingDay VARCHAR(7),
	OpenTime TIME,
	CloseTime TIME,
	PRIMARY KEY(RoomID)
);

CREATE TABLE IF NOT EXISTS Equipment(
	RoomID VARCHAR(16) NOT NULL,
	HasTeacherComputers BOOLEAN,
	HasStudentComputers BOOLEAN,
	HasProjector BOOLEAN,
	HasAirConditioner BOOLEAN,
	HasWhiteboard BOOLEAN,
	HasVisualizer BOOLEAN,
	PRIMARY KEY(RoomID)
);

CREATE TABLE IF NOT EXISTS User(
	UserID VARCHAR(16) NOT NULL,
	FirstName VARCHAR(32) NOT NULL,
	LastName VARCHAR(32) NOT NULL,
	EmailAddress VARCHAR(64),
	IsAdmin BOOLEAN,
	Status BOOLEAN,
	PRIMARY KEY(UserID)
);


CREATE TABLE IF NOT EXISTS Reservations(
	BookingID VARCHAR(8) NOT NULL,
	RoomID VARCHAR(16) NOT NULL,
	UserID VARCHAR(16) NOT NULL,
	Title VARCHAR(256),
	Day INT,
	Date DATE,
	StartTime TIME,
	EndTime TIME,
	DateBooked DATETIME,
	PRIMARY KEY(BookingID)
);

CREATE TABLE IF NOT EXISTS RecurringReservations(
	BookingID VARCHAR(8) NOT NULL,
	RoomID VARCHAR(16) NOT NULL,
	UserID VARCHAR(16) NOT NULL,
	Title VARCHAR(256),
	Term VARCHAR(6),
	StartDate DATE,
	EndDate DATE,
	Day INT,
	StartTime TIME,
	EndTime TIME,
	Sections VARCHAR(64),
	Year INT,
	DateBooked DATETIME,
	PRIMARY KEY(BookingID)
);

CREATE TABLE IF NOT EXISTS RoomUse(
	BookingID VARCHAR(8) NOT NULL,
	Pin VARCHAR(8) NOT NULL,
	PinAcceptStart DATETIME,
	PinAcceptEnd DATETIME,
	KeyPickedUp DATETIME,
	KeyReturn DATETIME,
	ReturnInTime BOOLEAN,
	PRIMARY KEY(BookingID)
);

CREATE TABLE IF NOT EXISTS Section(
	Sequence INT AUTO_INCREMENT,
	Section CHAR(1),
	Year INT,
	Program INT,
	PRIMARY KEY(Sequence)
);

/*------------------Insert Data------------------*/
INSERT INTO RoomInformation VALUES
	('CB1401','x','CB1',4,1,60,'0000011','08:00','18:00'),
	('CB1402','x','CB1',4,2,50,'0000011','08:00','18:00'),
	('CB2602','x','CB2',6,2,70,'0000000','10:00','22:00');

INSERT INTO Equipment VALUES
	('CB1401',1,0,1,1,1,1),
	('CB1402',1,1,1,1,0,0),
	('CB2602',0,0,0,0,1,0);

INSERT INTO User VALUES
	('58070503412','Tulathorn','Sripongpankul','tul.tulathorn@gmail.com',1,0),
	('58070503424','Yosita','Sitthiporn','janelibraus@gmail.com',0,0),
	('58070503438','Arnan','Hirunratanakorn','honhon015@hotmail.com',0,0);

INSERT INTO Reservations VALUES
	('R41T2N8','CB1401','58070503412','YWC Tutor Class',1,'2018/12/03','12:00','13:30','2018-11-22 11:34'),
	('R9514F2','CB1401','58070503438','Activity',2,'2018/12/04','09:00','11:00','2018-11-18 14:42'),
	('R15375K','CB2602','58070503412','Meeting YWC',2,'2018/12/04','16:00','20:00','2018-11-24 09:08');

INSERT INTO RecurringReservations VALUES
	('RR18XY48','CB1401','58070503412','CPEXX Class','1/2018','2018/12/06','2019/01/10',4,'13:00','16:00','A-B',4,'2018-11-10 11:58'),
	('RR628H77','CB1401','58070503438','CPEYY Class','1/2018','2018/12/14','2018/12/28',5,'09:00','12:00','C-D',3,'2018-11-15 12:33');
	
INSERT INTO RoomUse VALUES
	('R41T2N8','123478','2018-12-03 11:45','2018-12-03 12:15',NULL,NULL,0),
	('R9514F2','369852','2018-12-04 08:45','2018-12-04 09:15',NULL,NULL,0),
	('R15375K','258147','2018-12-04 15:45','2018-12-04 16:15',NULL,NULL,0);	

INSERT INTO Section (Section,Year,Program) VALUES
	('A',4,0),
	('B',4,0),
	('C',3,1),
	('D',3,1);

/*------------------See In Table------------------*/
SELECT * FROM RoomInformation;
