import os

devnull = '\\\\.\\nul'

print(devnull)
print(os.path.exists(devnull))
print(os.stat(devnull))
