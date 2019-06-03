
create database RoomReservationSystem;






use RoomReservationSystem;






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
	EquipID INT NOT NULL AUTO_INCREMENT,
	RoomID INT NOT NULL,
	HasTeacherComputers BOOLEAN,
	HasStudentComputers BOOLEAN,
	HasProjector BOOLEAN,
	HasAirConditioner BOOLEAN,
	HasWhiteboard BOOLEAN,
	HasVisualizer BOOLEAN,
	PRIMARY KEY(EquipID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID) 
);

CREATE TABLE IF NOT EXISTS UserInfo(
  	UserID INT NOT NULL,
	UsernameID CHAR(32) NOT NULL,
	FirstName VARCHAR(32) NOT NULL,
	LastName VARCHAR(32) NOT NULL,
	EmailAddress VARCHAR(64),
	PhoneNumber CHAR(10),
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

CREATE TABLE IF NOT EXISTS RecurringReservations(
	BookingID INT NOT NULL AUTO_INCREMENT,
	RoomID INT NOT NULL,
	UserID INT NOT NULL,
	Term CHAR(6),
	StartDate DATE,
	EndDate DATE,
	Day INT,
	StartTime TIME,
	EndTime TIME,
	Sections INT,
	DateBooked TIMESTAMP,
	Purpose VARCHAR(256),
	PRIMARY KEY(BookingID),
	FOREIGN KEY(UserID) REFERENCES UserInfo(UserID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID),
	FOREIGN KEY(Sections) REFERENCES Section(ID)
);

CREATE TABLE IF NOT EXISTS Reservations(
	BookingID INT NOT NULL AUTO_INCREMENT,
	RID INT,
	RoomID INT NOT NULL,
	UserID INT NOT NULL,
	Date DATE,
	StartTime TIME,
	EndTime TIME,
	DateBooked TIMESTAMP,
	Purpose VARCHAR(256),
	PRIMARY KEY(BookingID),
	FOREIGN KEY(RID) REFERENCES RecurringReservations(BookingID),
	FOREIGN KEY(UserID) REFERENCES UserInfo(UserID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID)
);

CREATE TABLE IF NOT EXISTS RoomUse(
	UsageID INT NOT NULL AUTO_INCREMENT,
  	RoomID INT NOT NULL,
	BookingID INT,
	RBookingID INT,
	Pin CHAR(6) NOT NULL,
	PinAcceptStart TIMESTAMP NOT NULL,
	PinAcceptEnd TIMESTAMP NOT NULL,
	KeyPickedUp TIMESTAMP,
	KeyReturn TIMESTAMP,
	ReturnInTime BOOLEAN,
	PRIMARY KEY(UsageID),
	FOREIGN KEY(BookingID) REFERENCES Reservations(BookingID) ,
  FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID),
	FOREIGN KEY(RBookingID) REFERENCES RecurringReservations(BookingID)
);










INSERT INTO RoomInformation (RoomID,RoomName,Picture,Building,Floor,RoomNumber,PeopleCapacity,ClosingDay,OpenTime,CloseTime) VALUES
	(1,'CPE1112','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,12,40,'0000000','08:00','21:00'),
	(2,'CPE1113','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,13,60,'0000000','08:00','21:00'),
	(3,'CPE1114','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,14,40,'0000000','08:00','21:00'),
	(4,'CPE1115','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,15,80,'0000000','08:00','21:00'),
	(5,'CPE1116','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,16,40,'0000000','08:00','21:00'),
	(6,'CPE1119','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,19,40,'0000000','08:00','21:00'),
	(7,'CPE1120','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,20,40,'0000000','08:00','21:00'),
	(8,'CPE1121','https://pbs.twimg.com/profile_images/1084297574167662592/00yhgQKU_400x400.jpg','Witsawa Watthana',11,21,80,'0000000','08:00','21:00');

INSERT INTO Equipment (RoomID,HasTeacherComputers,HasStudentComputers,HasProjector,HasAirConditioner,HasWhiteboard,HasVisualizer) VALUES
	('1',1,1,1,1,1,1),
	('2',1,1,1,1,1,1),
	('3',1,0,1,1,1,1),
	('4',1,0,1,1,1,1),
	('5',1,0,1,1,1,1),
	('6',0,1,1,1,1,0),
	('7',1,1,1,1,1,1),
	('8',1,0,1,1,1,1);

INSERT INTO UserInfo (UsernameID,FirstName,LastName,EmailAddress,PhoneNumber,IsAdmin,IsBan) VALUES
	('58070503412','Tulathorn','Sripongpankul','tul.tulathorn@gmail.com',0821112222,1,0),
	('58070503424','Yosita','Sitthiporn','janelibraus@gmail.com',0921234567,0,0),
	('58070503438','Arnan','Hirunratanakorn','honhon015@hotmail.com',0684754545,0,0);


INSERT INTO Reservations (RoomID,UserID,Date,StartTime,EndTime,DateBooked,Purpose) VALUES
	('1','1','2018/12/03','12:00','13:30','2018-11-22 11:34','Tutor'),
	('2','2','2018/12/04','09:00','11:00','2018-11-18 14:42','Meeting for activity'),
	('3','3','2018/12/04','16:00','20:00','2018-11-24 09:08','YWC Camp');
	
INSERT INTO RoomUse (BookingID,Pin,PinAcceptStart,PinAcceptEnd,KeyPickedUp,KeyReturn,ReturnInTime) VALUES
	('1','123478','2018-12-03 11:45','2018-12-03 12:15',NULL,NULL,0),
	('2','369852','2018-12-04 08:45','2018-12-04 09:15',NULL,NULL,0);	


INSERT INTO Section (Sections,Year,Program) VALUES
	('A',1,0),
	('B',1,0),
	('C',1,1),
	('D',1,1),
	('A',2,0),
	('B',2,0),
	('C',2,1),
	('D',2,1),
	('A',3,0),
	('B',3,0),
	('C',3,1),
	('D',3,1),
	('A',4,0),
	('B',4,0),
	('C',4,1),
	('D',4,1);

INSERT INTO Contact (EmailAddress,Title,Detail,DateTime) VALUES
	('honhon015@hotmail.com','Door Locked','I can not open the locked door','2019-01-16 23:39'),
	('janelibraus@gmail.com','Forgot password','I forgot my password','2019-01-21 15:02'),
	('tul.tulathorn@gmail.com','Key box Can not Open','I can not open the key box','2019-01-04 14:42');

INSERT INTO RecurringReservations (RoomID,UserID,Term,StartDate,EndDate,Day,StartTime,EndTime,Sections,DateBooked,Purpose) VALUES
	('2','2','1/2018','2018/12/06','2019/03/10',4,'13:00','16:00',1,'2018-11-10 11:58','CPE Class'),
	('1','3','1/2018','2018/12/14','2018/12/28',5,'09:00','12:00',3,'2018-11-15 12:33','CPE Class2');










