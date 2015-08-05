import socket

target_host = "0.0.0.0"
target_port = 9999

# client object,
# AF_INET for iPv4 or hostname,
# SOCK_STREAM for TCP protocol
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((target_host, target_port))

data = "hi"
client.send(data)

response = client.recv(4096)

print(response)
