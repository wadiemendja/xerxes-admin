<h2>Requirements:</h2> 
    Node install : https://nodejs.org/en/download/ <br>
    npm install <br>
    MySQL install (sql server & workbench only): https://dev.mysql.com/downloads/installer/ <br>
    mysql -u root -p <br>
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'WM1234' <br>

<h2>Infos:</h2>
    Auto execution: C:\Windows\System32\cmd.exe /c PowerShell.exe -WindowStyle hidden [command]
    Remote connection to MySql server: <br>
        create user 'username'@'ip' identified by 'password'; // creating user <br>
        grant all on *.* to 'username'@'ip'; // granting privileges <br>
        flush privileges; // refresh privileges <br>
        select host, user from mysql.user; // See users <br>
        Create a new connection on mysql workbench with same username ip and password <br>
        Add sql port to the firewall inbound rules (wf.msc) <br>
        flush hosts; // refresh connected hosts <br>
        Or just use this if you don't wanna create new user: <br>
        UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='root'; <br>
        ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'WM1234'; <br>

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

<h2>Login layout:</h2>

![alt text](https://imgur.com/ACb4G7T.png)

<h2>Users and user access:</h2>

![alt text](https://imgur.com/aATX4Gj.png)

<h2>Todo:</h2>