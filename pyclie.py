import socket

s = socket.socket()
host = '54.83.121.253'
port = 12345

s.connect((host, port))
print(s.recv(1024).decode())
s.close()