from scapy.all import *


def packet_callback(packet):

    if TCP in packet:
        if packet[TCP].payload:
            mail_packet = str(packet[TCP].payload)
            print(mail_packet)
    else:
        print('no TCP Layer found')

sniff(
    filter="tcp port 110 or tcp port 25 or tcp port 143",
    iface="eth2",
    prn=packet_callback,
    store=0
)
