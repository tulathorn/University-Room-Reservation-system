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
	Year INT,
	DateBooked TIMESTAMP,
	Purpose VARCHAR(256),
	PRIMARY KEY(BookingID),
	FOREIGN KEY(UserID) REFERENCES UserInfo(UserID),
	FOREIGN KEY(RoomID) REFERENCES RoomInformation(RoomID),
	FOREIGN KEY(Sections) REFERENCES Section(ID)
);

CREATE TABLE IF NOT EXISTS RoomUse(
	Sequence INT NOT NULL AUTO_INCREMENT,
	BookingID INT NOT NULL,
	Pin CHAR(8) NOT NULL,
	PinAcceptStart TIMESTAMP,
	PinAcceptEnd TIMESTAMP,
	KeyPickedUp TIMESTAMP,
	KeyReturn TIMESTAMP,
	ReturnInTime BOOLEAN,
	PRIMARY KEY(Sequence),
	FOREIGN KEY(BookingID) REFERENCES Reservations(BookingID) ,
	FOREIGN KEY(BookingID) REFERENCES RecurringReservations(BookingID)
);