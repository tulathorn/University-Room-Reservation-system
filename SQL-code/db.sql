https://gist.github.com/hofmannsven/9164408
https://mariadb.com/kb/en/library/insert/
https://stackoverflow.com/questions/25572871/how-to-make-a-mysql-table-with-date-and-time-columns
/*------------------Create Database------------------*/
create database RoomReservationSystem;

/*------------------Use Database------------------*/
use RoomReservationSystem;

/*------------------Create Table------------------*/
CREATE TABLE IF NOT EXISTS RoomInformation(
	RoomID INT NOT NULL AUTO_INCREMENT,
    RoomName CHAR(8) NOT NULL,
	Picture VARCHAR(256),
	Building VARCHAR(64) NOT NULL,
	Floor INT,
	RoomNumber INT,
	PeopleCapacity INT,
	ClosingDay CHAR(7),
	OpenTime TIME,
	CloseTime TIME,
	PRIMARY KEY(RoomID)
);

CREATE TABLE IF NOT EXISTS Equipment(
	RoomID INT NOT NULL,
	HasTeacherComputers BOOLEAN,
	HasStudentComputers BOOLEAN,
	HasProjector BOOLEAN,
	HasAirConditioner BOOLEAN,
	HasWhiteboard BOOLEAN,
	HasVisualizer BOOLEAN,
	PRIMARY KEY(RoomID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID) 
);

CREATE TABLE IF NOT EXISTS UserInfo(
    UserID INT NOT NULL AUTO_INCREMENT,
	UsernameID CHAR(32) NOT NULL,
	FirstName VARCHAR(32) NOT NULL,
	LastName VARCHAR(32) NOT NULL,
	EmailAddress VARCHAR(64),
	IsAdmin BOOLEAN NOT NULL,
	IsBan BOOLEAN,
	PRIMARY KEY(UserID)
);

CREATE TABLE IF NOT EXISTS Section(
	ID INT NOT NULL AUTO_INCREMENT,
	Sections VARCHAR(64),
	Year INT,
	Program INT,
	PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS Contact(
  ContactID INT NOT NULL AUTO_INCREMENT,
	EmailAddress VARCHAR(64),
	Title VARCHAR(64),
	Detail VARCHAR(512),
	DateTime TIMESTAMP,
	PRIMARY KEY(ContactID)
);

CREATE TABLE IF NOT EXISTS Reservations(
	BookingID INT NOT NULL AUTO_INCREMENT,
	RoomID INT NOT NULL,
	UserID INT NOT NULL,
	Title VARCHAR(256),
	Day INT,
	Date DATE,
	StartTime TIME,
	EndTime TIME,
	DateBooked TIMESTAMP,
	Purpose VARCHAR(256),
	PRIMARY KEY(BookingID),
	FOREIGN KEY(UserID) REFERENCES UserInfo(UserID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID)
);

CREATE TABLE IF NOT EXISTS RecurringReservations(
	BookingID INT NOT NULL AUTO_INCREMENT,
	RoomID INT NOT NULL,
	UserID INT NOT NULL,
	Title VARCHAR(256),
	Term CHAR(6),
	StartDate DATE,
	EndDate DATE,
	Day INT,
	StartTime TIME,
	EndTime TIME,
	Sections INT,
	SecChar VARCHAR(64),
	Year INT,
	DateBooked TIMESTAMP,
	Purpose VARCHAR(256),
	PRIMARY KEY(BookingID),
	FOREIGN KEY(UserID) REFERENCES UserInfo(UserID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID),
	FOREIGN KEY(Sections) REFERENCES Section(ID)
);

CREATE TABLE IF NOT EXISTS RoomUse(
	UsageID INT NOT NULL AUTO_INCREMENT,
	BookingID INT,
	RBookingID INT,
	Pin CHAR(8) NOT NULL,
	PinAcceptStart TIMESTAMP,
	PinAcceptEnd TIMESTAMP,
	KeyPickedUp TIMESTAMP,
	KeyReturn TIMESTAMP,
	ReturnInTime BOOLEAN,
	PRIMARY KEY(UsageID),
	FOREIGN KEY(BookingID) REFERENCES Reservations(BookingID) ,
	FOREIGN KEY(RBookingID) REFERENCES RecurringReservations(BookingID)
);











/*------------------Insert Data------------------*/
INSERT INTO RoomInformation (RoomName,Picture,Building,Floor,RoomNumber,PeopleCapacity,ClosingDay,OpenTime,CloseTime) VALUES
	('CPE1121','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,21,60,'0000011','08:00','20:00'),
	('CB1402','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','CB1',4,2,50,'0000011','08:00','18:00'),
	('CB2602','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','CB2',6,2,70,'0000000','10:00','22:00');

INSERT INTO Equipment VALUES
	('1',1,0,1,1,1,1),
	('2',1,1,1,1,0,0),
	('3',0,0,0,0,1,0);

INSERT INTO UserInfo (UsernameID,FirstName,LastName,EmailAddress,IsAdmin,IsBan) VALUES
	('58070503412','Tulathorn','Sripongpankul','tul.tulathorn@gmail.com',1,0),
	('58070503424','Yosita','Sitthiporn','janelibraus@gmail.com',0,0),
	('58070503438','Arnan','Hirunratanakorn','honhon015@hotmail.com',0,0);

INSERT INTO Reservations (RoomID,UserID,Title,Day,Date,StartTime,EndTime,DateBooked,Purpose) VALUES
	('1','1','YWC Tutor Class',1,'2018/12/03','12:00','13:30','2018-11-22 11:34','Tutor'),
	('2','2','Activity',2,'2018/12/04','09:00','11:00','2018-11-18 14:42','Meeting for activity'),
	('3','3','Meeting YWC',2,'2018/12/04','16:00','20:00','2018-11-24 09:08','YWC Camp');

INSERT INTO RecurringReservations (RoomID,UserID,Title,Term,StartDate,EndDate,Day,StartTime,EndTime,Sections,SecChar,Year,DateBooked,Purpose) VALUES
	('2','2','CPEXX Class','1/2018','2018/12/06','2019/03/10',4,'13:00','16:00',1,'A',4,'2018-11-10 11:58','CPE Class'),
	('1','3','CPEYY Class','1/2018','2018/12/14','2018/12/28',5,'09:00','12:00',3,'C',3,'2018-11-15 12:33','CPE Class2');
	
INSERT INTO RoomUse (BookingID,Pin,PinAcceptStart,PinAcceptEnd,KeyPickedUp,KeyReturn,ReturnInTime) VALUES
	('1','123478','2018-12-03 11:45','2018-12-03 12:15',NULL,NULL,0),
	('2','369852','2018-12-04 08:45','2018-12-04 09:15',NULL,NULL,0);	


INSERT INTO Section (Sections,Year,Program) VALUES
	('A',4,0),
	('B',4,0),
	('C',3,1),
	('D',3,1);

INSERT INTO Contact (EmailAddress,Title,Detail,DateTime) VALUES
	('honhon015@hotmail.com','Door Locked','I can not open the locked door','2019-01-16 23:39'),
	('janelibraus@gmail.com','Forgot password','I forgot my password','2019-01-21 15:02'),
	('tul.tulathorn@gmail.com','Key box Can not Open','I can not open the key box','2019-01-04 14:42');










