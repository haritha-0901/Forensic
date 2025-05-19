create table users(uid int primary key,name varchar(1000)
,email varchar(100) unique,password varchar(100),addresss varchar(1000),
keydata varchar(1000),role varchar(1000));
create table data(did int primary key,filename varchar(100),codeid text,keyvalue varchar(1000),caseid varch(100)); 
create table transactiondata(td int primary key,trandata text,uid int,
did int,transcation varchar(100),alltrans text,trandate datetime default current_timestamp);

create table requestaccess(rid int,caseid int,approve int,userid int);