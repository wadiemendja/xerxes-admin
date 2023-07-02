<h2>Requirements:</h2> 
    Node install : https://nodejs.org/en/download/  
    npm install  
    MySQL install (sql server & workbench only): https://dev.mysql.com/downloads/installer/  
    mysql -u root -p  
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'WM1234'  

<h2>Infos:</h2>
    Auto execution: C:\Windows\System32\cmd.exe /c PowerShell.exe -WindowStyle hidden [command]
    Remote connection to MySql server:
        create user 'username'@'ip' identified by 'password'; // creating user
        grant all on *.* to 'username'@'ip'; // granting privileges
        flush privileges; // refresh privileges
        select host, user from mysql.user; // See users
        Create a new connection on mysql workbench with same username ip and password
        Add sql port to the firewall inbound rules (wf.msc)
        flush hosts; // refresh connected hosts
        Or just use this if you don't wanna create new user: 
        UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='root';
        ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'WM1234';

<h2>Login layout:</h2>

![alt text](https://imgur.com/ACb4G7T.png)

<h2>Home page layout:</h2>

![alt text](https://imgur.com/Xs9fRzz.png)

<h2>Request's data previewing:</h2>

![alt text](https://imgur.com/dHp0sBU.png)

![alt text](https://imgur.com/MXyvPh4.png)

<h2>Services navigation:</h2>

![alt text](https://imgur.com/ZeJpcmY.png)

<h2>Add request form:</h2>

![alt text](https://imgur.com/WfKj1ZB.png)

![alt text](https://imgur.com/qeCtxuf.png)

<h2>Users and user access:</h2>

![alt text](https://imgur.com/aATX4Gj.png)

<h2>Todo:</h2>