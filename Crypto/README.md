# Cryptography

## Store password in safe way

Using [SALT](https://en.wikipedia.org/wiki/Salt_(cryptography)) is a common practice to store sensitive data. 

A salt is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase.

#### Sample

##### User input
Username  |	Password
--------- | ---------
user1	| password123
user2 |	password123

##### Salt and Stored Hash

Username | Salt value	| String to be hashed	 | Hashed value = SHA256 (Password + Salt value)
--------- | --------- | --------- | ---------
user1	| E1F53135E559C253	| password123E1F53135E559C253	| 72AE25495A7981C40622D49F9A52E4F1565C90F048F59027BD9C8C8900D5C3D8
user2	| 84B03D034B409D4E	| password12384B03D034B409D4E	| B4B6603ABC670967E99C7E7F1389E40CD16E78AD38EB1468EC2AA1E62B8BED3A

##### Validate password

Username | String to be hashed	| Hashed value = SHA256
--------- | --------- | ---------
user1	| password123	| 57DB1253B68B6802B59A969F750FA32B60CB5CC8A3CB19B87DAC28F541DC4E2A
user2	| password123	| 57DB1253B68B6802B59A969F750FA32B60CB5CC8A3CB19B87DAC28F541DC4E2A

<br>

#### Workflow

![](https://raw.githubusercontent.com/GarfieldZHU/Aloha.zone.io/master/Crypto/.assets/store_pwd.jpeg)

### TLS 

[The Illustrated TLS 1.3 Connection](https://tls13.xargs.org/)


## Attacks

To protect crypotography methods from external attacks, we should be care about the attack methods. 

### Timing Attacks

A timing attack is a side-channel attack in which the attacker attempts to compromise a cryptosystem by analyzing the time taken to execute cryptographic algorithms. 

<br/>

A typical case is Java's [String.equals](https://www.w3schools.com/java/ref_string_equals.asp). It exists when first different character is found and could be attacked theoretically by this technology. 

#### Timing attacks references
- [Wikipedia](https://en.wikipedia.org/wiki/Timing_attack)
- [@Shotgun 's answer](https://www.zhihu.com/question/20156213)
- [Timing Attacks - Tanglei.Name](https://coolshell.cn/articles/21003.html)

