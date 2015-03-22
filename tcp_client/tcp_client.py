import socket

target_host = "www.google.com"
target_port = 80

# client object,
# AF_INET for iPv4 or hostname,
# SOCK_STREAM for TCP protocol
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((target_host, target_port))

data = "GET / HTTP/1.1\r\nHost: google.com\r\n\r\n"
client.send(data)

response = client.recv(4096)

print(response)
